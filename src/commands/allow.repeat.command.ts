import { Message, TextChannel } from "discord.js";
import { Bot } from "../bot/bot";
import { allowed } from "../helpers/config";
import container from "../inversify.config";
import { TYPES } from "../types/types";
import { BaseCommand } from "./base.command";

export class AllowCommand extends BaseCommand {
  static command: string = "permitir-repeticao";

  static async run(message: Message) {
    let bot = container.get<Bot>(TYPES.Bot);
    if ((!message.member.roles.cache.some(r => r.name === "Administrador") && !message.member.roles.cache.some(r => r.name === "Moderador")) || bot.allowed) {
      return;
    }
    // return message.reply("Pong!");
    
    bot.allowed = true;
    const general = await bot.client.channels.fetch("838997384377663518") as TextChannel;
    await general.send(`@everyone O agendamento está aberto para todos`);

  }
}