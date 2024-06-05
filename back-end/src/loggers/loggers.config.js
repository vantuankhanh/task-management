"use strict";

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const path = require("path");

const formatLogs = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: "Application" }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    formatLogs
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, "../../logs/all-logs.log"),
    }),
  ],
});

module.exports = logger;
