/* 
* Create By Arifzyn. 
* github : https://github.com/ArifzynXD
* WhatsApp : wa.me/6288213503541
* No Hapus, Walupun Copas Yang Penting Jadi Puh
*/

const config = require("../../config.js");

const fs = require("fs");
const path = require("path");
const util = require("util"); 
const moment = require("moment-timezone");

const Database = require("../lib/localdb");
const Function = require("../lib/function");

const dbPath = "system/temp/database.json"
const database = new Database(dbPath)

database.connect().catch(() => database.connect());
setInterval(async () => {
	fs.writeFileSync(dbPath, JSON.stringify(global.db, null, 3));
}, 3 * 1000);
 
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in config.APIs ? config.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: config.APIKeys[name in config.APIs ? config.APIs[name] : name] } : {}) })) : '')
global.Func = Function 
global.config = config

module.exports.Message = async (conn, m, store) => {
	try {
		if (!m) return;
		if (!config.options.public && !m.isOwner) return
        if (m.from && global.db.chats[m.from]?.mute && !m.isOwner) return
        if (m.isBaileys) return
        
		const prefix = (m.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_|~!?@#%^&.©^]/gi.test(m.body) ? m.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_|~!?@#%^&.©^]/gi)[0]: "");
		const cmd = (m.cmd = m.body && m.body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase());
		const plugin = (m.command = plugins.get(cmd) || plugins.find((v) => v.command && v.command.includes(cmd)));
		const quoted = m.quoted ? m.quoted : m;
		
		if (m) {
			require("../lib/database").idb(m);
			console.log("Command : " + m.body)
		}
		
        if (m.isGroup) {
        	if (global.db.chats[m.from].banned && !m.isOwner) return
    	}
    
		if (plugin) {
			if (!prefix && plugin.noPrefix) {
				if (plugin.owner && !m.isOwner) {
					return m.reply(config.msg.owner);
                }
                if (plugin.group && !m.isGroup) {
                	return msg.reply(config.msg.group);
                }
                if (plugin.private && m.isGroup) {
                	return m.reply(config.msg.private);
                }
                if (plugin.botAdmin && !m.isBotAdmin) {
                	return m.reply(config.msg.botAdmin);
                }
                if (plugin.admin && !m.isAdmin) {
                	return m.reply(config.msg.admin);
                } 
                if (plugin.bot && m.fromMe) {
                	return m.reply(config.msg.bot);
                }
                if (plugin.premium && !m.isPremium) {
                	return m.reply(config.msg.premium);
                }
                if (plugin.use && !m.text) {
                	return m.reply(plugin.use.replace(/%prefix/gi, prefix).replace(/%command/gi, plugin.name).replace(/%text/gi, m.text));
                }
                
                plugin.run(m, { conn, command: cmd, quoted, prefix, plugins })
                ?.then((a) => a)
				?.catch((err) => {
					let text = util.format(err);
					m.reply(`*Error Plugins*\n\n*- Name :* ${cmd}\n*- Sender :* ${m.sender.split`@`[0]} (@${m.sender.split`@`[0]})\n*- Time :* ${moment(m.timestamp * 1000).tz("Asia/Jakarta",)}\n*- Log :*\n\n${text}`, { mentions: [m.sender] });
                });
            }
    
			if (!!prefix && m.body.startsWith(prefix)) {
				if (plugin.owner && !m.isOwner) {
					return m.reply(config.msg.owner);
                }
                if (plugin.group && !m.isGroup) {
                	return msg.reply(config.msg.group);
                }
                if (plugin.private && m.isGroup) {
                	return m.reply(config.msg.private);
                }
                if (plugin.admin && !m.isAdmin) {
                	return m.reply(config.msg.admin);
                } 
                if (plugin.botAdmin && !m.isBotAdmin) {
                	return m.reply(config.msg.botAdmin);
                }
                if (plugin.bot && m.fromMe) {
                	return m.reply(config.msg.bot);
                }
                if (plugin.premium && !m.isPremium) {
                	return m.reply(config.msg.premium);
                }
                if (plugin.use && !m.text) {
                	return m.reply(plugin.use.replace(/%prefix/gi, prefix).replace(/%command/gi, plugin.name).replace(/%text/gi, m.text));
                }
                
				plugin.run(m, { conn, command: cmd, quoted, prefix, plugins })
				?.then((a) => a)
				?.catch((err) => {
					let text = util.format(err);
					m.reply(`*Error Plugins*\n\n*- Name :* ${cmd}\n*- Sender :* ${m.sender.split`@`[0]} (@${m.sender.split`@`[0]})\n*- Time :* ${moment(m.timestamp * 1000).tz("Asia/Jakarta",)}\n*- Log :*\n\n${text}`, { mentions: [m.sender] });
                });
			}
		}
		
		if (!plugin) {
			const dir = "plugins/_function";
			const files = fs.readdirSync(dir).filter((file) => file.endsWith(".js"));
			if (files.length === 0) return;
			for (const file of files) {
				const load = require(`../../${dir}/${file}`)
				load(m, {
					conn,
					quoted,
					prefix,
					plugins,
					command: cmd,
                });
			}
        }
	} catch (e) {
		console.error(e);
    }
}

module.exports.readPlungins = async (pathname = config.options.pathPlugins) => {
	try {
		const folder = config.options.pathPlugins || "plugins"
		const dir = fs.readdirSync(folder); 
		dir.filter((a) => a !== "_function")
		.map(async (res) => {
			let files = fs.readdirSync(`${folder}/${res}`).filter((file) => file.endsWith(".js"));
			for (const file of files) {
				const name = path.join(folder, res, file)
				const plugin = require("../../" + name)
				if (!plugin.tags) return;
				plugins.set(name, plugin);
				console.log("List Plugins : " + name)
            }
		})
	} catch (e) { 
		console.error(e);
	}
}

config.reloadFile(require.resolve(__filename))