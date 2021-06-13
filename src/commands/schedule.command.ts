import { Message } from "discord.js";
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

      let bot = container.get<Bot>(TYPES.Bot);
      const user: string = args[0];
      const username: string = user.toLowerCase();
      const primarySlot: number = args[1];
      const alternativeSlot: number = args[2] ? args[2] : args[1];
      console.log(args[2]);
      const scheduleDay = moment.default().add(1, 'd').weekday();

      const primaryTimeSlot = await TimeSlot.find({ slot: primarySlot, day: scheduleDay });
      const alternativeTimeSlot = await TimeSlot.find({ slot: alternativeSlot, day: scheduleDay });
      const previousSchedule = await TimeSlot.find({ username: username });
      
      console.log("primaryTimeSlot: ", primaryTimeSlot);
      console.log("alternativeTimeSlot: ", alternativeTimeSlot);
      console.log("previousSchedule: ", previousSchedule);
      console.log("Allowed repeat: ", bot.allowed);

      // //verifying if user hadn't scheduled before and if there is any slot available 
      if (
        (primaryTimeSlot.length >= 1 && alternativeTimeSlot.length >= 1) || 
        (previousSchedule.length >= 1 && !bot.allowed) || 
        (previousSchedule.length >= 2 && bot.allowed)) {
        return message.react('❌');
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

      message.reply(`Horário das ${slots[selectedSlot]} agendado`);

      return message.react('✅');
    } catch (error) {
      console.log(error);
    }
    
  }

}