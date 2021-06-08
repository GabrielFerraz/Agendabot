import { Message } from "discord.js";
import { TimeSlot } from "../db/TimeSlot";
import { BaseCommand } from "./base.command";

export class ListCommand extends BaseCommand {
  static command: string = "listar";

  static async run(message: Message) {
    // return message.reply("Pong!");
    const all = await TimeSlot.find();
    console.log(all);
  }
}