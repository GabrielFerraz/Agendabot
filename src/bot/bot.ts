import { Client, Message, TextChannel } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";
import { MessageResponder } from "../services/message-responder";
import * as schedule from "node-schedule";
import { TimeSlot } from "../db/TimeSlot";
import moment from "moment";
import { logger } from "../helpers/config"
import { createSubtract } from "typescript";

@injectable()
export class Bot {
  public client: Client;
  private readonly token: string;
  private messageResponder: MessageResponder;
  private slots = {
    1: "11:30 às 13:00",
    2: "13:00 às 14:30",
    3: "14:30 às 16:00",
    4: "16:00 às 17:30",
    5: "17:30 às 19:00",
    6: "19:00 às 20:30",
    7: "20:30 às 22:00",
    8: "22:00 às 23:30"
  }
  public allowed = false;
  public scheduleMessageId: string;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.MessageResponder) messageResponder: MessageResponder) {
    this.client = client;
    this.token = token;
    this.messageResponder = messageResponder;
    this.initJobs();
    this.scheduleMessageId = "";
  }

  public listen(): Promise<string> {
    this.client.on('message', (message: Message) => {
      // return;
      const channel = message.channel as any;
      if (message.author.bot || !channel.name || channel.name !== "『📒』reservar-horários") {
        // console.log('Ignoring bot message!')
        return;
      }
      // const channel = message.channel as TextChannel;
      // console.log(message.channel.name);

      console.log("Message received! Contents: ", message.content);

      this.messageResponder.handle(message).then(() => {
        console.log("Response sent!");
      }).catch(() => {
        console.log("Response not sent.")
      })
    });

    return this.client.login(this.token);
  }

  initJobs() {
    schedule.scheduleJob('0 20 11 * * 1-6', () => {
      this.alertStream(1);
    });
    schedule.scheduleJob('0 02 13 * * 1-6', () => {
      this.alertStream(2);
    });
    schedule.scheduleJob('0 32 14 * * 1-6', () => {
      this.alertStream(3);
    });
    schedule.scheduleJob('0 02 16 * * 1-6', () => {
      this.alertStream(4);
    });
    schedule.scheduleJob('0 32 17 * * 1-6', () => {
      this.alertStream(5);
    });
    schedule.scheduleJob('0 02 19 * * 1-6', () => {
      this.alertStream(6);
    });
    schedule.scheduleJob('0 35 20 * * 1-6', () => {
      this.alertStream(7);
    });
    schedule.scheduleJob('0 02 22 * * 1-6', () => {
      this.alertStream(8);
    });
    schedule.scheduleJob('0 30 19 * * 0-5', () => {
      this.toggleSchedule(true);
    });
    schedule.scheduleJob('0 30 22 * * 0-5', () => {
      this.allowReschedule();
    });
    // this.alertStream(1);
  }

  async alertStream(slot) {
    console.log(`Slot: ${slot}`);
    const today = moment().weekday();
    console.log(`today: ${today}`);
    const doc = await TimeSlot.findOne({
      day: today,
      slot: slot
    });

    console.log(`CurrentLive: ${doc}`);
    let next;
    if (slot !== 8) {
      next = await TimeSlot.findOne({
        day: today,
        slot: slot + 1
      });
    } else {
      next = {
        user: ""
      }
    }

    console.log(`NextLive: ${next}`);

    const channel = await this.client.channels.fetch("841322089093005363") as any;
    channel.send(
      `⚠️ COLLECTIVE STREAMS ⚠️

@everyone

Instruções para a live:

 ⚠️  Não falar sobre o grupo no chat.

 ⚠️  Não deixe a live mutada.

 ⚠️ Errou raid é BAN.

 ⚠️ Não abriu live com 20 minutos de antecedência perde o horário.

 ⚠️ Todos devem assistir todas as lives, não comparecimento resulta em ban.

 ⚠️ Entre em live com pelo menos 20 minutos de antecedência

LINK: https://twitch.tv/${doc.user}

⏰ ${this.slots[slot]} ⏰

Próxima Raid: /raid ${next.user}

PARA PASSAR RAID É SÓ DIGITAR /raid "nick do próximo streamer"


Galera antes de passar o Raid, SEMPRE verificar se o próximo streamer está online.

LEMBRANDO QUE TEMOS OS ADMS QUE SÃO RESPONSÁVEIS PELA LISTA DE PRESENÇA, SABEMOS QUEM ESTÁ NA LIVE E QUEM NÃO ESTÁ`
    );
  }

  async toggleSchedule(open:boolean) {
    try {
      
      let roles = (await this.client.guilds.fetch("835150650706362419")).roles; // collection

      // find specific role - enter name of a role you create here
      let streamerRole = roles.cache.find(r => r.name === 'Streamer');
      // 838997384377663518 - 『💬』chat-livre
      // 849670069138489344 - 『📒』reservar-horários
      // 850750258568757321 - geral
      const general = await this.client.channels.fetch("838997384377663518") as TextChannel;
      console.log(...general.permissionOverwrites);


      console.log(general.permissionOverwrites);
      if (open) {
        general.send(`@everyone O agendamento está aberto para quem não fez live essa semana.
  Lembrando que o agendamento será feito pelo comando \`!agendar <nomeDoSeuCanal> <HorarioPrincipal [0-8] > <HorárioSecundário(OPCIONAL)[0-8]>\`
  Ex.:
  \`!agendar GabrielFrrz 4\``)
      } else {
        await general.send(`@everyone O agendamento está encerrado`);
        this.allowed = false;
      }
      const channel = await this.client.channels.fetch("849670069138489344") as TextChannel;
      const permissions = channel.permissionOverwrites.map(rolePermissions => {
        // let role = message.guild.roles.cache.get();
        if (rolePermissions.id === streamerRole.id) {
          if(open){
            rolePermissions.allow = rolePermissions.allow.add('SEND_MESSAGES');
            rolePermissions.deny = rolePermissions.deny.remove('SEND_MESSAGES');
          } else {
            rolePermissions.allow = rolePermissions.allow.remove('SEND_MESSAGES');
            rolePermissions.deny = rolePermissions.deny.add('SEND_MESSAGES');
          }
        }
      });
      channel.overwritePermissions(channel.permissionOverwrites)


    } catch (e) {
      console.log(e);
    }
  }

  async allowReschedule() {
    try {


      // 838997384377663518 - 『💬』chat-livre
      // 849670069138489344 - 『📒』reservar-horários
      // 838996583365476352 - 『📒』agendamentos
      // 850750258568757321 - geral
      const general = await this.client.channels.fetch("838997384377663518") as TextChannel;
      await general.send(`@everyone O agendamento está aberto para todos`);
      this.allowed = false;


    } catch (e) {
      console.log(e);
    }
  }
}