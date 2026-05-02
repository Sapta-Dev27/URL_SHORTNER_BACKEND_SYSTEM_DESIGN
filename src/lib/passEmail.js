import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_User;
const smtpPass = process.env.SMTP_Pass;
const smtpFrom = process.env.MAIL_FROM;


const sendResetPasswordEmail = async (emailTo, subjectTo, contentTo) => {
  if (!emailTo || !subjectTo || !contentTo) {
    console.error('Email parameters are missing. Please provide emailTo, subjectTo, and contentTo.');
    return;
  }
  if (!smtpPass || !smtpUser || !smtpHost || !smtpPort || !smtpFrom) {
    throw new Error('SMTP configuration is missing. Please check your environment variables.');
  }
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      secure: false
    })

    await transporter.sendMail({
      from: smtpFrom,
      to: emailTo,
      subject: subjectTo,
      html: contentTo
    })
  }
  catch (error) {
    console.error('Error sending reset password email:', error);
    throw new Error('Error sending reset password email');
  }

}

export { sendResetPasswordEmail };