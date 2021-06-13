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
      const channel = await bot.client.channels.fetch("850750258568757321") as TextChannel;
      channel.send(`@everyone O agendamento está aberto.
Lembrando que o agendamento será feito pelo comando \`!agendar <nomeDoSeuCanal> <HorarioPrincipal> <HorárioSecundário(OPCIONAL)>\`
Ex.:
\`!agendar GabrielFrrz 4\``)
      channel.overwritePermissions(
        [
          {
            id: streamerRole.id,
            allow: ['SEND_MESSAGES']
          },
          {
            id: roles.cache.find(r => r.name === 'Collective Bot').id,
            allow: ['MANAGE_CHANNELS', 'MANAGE_GUILD', 'MANAGE_ROLES']
          }
        ]
      )
      
      
    } catch(e) {
      console.log(e);
    }
  }
}