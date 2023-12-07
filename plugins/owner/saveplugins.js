const fs = require("fs");
const path = require("path");

module.exports = {
  name: "addplugins",
  command: ["addplugins", "saveplugins", "sp"],
  tags: ["owner"],
  run: async (m, { conn}) => {
    if (!m.quoted?.text) return m.reply("Reply pesan code");
    let dir = m.text.includes(".js") ? m.text : `command/${m.text}.js`;
    await fs.writeFileSync(dir, m.quoted.body);
    m.reply(`tersimpan di '${dir}'`);
  },
  owner: true,
  use: "Path Folder command?" 
};