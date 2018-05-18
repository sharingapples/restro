import nodemailer from 'nodemailer';

console.log(process.env.RESTRO2018);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'restro2018@gmail.com',
    pass: process.env.RESTRO2018,
  },
});

export default async function mailer(options) {
  return transporter.sendMail(options);
}
