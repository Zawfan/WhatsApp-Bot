const fs = require("fs");
const path = require("path");
const Function = require("../../system/lib/function");
const moment = require("moment-timezone");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

const tags = {
  ai: "*Artificial Intelligence*",
  owner: "*OWNER / MODS*",
  other: "*OTHERS*",
  main: "*MAIN*",
};

const defaultMenu = {
  before: `
Hi %name
I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp.
╭────────────๑
╏↬ *Library:* *Baileys*
╏↬ *Function:* *Assistant*
╰────────────๑
╭────────────๑ 
╏↬ *Uptime* : *%uptime*
╏↬ *Hari* : *%week %weton*
╏↬ *Waktu* : *%time*
╏↬ *Tanggal* : *%date*
╏↬ *Version* : *%version*
╏↬ *Prefix Used* : *[ %p ]*
╰────────────๑

${readmore} 
`.trimStart(),
  header: "╭─「 %category 」",
  body: "│❖ %cmd %islimit %isPremium",
  footer: "╰────● ",
  after: `\n*Powerred By :* _https://api.arifzyn.biz.id_`,
};

module.exports = {
  name: ["menu"],
  command: ["menu", "help"],
  tags: ["main"],
  run: async (m, { conn }) => {
    let package = JSON.parse(
      await fs.promises
        .readFile(path.join(__dirname, "../../package.json"))
        .catch((_) => "{}"),
    );
    let name = `@${m.sender.split("@")[0]}`;
    let { exp, limit, level, role } = global.db.users[m.sender];
    let d = new Date(new Date() + 3600000);
    let locale = "id";
    const wib = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    const wita = moment.tz("Asia/Makassar").format("HH:mm:ss");
    const wit = moment.tz("Asia/Jayapura").format("HH:mm:ss");
    let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
      Math.floor(d / 84600000) % 5
    ];
    let week = d.toLocaleDateString(locale, { weekday: "long" });
    let date = d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
    let time = d.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    let _uptime = process.uptime() * 1000;
    let _muptime;
    if (process.send) {
      process.send("uptime");
      _muptime =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1000);
        })) * 1000;
    }
    let muptime = Function.clockString(_muptime);
    let uptime = Function.clockString(_uptime);

    const help = Array.from(plugins.values()).map((menu) => {
      return {
        help: Array.isArray(menu.name) ? menu.name : [menu.name],
        tags: Array.isArray(menu.tags) ? menu.tags : [menu.tags],
        prefix: menu.noPrefix ? "" : m.prefix,
      };
    });

    for (let plugin of help)
      if (plugin && "tags" in plugin)
        for (let tag of plugin.tags) if (!(tag in tags) && tag) tags[tag] = tag;
    conn.menu = conn.menu ? conn.menu : {};
    let before = conn.menu.before || defaultMenu.before;
    let header = conn.menu.header || defaultMenu.header;
    let body = conn.menu.body || defaultMenu.body;
    let footer = conn.menu.footer || defaultMenu.footer;
    let after =
      conn.menu.after ||
      (conn.user.jid == conn.user.jid ? "" : `Powered by ${conn.user.name}`) +
        defaultMenu.after;
    let _text = [
      before,
      ...Object.keys(tags).map((tag) => {
        return (
          header.replace(/%category/g, tags[tag]) +
          "\n" +
          [
            ...help
              .filter(
                (menu) => menu.tags && menu.tags.includes(tag) && menu.help,
              )
              .map((menu) => {
                return menu.help
                  .map((help) => {
                    return body
                      .replace(/%cmd/g, menu.prefix + help)
                      .replace(/%islimit/g, menu.limit ? "(Ⓛ)" : "")
                      .replace(/%isPremium/g, menu.premium ? "(Ⓟ)" : "")
                      .trim();
                  })
                  .join("\n");
              }),
            footer,
          ].join("\n")
        );
      }),
      after,
    ].join("\n");
    text =
      typeof conn.menu == "string"
        ? conn.menu
        : typeof conn.menu == "object"
          ? _text
          : "";
    let replace = {
      "%": "%",
      p: m.prefix,
      uptime,
      muptime,
      me: conn.getName(conn.decodeJid(conn.user.id)),
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage
        ? package.homepage.url || package.homepage
        : "[unknown github url]",
      level,
      limit,
      name,
      weton,
      week,
      date,
      dateIslamic,
      wib,
      wit,
      wita,
      time,
    };
    text = text.replace(
      new RegExp(
        `%(${Object.keys(replace).sort((a, b) => b.length - a.length)
          .join`|`})`,
        "g",
      ),
      (_, name) => "" + replace[name],
    );
    m.reply(text, {
      contextInfo: {
        mentionedJid: await conn.parseMention(text),
        externalAdReply: {
          showAdAttribution: true,
          title: "",
          body: "",
          thumbnailUrl: "https://telegra.ph/file/0ca2ed4df216d05d9a5bf.jpg",
          sourceUrl: global.link,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    });
  },
};
