import { Message } from "discord.js";
import { PingFinder } from "./ping-finder";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";
import { CommandFactory } from "../commands/command.factory";

@injectable()
export class MessageResponder {
  private pingFinder: PingFinder;
  private prefix = '!';

  constructor(
    @inject(TYPES.PingFinder) pingFinder: PingFinder
  ) {
    this.pingFinder = pingFinder;
  }

  handle(message: Message): Promise<Message | Message[]> {
    if (!this.isAccepted(message)) Promise.reject();
    const commandBody = message.content.slice(this.prefix.length);
    const args = commandBody.split(' ');
    const commandString = args.shift().toLowerCase();
    const command = CommandFactory.getCommand(commandString);

    return command.run(message, args);
  }

  private isAccepted(message): boolean {
    if (
      message.author.bot ||
      !message.content.startsWith(this.prefix)
    ) return false;
    return true;
  }
}