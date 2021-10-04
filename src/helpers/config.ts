import getLogger from "./Logger";
import dotenv from "dotenv";
dotenv.config();

export const logger = getLogger();
export const slots = {
  1: "11:00 às 13:00",
  2: "13:00 às 15:00",
  3: "15:00 às 17:00",
  4: "17:00 às 19:00",
  5: "19:00 às 21:00",
  6: "21:00 às 23:00"
};

export const days = {
  "segunda": 1,
  "terça": 2,
  "terca": 2,
  "quarta": 3,
  "quinta": 4,
  "sexta": 5,
  "sábado": 6,
  "sabado": 6,
};

export var allowed = false;

class Config {
  // dev environment variables
  public chatLivre: string = process.env.CHAT_LIVRE!;
  public presenca: string = process.env.PRESENCA!;
  public reservarHorarios: string = process.env.RESERVAR_HORARIOS!;
  public staff: string = process.env.STAFF!;
  public staffPresenca: string = process.env.STAFF_PRESENCA!;
}

export const config =  new Config();