import { Message } from "discord.js";
import { TimeSlot } from "../db/TimeSlot";
import { BaseCommand } from "./base.command";
import * as moment from 'moment';

export class ListCommand extends BaseCommand {
  static command: string = "listar";

  static async run(message: Message) {
    // return message.reply("Pong!");
    const all = await TimeSlot.find({}, null, {sort: { day: 1 }});
    console.log(all);

  }
}