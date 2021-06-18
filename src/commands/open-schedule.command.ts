import { Message, TextChannel } from "discord.js";
import { TimeSlotDocument, TimeSlot } from "../db/TimeSlot";
import { BaseCommand } from "./base.command";
import * as moment from 'moment';
import { Bot } from "../bot/bot";
import container from "../inversify.config";
import { TYPES } from "../types/types";

export class OpenScheduleCommand extends BaseCommand {
  static command: string = "abrir-agendamento";

  static async run(message: Message, args: any[]) {
    try {
      if (!message.member.roles.cache.some(r => r.name === "Administrador") && !message.member.roles.cache.some(r => r.name === "Moderador")) {
        return;
      }
      let bot = container.get<Bot>(TYPES.Bot);
      let roles = message.guild.roles; // collection

      // find specific role - enter name of a role you create here
      let streamerRole = roles.cache.find(r => r.name === 'Streamer');
      // 838997384377663518 - 『💬』chat-livre
      // 849670069138489344 - 『📒』reservar-horários
      // 850750258568757321 - geral
      const general = await bot.client.channels.fetch("838997384377663518") as TextChannel;
      console.log( ...general.permissionOverwrites );
      

      console.log(general.permissionOverwrites);
      general.send(`@everyone O agendamento está aberto.
Lembrando que o agendamento será feito pelo comando \`!agendar <nomeDoSeuCanal> <HorarioPrincipal> <HorárioSecundário(OPCIONAL)>\`
Ex.:
\`!agendar GabrielFrrz 4\``)
      const channel = await bot.client.channels.fetch("849670069138489344") as TextChannel;
      const permissions = channel.permissionOverwrites.map(rolePermissions => {
        // let role = message.guild.roles.cache.get();
        if (rolePermissions.id === streamerRole.id) {
          rolePermissions.allow = rolePermissions.allow.add('SEND_MESSAGES');
          rolePermissions.deny = rolePermissions.deny.remove('SEND_MESSAGES');
        }
      });
      channel.overwritePermissions(channel.permissionOverwrites)
      
      
    } catch(e) {
      console.log(e);
    }
  }
}