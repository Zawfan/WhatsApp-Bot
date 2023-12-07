const fs = require("fs");
const path = require("path");

module.exports = {
  name: "getplugins",
  command: ["getp", "getplugins", "gp"],
  tags: ["owner"],
  run: async (m, { conn }) => {
    let filename = /\.js$/i.test(m.text)
      ? `../${text}`
      : path.join(__dirname, `../${m.text}.js`);
    const listCmd = fs
      .readdirSync(path.join(__dirname, "../"))
      .map((v) => v.replace(/\.js/, ""));
    if (!fs.existsSync(filename))
      return m.reply(
        `'${filename}' not found!\n${listCmd
          .map((v) => v)
          .join("\n")
          .trim()}`,
      );
    m.reply(fs.readFileSync(filename, "utf8"));
  },
  owner: true,
  use: "Enter the Folder Path and File Name.",
};