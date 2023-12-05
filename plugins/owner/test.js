module.exports = {
	name: ["test"],
	command: ["test", "bot"],
	tags: ["owner"],
	run: async (m, { conn }) => {
		return m.reply("yes I am here!!")
	}
}