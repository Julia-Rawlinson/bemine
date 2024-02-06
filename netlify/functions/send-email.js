const process = require('process');
const sendgridMail = require('@sendgrid/mail');

exports.handler = async (event) => {
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

  const data = JSON.parse(event.body);

  const message = {
    to: data.to,
    from: 'rawlinsonjulia@gmail.com',
    subject: data.subject,
    text: data.message,
    html: data.html,
  };

  try {
    await sendgridMail.send(message);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.code,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

