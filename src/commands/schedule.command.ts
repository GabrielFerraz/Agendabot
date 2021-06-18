import { Message, TextChannel } from "discord.js";
import { BaseCommand } from "./base.command";
import { TimeSlot, TimeSlotDocument } from "../db/TimeSlot";
import { Model } from "mongoose";
import * as moment from 'moment';
import { slots } from "../helpers/config";
import { Bot } from "../bot/bot";
import container from "../inversify.config";
import { TYPES } from "../types/types";

export class ScheduleCommand extends BaseCommand {
  static command: string = "agendar";

  static async run(message: Message, args: any[]) {
    try {
      if (!/!agendar [\w]+([ ]+[1-8]{1}){1,2}$/.test(message.content)) {
        return await message.reply(`Por Favor mandar no formato:\n\`!agendar <nomeDoSeuCanal> <HorarioPrincipal de 0 a 8> <horárioSecundário de 0 a 8(OPCIONAL)>\`\n ex.: \`!agendar Bot 1 2\``);
      }
      if (!args[1]) {
        return await message.reply(`Por Favor mandar o horário preferencial de 1 a 8.`);
      }
      let bot = container.get<Bot>(TYPES.Bot);
      const user: string = args[0];
      const username: string = user.toLowerCase();
      
      const primarySlot: number = args[1];
      const alternativeSlot: number = args[2] ? args[2] : args[1];
      console.log(args[2]);
      const format = 'hh:mm:ss';
      const checkTime = moment.default().isBetween(moment.default('00:00:00', format), moment.default('11:00:00', format))
      const scheduleDay = checkTime ? moment.default().weekday() : moment.default().add(1, 'd').weekday();

      const primaryTimeSlot = await TimeSlot.find({ slot: primarySlot, day: scheduleDay });
      const alternativeTimeSlot = await TimeSlot.find({ slot: alternativeSlot, day: scheduleDay });
      const previousSchedule = await TimeSlot.find({ username: username });
      
      console.log("primaryTimeSlot: ", primaryTimeSlot);
      console.log("alternativeTimeSlot: ", alternativeTimeSlot);
      console.log("previousSchedule: ", previousSchedule);
      console.log("Allowed repeat: ", bot.allowed);

      // //verifying if user hadn't scheduled before and if there is any slot available 
      if (primaryTimeSlot.length >= 1 && alternativeTimeSlot.length >= 1) {
        await message.reply(`Horário(s) já preenchido(s).`);
        return await message.react('❌');
      }
      if (previousSchedule.length >= 1 && !bot.allowed) {
        await message.reply(`Agendamento aberto somente para quem não fez agendamento na semana.`);
        return await message.react('❌');
      }
      if (previousSchedule.length >= 2 && bot.allowed) {
        await message.reply(`Você já agendou duas vezes essa semana.`);
        return await message.react('❌');
      }

      let selectedSlot;

      if (primaryTimeSlot.length === 0) {
        selectedSlot = primarySlot;
      } else if (alternativeTimeSlot.length === 0) {
        selectedSlot = alternativeSlot;
      }

      console.log(selectedSlot);

      const doc: TimeSlotDocument = new TimeSlot({
        user,
        username,
        day: scheduleDay,
        slot: selectedSlot
      });



      await doc.save();

      await message.reply(`Horário das ${slots[selectedSlot]} agendado`);
      await message.react('✅');
      

      const all = await TimeSlot.find({day: scheduleDay});
      if (all.length === 8) {
        bot.toggleSchedule(false);
      }

      return;
    } catch (error) {
      console.log(error);
    }
    
  }

  async sendScheduleMessage(day) {
    let bot = container.get<Bot>(TYPES.Bot);
    const localMoment = moment.default().locale("pt-br");
    const channel = await bot.client.channels.fetch("838996583365476352") as TextChannel;
    const all = await TimeSlot.find({day: day});
    let messageContent = `⠀⠀⠀⏰  **Horários**  ⏰ \n📅 ${localMoment.localeData().weekdays(day)}`

    for (const key in slots) {
      if (Object.prototype.hasOwnProperty.call(slots, key)) {
        const element = slots[key];
        const user = all.find(el => el.slot == parseInt(key));
        messageContent += ``
      }
    }
    if (bot.scheduleMessageId.length > 0) {
      const message = channel.messages.cache.find(m => m.id === "bot.scheduleMessageId")
    }
  }

}