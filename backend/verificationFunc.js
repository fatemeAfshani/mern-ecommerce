const TrezSmsClient = require("trez-sms-client");
const client = new TrezSmsClient(
  process.env.SMS_USERNAME,
  process.env.SMS_PASSWORD
);

module.exports = client;
