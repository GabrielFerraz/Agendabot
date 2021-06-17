import { Message, TextChannel } from "discord.js";
import { TimeSlotDocument, TimeSlot } from "../db/TimeSlot";
import { BaseCommand } from "./base.command";
import * as moment from 'moment';
import { Bot } from "../bot/bot";
import container from "../inversify.config";
import { TYPES } from "../types/types";

export class CloseScheduleCommand extends BaseCommand {
  static command: string = "fechar-agendamento";

  static async run(message: Message, args: any[]) {
    try {
      if (!message.member.roles.cache.some(r => r.name === "Administrador") && !message.member.roles.cache.some(r => r.name === "Moderador")) {
        return;
      }
      let bot = container.get<Bot>(TYPES.Bot);
      let roles = message.guild.roles; // collection

      // find specific role - enter name of a role you create here
      let streamerRole = roles.cache.find(r => r.name === 'Streamer');
      const general = await bot.client.channels.fetch("850750258568757321") as TextChannel;
      await general.send(`@everyone O agendamento está encerrado`);
      const channel = await bot.client.channels.fetch("850750258568757321") as TextChannel;
      const permissions = channel.permissionOverwrites.map(rolePermissions => {
        // let role = message.guild.roles.cache.get();
        if (rolePermissions.id === streamerRole.id) {
          rolePermissions.allow = rolePermissions.allow.remove('SEND_MESSAGES');
          rolePermissions.deny = rolePermissions.deny.add('SEND_MESSAGES');
        }
      });
      channel.overwritePermissions(channel.permissionOverwrites)
      bot.allowed = false;
      
      
    } catch(e) {
      console.log(e);
    }
  }
}