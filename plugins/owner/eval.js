const util = require("util");
const syntaxerror = require("syntax-error");

module.exports = {
  name: ["=>", ">"],
  command: ["=>", ">"],
  tags: ["owner"],
  noPrefix: true,
  run: async (m, { conn, command }) => {
    if (!m.isOwner) return;
    const args = command == "=>" ? "return " + m.text : m.text
    try {
      var txtt = util.format(await eval(`(async()=>{ ${args} })()`));
      conn.sendMessage(m.from, { text: txtt }, { quoted: m });
    } catch (e) {
      let _syntax = "";
      let _err = util.format(e);
      let err = syntaxerror(m.text, "EvalError", {
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true,
        sourceType: "module",
      });
      if (err) _syntax = err + "\n\n";
      m.reply(util.format(_syntax + _err));
    }
  }
}; 