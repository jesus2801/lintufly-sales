import { createLogger, transports, format } from 'winston';
import path from 'path';

const { combine, printf, label, timestamp, colorize } = format;

/**
 * Variable que almacena el formato de los logs
 * @category logger
 */
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

/**
 * Logger para información, sólo imprime en consola
 * @category logger
 */
const infoLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'LOG', message: true }), colorize(), timestamp(), myFormat),
  transports: [new transports.Console()],
});

/**
 * Logger para errores, imprime en consola y en el archivo de errors.log
 * @category logger
 */
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'ERR', message: true }), colorize(), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(__dirname, '../../errors.log') }),
  ],
});

/**
 * Logger para alertas, imprime tanto en consola cómo en errors.log
 * @category logger
 */
const warningLogger = createLogger({
  level: 'warn',
  format: combine(label({ label: 'WARN', message: true }), colorize(), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(__dirname, '../../errors.log') }),
  ],
});

/**
 * Clase del logger principal de la app, para errores, alertas e información
 * @category logger
 */
class AppLogger {
  public error(message: string) {
    errorLogger.error(message);
  }

  public info(message: string) {
    infoLogger.info(message);
  }

  public warning(message: string) {
    warningLogger.warn(message);
  }
}

export const logger = new AppLogger();
