import { Message } from "discord.js";
import { TimeSlot } from "../db/TimeSlot";
import { BaseCommand } from "./base.command";
import * as moment from 'moment';

export class ListCommandsCommand extends BaseCommand {
  static command: string = "comandos";

  static async run(message: Message) {
    message.reply(`\`\*\*!abrir-agendamento\*\*\`
    abrir agendamento manda uma mensagem mencionanto todos e liberando o 
    \`\*\*!fechar-agendamento\`\*\*
    \`\*\*!liberar\`\*\*`)

  }
}