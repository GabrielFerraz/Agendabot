import { TransformableInfo } from "logform";
import winston from "winston";
import DailyRotateFile from 'winston-daily-rotate-file';

const getLogger = (): winston.Logger => {
  const { format } = winston;
  const logFormat = format.printf((info: TransformableInfo) => {
    return `${info.timestamp} DEV.${info.level.toUpperCase()}: ${info.message}`;
  });
  const rotator = new DailyRotateFile({
    datePattern: "YYYY-MM-DD",
    dirname: "logs",
    filename: "log-%DATE%.log",
    maxFiles: "30d",
    maxSize: "50m"
  });

  return winston.createLogger({
    exceptionHandlers: [rotator],
    format: format.combine(format.timestamp(), logFormat),
    transports: [rotator]
  });
};

export default getLogger;
