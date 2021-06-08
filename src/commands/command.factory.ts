import { BaseCommand } from "./base.command";
import { ListCommand } from "./list.command";
import { OpenScheduleCommand } from "./open-schedule.command";
import { PingCommand } from "./ping.command";
import { ScheduleCommand } from "./schedule.command";

export class CommandFactory {

  public static getCommand(command: string): any {
    switch (command) {
      case PingCommand.command:
        return PingCommand;
      case ScheduleCommand.command:
        return ScheduleCommand;
      case ListCommand.command:
        return ListCommand;
      case OpenScheduleCommand.command:
        return OpenScheduleCommand;
      default:
        return undefined;
    }
  }
}