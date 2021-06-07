import { Message } from "discord.js";

export class BaseCommand {
  static run(message: Message, ...args: any[]){}
}