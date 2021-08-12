import { Message } from "discord.js";
import { BaseCommand } from "./base.command";
import { TimeSlot, TimeSlotDocument } from "../db/TimeSlot";
import * as moment from 'moment';
import { days } from "../helpers/config";

export class UpdateCommand extends BaseCommand {
  static command: string = "alterar";

  static async run(message: Message, args: any[]) {
    try {
      if (!message.member.roles.cache.some(r => r.name === "Administrador") && !message.member.roles.cache.some(r => r.name === "Moderador")) {
        return;
      }
      const initialUser = args[0];
      const newUser: string = args[1];
      const day = args[2] ? days[args[2].toLocaleLowerCase()] : moment.default().weekday();
      const filter = {
        user: initialUser,
        day: day
      };
      console.log("find filter", filter);

      const doc = await TimeSlot.findOne(filter)
      console.log(doc);

      if (!doc) {
        return message.reply(`Usuário ${initialUser} não encontrado`)
      }

      const res = await TimeSlot.updateOne({
        user: initialUser,
        day: day
      }, {
        user: newUser,
        username: newUser.toLowerCase()
      })

      if (res.nModified > 0) {
        return message.reply(`Agendamento alterado de ${initialUser} para ${newUser}`);
      }





    } catch (e) {
      console.log(e);
    }
  }
}