const { canLevelUp } = require("../../system/lib/levelling.js")

async function handler(m) {
	let user = global.db.users[m.sender]
	let before = user.level * 1
	while (canLevelUp(user.level, user.exp, 69))
        user.level++
   if (before !== user.level) {
   	m.reply(`
*▢ SELAMAT ANDA NAIK LEVEL*

 *${before}* ‣  *${user.level}*
 
 Ketik .profile untuk lihat.`.trim())
   }     
}

module.exports = handler;