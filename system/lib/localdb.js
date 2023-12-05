const fs = require("fs");
const path = require("path");

class Database {
  constructor(Path) {
    this.file = Path ? Path : path.join(process.cwd(), "system/temp/database.json");
  }

  read() {
    if (!fs.existsSync(this.file)) return {};
    const json = JSON.parse(fs.readFileSync(this.file, "utf-8"));
    return json;
  }

  write(data) {
    const database = data ? data : global.db;
    fs.writeFileSync(
      this.file,
      JSON.stringify(database, null, 3)
    );
  }

  async connect() {
    let content = await this.read();
    if (!content || Object.keys(content).length === 0) {
      global.db = {
          users: {},
          chats: {},
          stats: {},
          settings: {}
      };
      await this.write();
    } else {
      global.db = content;
    }
  }
}

module.exports = Database; 