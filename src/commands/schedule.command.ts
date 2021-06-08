import { Message } from "discord.js";
import { BaseCommand } from "./base.command";
import { TimeSlot, TimeSlotDocument } from "../db/TimeSlot";
import { Model } from "mongoose";
import * as moment from 'moment';

export class ScheduleCommand extends BaseCommand {
  static command: string = "agendar";

  static async run(message: Message, args: any[]) {
    try {
      const user: string = args[0];
      const username: string = user.toLowerCase();
      const primarySlot: number = args[1];
      const alternativeSlot: number = args[2];
      const scheduleDay = moment.default().add(1, 'd').weekday();

      const primaryTimeSlot = await TimeSlot.find({ slot: primarySlot, day: scheduleDay });
      const alternativeTimeSlot = await TimeSlot.find({ slot: alternativeSlot, day: scheduleDay });
      const previousSchedule = await TimeSlot.find({ username: username });
      const all = await TimeSlot.find({});
      console.log(previousSchedule);

      //verifying if user hadn't scheduled before and if there is any slot available 
      if ((primaryTimeSlot.length >= 1 && alternativeTimeSlot.length >= 1) || previousSchedule.length >= 1) {
        return message.react('❌');
      }

      const doc: TimeSlotDocument = new TimeSlot({
        user,
        username,
        day: scheduleDay,
      });

      if (!primaryTimeSlot) {
        doc.slot = primarySlot;
      } else if (!alternativeTimeSlot) {
        doc.slot = alternativeSlot;
      }

      await doc.save();

      return message.react('✅');
    } catch (error) {
      console.log(error);
    }
    
  }

}