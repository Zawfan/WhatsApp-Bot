const config = require("../../config");

async function idb(m) { 
  const isNumber = (x) => typeof x === "number" && !isNaN(x);
  const isBoolean = (x) => typeof x === "boolean" && Boolean(x);
  let user = global.db.users[m.sender];
  if (typeof user !== "object") global.db.users[m.sender] = {};
  if (user) {
    if (!isNumber(user.limit)) user.limit = 25;
    if (!isBoolean(user.premium)) user.premium = m.isOwner ? true : false;
    if (!("lastChat" in user)) user.lastChat = new Date() * 1;
    if (!("name" in user)) user.name = m.pushName;
    if (!isBoolean(user.banned)) user.banned = false;

    if (!isNumber(user.exp)) user.exp = 0;
    if (!isNumber(user.point)) user.point = 20;
    if (!isNumber(user.lastclaim)) user.lastclaim = 0;

    if (!isNumber(user.level)) user.level = 0;
    if (!("role" in user)) user.role = "Beginner";

    if (!isNumber(user.balance)) user.balance = 0;
    if (!isNumber(user.health)) user.health = 100;
    if (!isNumber(user.potion)) user.potion = 0;
    if (!isNumber(user.trash)) user.trash = 0;
    if (!isNumber(user.wood)) user.wood = 0;
    if (!isNumber(user.rock)) user.rock = 0;
    if (!isNumber(user.string)) user.string = 0;
    if (!isNumber(user.petFood)) user.petFood = 0;

    if (!isNumber(user.emerald)) user.emerald = 0;
    if (!isNumber(user.diamond)) user.diamond = 0;
    if (!isNumber(user.gold)) user.gold = 0;
    if (!isNumber(user.iron)) user.iron = 0;

    if (!isNumber(user.common)) user.common = 0;
    if (!isNumber(user.uncommon)) user.uncommon = 0;
    if (!isNumber(user.mythic)) user.mythic = 0;
    if (!isNumber(user.legendary)) user.legendary = 0;
    if (!isNumber(user.pet)) user.pet = 0;

    if (!isNumber(user.sapi)) user.sapi = 0;
    if (!isNumber(user.banteng)) user.banteng = 0;
    if (!isNumber(user.harimau)) user.harimau = 0;
    if (!isNumber(user.gajah)) user.gajah = 0;
    if (!isNumber(user.kambing)) user.kambing = 0;
    if (!isNumber(user.panda)) user.panda = 0;
    if (!isNumber(user.buaya)) user.buaya = 0;
    if (!isNumber(user.kerbau)) user.kerbau = 0;
    if (!isNumber(user.sapi)) user.sapi = 0;
    if (!isNumber(user.monyet)) user.monyet = 0;
    if (!isNumber(user.ayam)) user.ayam = 0;
    if (!isNumber(user.domba)) user.domba = 0;

    if (!isNumber(user.horse)) user.horse = 0;
    if (!isNumber(user.horseexp)) user.horseexp = 0;
    if (!isNumber(user.cat)) user.cat = 0;
    if (!isNumber(user.catexp)) user.catexp = 0;
    if (!isNumber(user.fox)) user.fox = 0;
    if (!isNumber(user.foxhexp)) user.foxexp = 0;
    if (!isNumber(user.dog)) user.dog = 0;
    if (!isNumber(user.dogexp)) user.dogexp = 0;

    if (!isNumber(user.horselastfeed)) user.horselastfeed = 0;
    if (!isNumber(user.catlastfeed)) user.catlastfeed = 0;
    if (!isNumber(user.foxlastfeed)) user.foxlastfeed = 0;
    if (!isNumber(user.doglastfeed)) user.doglastfeed = 0;

    if (!isNumber(user.armor)) user.armor = 0;
    if (!isNumber(user.armordurability)) user.armordurability = 0;
    if (!isNumber(user.sword)) user.sword = 0;
    if (!isNumber(user.sworddurability)) user.sworddurability = 0;
    if (!isNumber(user.pickaxe)) user.pickaxe = 0;
    if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0;
    if (!isNumber(user.fishingrod)) user.fishingrod = 0;
    if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0;

    if (!isNumber(user.lastclaim)) user.lastclaim = 0;
    if (!isNumber(user.lasthourly)) user.lasthourly = 0;
    if (!isNumber(user.lastadventure)) user.lastadventure = 0;
    if (!isNumber(user.lastfishing)) user.lastfishing = 0;
    if (!isNumber(user.lastdungeon)) user.lastdungeon = 0;
    if (!isNumber(user.lastduel)) user.lastduel = 0;
    if (!isNumber(user.lastmining)) user.lastmining = 0;
    if (!isNumber(user.lasthunt)) user.lasthunt = 0;
    if (!isNumber(user.lastweekly)) user.lastweekly = 0;
    if (!isNumber(user.lastmonthly)) user.lastmonthly = 0;
    if (!isNumber(user.adventurecount)) user.adventurecount = 0;
  } else {
    global.db.users[m.sender] = {
      limit: 25,
      lastChat: new Date() * 1,
      premium: m.isOwner ? true : false,
      name: m.pushName,
      banned: false,

      exp: 0,
      point: 0,
      lastclaim: 0,

      level: 0,
      role: "Beginner",

      balance: 0,
      health: 100,
      health: 100,
      potion: 10,
      trash: 0,
      wood: 0,
      rock: 0,
      string: 0,
      petFood: 0,

      emerald: 0,
      diamond: 0,
      gold: 0,
      iron: 0,

      common: 0,
      uncommon: 0,
      mythic: 0,
      legendary: 0,
      pet: 0,

      sapi: 0,
      banteng: 0,
      harimau: 0,
      gajah: 0,
      kambing: 0,
      panda: 0,
      buaya: 0,
      kerbau: 0,
      sapi: 0,
      monyet: 0,
      ayam: 0,
      domba: 0,

      horse: 0,
      horseexp: 0,
      cat: 0,
      catngexp: 0,
      fox: 0,
      foxexp: 0,
      dog: 0,
      dogexp: 0,

      horselastfeed: 0,
      catlastfeed: 0,
      foxlastfeed: 0,
      doglastfeed: 0,

      armor: 0,
      armordurability: 0,
      sword: 0,
      sworddurability: 0,
      pickaxe: 0,
      pickaxedurability: 0,
      fishingrod: 0,
      fishingroddurability: 0,

      lastclaim: 0,
      lasthourly: 0,
      lastadventure: 0,
      lastfishing: 0,
      lastdungeon: 0,
      lastduel: 0,
      lastmining: 0,
      lasthunt: 0,
      lastweekly: 0,
      lastmonthly: 0,
      adventurecount: 0,
    };
  }

  if (m.isGroup) {
    let group = global.db.chats[m.from];
    if (typeof group !== "object") global.db.chats[m.from] = {};
    if (group) {
      if (!isBoolean(group.mute)) group.mute = false;
      if (!isNumber(group.lastChat)) group.lastChat = new Date() * 1;
      if (!isBoolean(group.welcome)) group.welcome = true;
      if (!isBoolean(group.leave)) group.leave = true;

      if (!isBoolean(group.banned)) group.banned = false;
      if (!isBoolean(group.chatAi)) group.chatAi = false;
    } else {
      global.db.chats[m.from] = {
        lastChat: new Date() * 1,
        mute: false,
        welcome: true,
        leave: true,
        banned: false,
        chatAi: false,
      };
    }
  }
  
  let setting = global.db.settings 
  if (setting) {
  	if (!("character_id" in setting)) setting.character_id = '-'
  	if (!("model" in setting)) setting.model = '-'
  } else {
  	global.db.settings = {
  		model: '-'
  	}
  }
}

module.exports.idb = idb