import { Message } from "discord.js";
import { TimeSlot } from "../db/TimeSlot";
import { BaseCommand } from "./base.command";
import * as moment from 'moment';

export class ListCommandsCommand extends BaseCommand {
  static command: string = "comandos";

  static async run(message: Message, args: any[]) {
    console.log('aqui');
    if (!message.member.roles.cache.some(r => r.name === "Administrador") && !message.member.roles.cache.some(r => r.name === "Moderador")) {
      return;
    }
    message.reply(`\`!abrir-agendamento\`
    manda uma mensagem mencionanto todos e liberando o canal
    O bot já faz isso automaticamente às 19h30
    \`!fechar-agendamento\`
    manda uma mensagem mencionanto todos e fechando o canal
    O bot já faz isso automaticamente quando os 8 horários foram preenchidos
    \`!permitir-repeticao\`
    manda uma mensagem mencionanto todos e libera agendamento pra quem já fez
    O bot já faz isso automaticamente às 22h30
    \`!agendar <nomeDoCanal> <horárioPreferencial> <horárioAlternativo>\`
    manda uma mensagem mencionanto todos e libera agendamento pra quem já fez
    O bot já faz isso automaticamente às 22h30
    \`!remover <horário> <dia>\`
    remove o agendamento desse usuário
    \`!alterar <nomeDoCanalAnterior> <nomeDoCanalNovo> <dia>\`
    troca o agendamento desse usuário para o outro
    \`!listar-agendamentos <dia>\`
    mostra todos os agendamentos salvos no banco de dados para o dia selecionado.
    Se o dia não for adicionado, mostra para o dia em que o comando foi enviado.
    \`!comandos\`
    lista todos os comandos do bot
    `).catch(error => console.log(error))

  }
}