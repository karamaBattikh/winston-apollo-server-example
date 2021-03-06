import winston from 'winston'
import getEnv from '../utils/getEnv'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const env = getEnv('NODE_ENV', 'development')
  return env === 'development' ? 'debug' : 'warn'
}

// const colors = {
//   error: 'red',
//   warn: 'yellow',
//   info: 'green',
//   http: 'magenta',
//   debug: 'white',
// };

// winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) =>
      `${info.level}: { message:${info.message}, timestamp: ${info.timestamp} }`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: getEnv('LOG_PATH', 'logs/log.log') }),
]

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export default Logger
