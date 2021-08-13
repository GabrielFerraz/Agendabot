import { Message } from "discord.js";
import { BaseCommand } from "./base.command";
import { TimeSlot, TimeSlotDocument } from "../db/TimeSlot";
import * as moment from 'moment';
import { days } from "../helpers/config";

export class InsertCommand extends BaseCommand {
  static command: string = "adicionar";

  static async run(message: Message, args: any[]) {
    try {
      if (!message.member.roles.cache.some(r => r.name === "Administrador") && !message.member.roles.cache.some(r => r.name === "Moderador")) {
        return;
      }
      const user = args[0];
      const slot = args[1];
      const day = args[2] ? days[args[2].toLowerCase()] : moment.default().weekday();
      const filter = {
        slot: slot,
        day: day
      };
      console.log("find filter", filter);

      const doc = await TimeSlot.findOne(filter)
      console.log(doc);

      if (!doc) {
        return message.reply(`Horário ${slot} na(o) ${days[args[2].toLocaleLowerCase()]} preenchido`)
      }

      const res: TimeSlotDocument = new TimeSlot({
        user,
        username: user.toLowerCase(),
        day,
        slot
      });
      await res.save();

      await message.reply(`Horário de ${user} - ${slot} na(o) ${days[args[2].toLocaleLowerCase()]} inserido`);

    } catch (e) {
      console.log(e);
    }
  }
}