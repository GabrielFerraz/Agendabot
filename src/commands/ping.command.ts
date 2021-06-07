import { Message } from "discord.js";
import { BaseCommand } from "./base.command";

export class PingCommand extends BaseCommand {
  static command: string = "ping";

  static async run(message: Message) {
    return message.reply("Pong!");
  }
}