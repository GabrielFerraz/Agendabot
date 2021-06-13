import { Message } from "discord.js";
import { TimeSlotDocument, TimeSlot } from "../db/TimeSlot";
import { BaseCommand } from "./base.command";
import * as moment from 'moment';

export class OpenScheduleCommand extends BaseCommand {
  static command: string = "liberar";
  static slots = {
    1: "11:30 às 13:00",
    2: "13:00 às 14:30",
    3: "14:30 às 16:00",
    4: "16:00 às 17:30",
    5: "17:30 às 19:00",
    6: "19:00 às 20:30",
    7: "20:30 às 22:00",
    8: "22:00 às 23:30"
  }

  static async run(message: Message, args: any[]) {
    try {
      console.log("member", message.member.roles.cache);
      if (!message.member.roles.cache.some(r => r.name === "Administrador") && !message.member.roles.cache.some(r => r.name === "Moderador")) {
        return;
      }
      const day = args[1] ? args[1] : moment.default().weekday();
      console.log(day);
      const res = await TimeSlot.deleteOne({
        day,
        slot: args[0]
      })

      console.log(res);

      if (res.n === 1){
        return message.reply(`Removido o agendamento das ${this.slots[args[0]]}`);
      }
      
    } catch(e) {
      console.log(e);
    }
  }
}