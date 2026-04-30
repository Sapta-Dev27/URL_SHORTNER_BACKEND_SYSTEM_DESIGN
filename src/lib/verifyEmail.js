import nodemailer from 'nodemailer';


const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_User;
const smtpPass = process.env.SMTP_Pass;
const smtpFrom = process.env.MAIL_FROM;



const sendVerificationEmail = async (emailTo, subject, content) => {
  try {
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom) {
      console.error('SMTP configuration is missing. Please check your environment variables.');
      throw new Error('SMTP configuration is missing. Please check your environment variables.');
    }

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
      subject: subject,
      html: content
    })

    console.log(`Verification email sent successfully to ${emailTo} with subject "${subject}"`);
  }
  catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Error sending verification email');
  }
}

  const sendSuccessEmail = async (emailTo, subject, content) => {

    if (!emailTo || !subject || !content) {
      console.error('Email parameters are missing. Please provide emailTo, subject, and content.');
      return;
    }

    if (!smtpPass || !smtpUser || !smtpHost || !smtpPort || !smtpFrom) {
      console.error('SMTP configuration is missing. Please check your environment variables.');
      return;
    }

    const transporter = nodemailer.createTransport({
      port: smtpPort,
      host: smtpHost,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      secure: false
    })

    await transporter.sendMail({
      from: smtpFrom,
      to: emailTo,
      subject: subject,
      html: content
    })
  }


  
  export { sendVerificationEmail, sendSuccessEmail };
