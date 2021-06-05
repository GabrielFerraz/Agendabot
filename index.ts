// const Discord = require("discord.js");
// const config = require("./config.json");
import * as Discord from "discord.js";
import * as config from "./config.json";

const client = new Discord.Client();
const prefix = '!';

client.login(config.BOT_TOKEN);

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.parent.name !== "Lobisomem") return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }
}