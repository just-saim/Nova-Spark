const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // If no SMTP user is provided, just log the email (useful for local testing without credentials)
  if (!process.env.SMTP_USER || process.env.SMTP_USER === 'youremail@gmail.com') {
    console.log('Mock Email Sent:');
    console.log('To:', options.to);
    console.log('Subject:', options.subject);
    console.log('Text:', options.text);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
