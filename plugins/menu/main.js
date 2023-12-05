const fs = require("fs");
const path = require("path");
const Function = require("../../system/lib/function")

const tags = {
  ai: "*Artificial Intelligence*",
  anime: "*ANIME / MANGA*",
  convert: "*CONVERT*",
  download: "*DOWNLOADER*",
  group: "*GROUP*",
  info: "*INFORMATION*",
  owner: "*OWNER / MODS*",
  rpg: "*RPG GAME*",
  tools: "*TOOLS*",
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
`.trimStart(),
  header: '╭─「 %category 」',
  body: '│❖ %cmd %islimit %isPremium',
  footer: '╰────● ',
  after: ``,
}

module.exports = {
  name: ["menu"],
  command: ["menu", "help"],
  tags: ["main"],
  run: async (m, { conn }) => {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../../package.json')).catch(_ => '{}'))
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = Function.clockString(_muptime)
    let uptime = Function.clockString(_uptime)
    
    const help = Array.from(plugins.values()).map((menu) => {
      return {
        help: Array.isArray(menu.name) ? menu.name: [menu.name],
        tags: Array.isArray(menu.tags) ? menu.tags: [menu.tags],
        prefix: menu.noPrefix ? "": m.prefix,
      };
    });
    
    for (let plugin of help)
      if (plugin && "tags" in plugin)
        for (let tag of plugin.tags) if (!(tag in tags) && tag) tags[tag] = tag;
   conn.menu = conn.menu ? conn.menu : {}
   let before = conn.menu.before || defaultMenu.before
   let header = conn.menu.header || defaultMenu.header
   let body = conn.menu.body || defaultMenu.body
   let footer = conn.menu.footer || defaultMenu.footer
   let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by ${conn.user.name}`) + defaultMenu.after
   let _text = [
    before,
    ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
                return menu.help.map(help => {
                    return body.replace(/%cmd/g, menu.prefix + help)
                        .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                        .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                        .trim()
                }).join('\n')
            }),
            footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: m.prefix, uptime, muptime,
      me: conn.getName(conn.decodeJid(conn.user.id)),
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    m.reply(text)
  }
}