import getLogger from "./Logger";
import dotenv from "dotenv";
dotenv.config();

export const logger = getLogger();
export const slots = {
  1: "11:30 às 13:00",
  2: "13:00 às 14:30",
  3: "14:30 às 16:00",
  4: "16:00 às 17:30",
  5: "17:30 às 19:00",
  6: "19:00 às 20:30",
  7: "20:30 às 22:00",
  8: "22:00 às 23:30"
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