const config = require("../../config")

module.exports = {
	name: "mode",
	command: ["mode"],
	tags: ["owner"],
	run: async ({ conn, m }) => {
		if (m.text == "self") {
			m.reply("Success self mode")
			config.options.public = false 
		} else {
			m.reply("Success public mode")
			config.options.public = true 
		}
	},
	use: "what mode?\n\n*Example:* %prefix%command public",
	owner: true, 
}