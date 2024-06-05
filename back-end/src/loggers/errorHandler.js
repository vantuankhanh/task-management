const logger = require("./loggers.config");

const errorHandler = (error, name) => {
  let log = console.log;

  log("\n\n----------> Error when running:", name);
  log(error);
  log("\n\n");

  logger.error(error);
};

module.exports = {
  errorHandler,
};
