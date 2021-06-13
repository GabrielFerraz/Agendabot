import { Message } from "discord.js";
import { Bot } from "../bot/bot";
import { allowed } from "../helpers/config";
import container from "../inversify.config";
import { TYPES } from "../types/types";
import { BaseCommand } from "./base.command";

export class AllowCommand extends BaseCommand {
  static command: string = "permitir-repeticao";

  static async run(message: Message) {
    let bot = container.get<Bot>(TYPES.Bot);
    // return message.reply("Pong!");
    bot.allowed = true;
  }
}