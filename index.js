const Discord = require("discord.js");
const moment = require("moment");
const dotenv = require("dotenv").config();

const client = new Discord.Client();
const prefix = '!';
const db = require("./db");
const Agendamento = db.Mongoose.model('agendamento', db.AgendamentoSchema, 'agendamento');
let clear = false;
const slots = {
  1 : "11:30 às 13:00",
  2 : "13:00 às 14:30",
  3 : "14:30 às 16:00",
  4 : "16:00 às 17:30",
  5 : "17:30 às 19:00",
  6 : "19:00 às 20:30",
  7 : "20:30 às 22:00",
  8 : "22:00 às 23:30"
}

client.login(process.env.BOT_TOKEN);

client.on("message", async (message) => {
  if (message.author.bot) return;
  // if (message.channel.parent.name !== "reservar-horários") return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    const previous = await Agendamento.find()
    console.log("previous", previous);
  }

  if (command === "agendar") {
    const previous = await Agendamento.findOne({username: args[0].toLocaleLowerCase()})
    console.log("previous", previous);
    if (previous) {
      return message.react('❌');
    } else {
      const tomorrow = moment().add(1, "d").day();
      const slot1 = await Agendamento.findOne({
        day: tomorrow,
        slot: args[1]
      },{}, {}, (e, doc) => {
        console.log(doc);
      });
      const slot2 = await Agendamento.findOne({
        day: tomorrow,
        slot: args[1]
      }, {}, {}, (e, doc) => {
        console.log(doc);
      });

      if (slot1 && slot2) {
        return message.react('❌');
      } else {
        if (!slot1) {
          const agendamento = new Agendamento({
            user: args[0],
            username: args[0].toLocaleLowerCase(),
            day: tomorrow,
            slot: args[1]
          });
          await agendamento.save();
          message.reply(`Agendado para o horário de ${slots[args[1]]}`);
          return message.react("✅");
        }else if (!slot2) {
          const agendamento = new Agendamento({
            user: args[0],
            username: args[0].toLocaleLowerCase(),
            day: tomorrow,
            slot: args[2]
          });
          await agendamento.save();
          message.reply(`Agendado para o horário de ${slots[args[2]]}`);
          return message.react("✅");
        }
      }

      
    }
  }

  if (command === "limpar") {
    clear = true;
    message.reply(`Você tem certeza que quer limpar o Banco? !s ou !n`);
  }

  if (command === "s") {
    if (clear) {
      await Agendamento.deleteMany({}, async () => {
        const previous = await Agendamento.find()
        console.log("previous", previous);
      });
      clear = false;
    }
  }

  if (command === "n") {
    if (clear) {
      clear = false;
    }
  }
})