import nodemailer from 'nodemailer';

console.log('Mailer host is', process.env.RESTRO_MAILER_HOST);
console.log('Mailer email is', process.env.RESTRO_MAILER_EMAIL);

const transporter = nodemailer.createTransport({
  host: process.env.RESTRO_MAILER_HOST,
  port: process.env.RESTRO_MAILER_PORT,
  secure: process.env.RESTRO_MAILER_SECURE,
  auth: {
    user: process.env.RESTRO_MAILER_EMAIL,
    pass: process.env.RESTRO_MAILER_PASSWORD,
  },
});

export default async function mailer(options) {
  return transporter.sendMail(options);
}
