import { BaseCommand } from "./base.command";
import { PingCommand } from "./ping.command";
import { ScheduleCommand } from "./schedule.command";

export class CommandFactory {

  public static getCommand(command: string): any {
    switch (command) {
      case 'ping':
        return PingCommand;
      case 'agendar':
        return ScheduleCommand;
      default:
        return undefined;
    }
  }
}