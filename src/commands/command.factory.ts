import { BaseCommand } from "./base.command";
import { PingCommand } from "./ping.command";

export class CommandFactory {

  public static getCommand(command: string): any {
    switch (command) {
      case 'ping':
        return PingCommand;
    
      default:
        return BaseCommand;
    }
  }
}