const bcrypt = require("bcrypt");
const logger = require("../loggers/loggers.config");

async function hashPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    console.log("Can't hash password");
    logger.error(error);
    throw new Error("Can't hash password");
  }
}

async function compareHashPassword(inputPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    console.log("Can't compare password");
    logger.error(error);
    throw new Error("Can't compare password");
  }
}

module.exports = { hashPassword, compareHashPassword };
