import nodemailer from "nodemailer";
import config from "../../config.js";
export const sendEmail= async (email, subject, text) => {

const transporter = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        auth: {
            user: config.BREVO_SMTP_USER,
            pass: config.SMTP_KYE,
        },
    });

    const mailOptions={
        from: config.EMAIL_FROM,
        to: email,
        subject: subject,
        text: text,
    };
    await transporter.sendMail(mailOptions);



}