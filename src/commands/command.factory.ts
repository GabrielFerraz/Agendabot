import { AllowCommand } from "./allow.repeat.command";
import { BaseCommand } from "./base.command";
import { ListCommand } from "./list.command";
import { ReleaseScheduleCommand } from "./release-schedule.command";
import { PingCommand } from "./ping.command";
import { ScheduleCommand } from "./schedule.command";
import { OpenScheduleCommand } from "./open-schedule.command";
import { CloseScheduleCommand } from "./close-schedule.command";
import { UpdateCommand } from "./update.command";
import { ListCommandsCommand } from "./list-commands.command";

export class CommandFactory {

  public static getCommand(command: string): any {
    switch (command) {
      case PingCommand.command:
        return PingCommand;
      case ScheduleCommand.command:
        return ScheduleCommand;
      case ListCommand.command:
        return ListCommand;
      case ReleaseScheduleCommand.command:
        return ReleaseScheduleCommand;
      case AllowCommand.command:
        return AllowCommand;
      case OpenScheduleCommand.command:
        return OpenScheduleCommand;
      case CloseScheduleCommand.command:
        return CloseScheduleCommand;
      case UpdateCommand.command:
        return UpdateCommand;
      case ListCommandsCommand.command:
        return ListCommandsCommand;
      default:
        return undefined;
    }
  }
}