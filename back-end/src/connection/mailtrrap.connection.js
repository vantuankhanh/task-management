const { MailtrapClient } = require("mailtrap");
const { errorHandler } = require("../loggers/errorHandler");

const { MAILTRAP_EMAIL, MAILTRAP_TOKEN, MAILTRAP_ENDPOINT, MAILTRAP_NAME } =
  process.env;

const client = new MailtrapClient({
  endpoint: MAILTRAP_ENDPOINT,
  token: MAILTRAP_TOKEN,
});

const sender = {
  email: MAILTRAP_EMAIL,
  name: MAILTRAP_NAME,
};

const sendEmail = async (to, subject, text) => {
  try {
    console.log("----------> Sending email...");

    const info = await client.send({
      from: sender,
      to: [{ email: to }],
      subject: subject,
      text: text,
      category: "Task Manager",
    });

    return info.success;
  } catch (error) {
    errorHandler(error, "send mail");
    return false;
  }
};

module.exports = { sendEmail };
