const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty", // use only on development env!
  },
  level: process.env.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
});

module.exports = logger;
