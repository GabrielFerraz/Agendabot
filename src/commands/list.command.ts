import { Message } from "discord.js";
import { TimeSlot } from "../db/TimeSlot";
import { BaseCommand } from "./base.command";
import * as moment from 'moment';
import { slots, days } from "../helpers/config";

export class ListCommand extends BaseCommand {
  static command: string = "listar-agendamentos";

  static async run(message: Message, args: any[]) {
    // return message.reply("Pong!");
    if (!message.member.roles.cache.some(r => r.name === "Administrador") && !message.member.roles.cache.some(r => r.name === "Moderador")) {
      return;
    }
    const day: string = args[0];
    const dayNumber = day ? days[day.toLocaleLowerCase()] : moment.default().weekday();
    console.log();
    const all = await TimeSlot.find({day: dayNumber}, null, {sort: { slot: 1 }});
    if (all.length == 0) {
      return message.reply("Não há agendamentos para esse dia");
    }
    console.log(all);
    let string = `\n **Agendamentos de ${day}:**\n`;
    for (const streamer of all) {
      string += `**${streamer.user}** das ${slots[streamer.slot as number]} \n`
    }
    message.reply(string).catch(error => console.log(error))

  }
}