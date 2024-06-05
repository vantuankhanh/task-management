const twilio = require("twilio");
const { errorHandler } = require("../loggers/errorHandler");

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  TWILIO_VERIFY_SERVICE_SID,
} = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendMessage = async (phoneNumber, content) => {
  try {
    const message = await client.messages.create({
      from: TWILIO_PHONE_NUMBER,
      to: phoneNumber,
      body: content,
    });

    return message;
  } catch (e) {
    errorHandler(e, "send message");
    return false;
  }
};

module.exports = {
  sendMessage,
};
