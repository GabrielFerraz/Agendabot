import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types/types";
import { Bot } from "./bot/bot";
import { Client } from "discord.js";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.BOT_TOKEN);

export default container;