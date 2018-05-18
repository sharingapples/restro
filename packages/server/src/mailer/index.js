import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: 'restro.net@gmail.com',
    pass: 'Restro123*#',
  },
});

export default async function mailer(options) {
  return transporter.sendMail(options);
}

