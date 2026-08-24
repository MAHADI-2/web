import dotenv from "dotenv";
dotenv.config();

const config={
    PORT:process.env.PORT,
MONGO_URL:process.env.MONGO_URL,
SMTP_HOST:process.env.SMTP_HOST,
SMTP_PORT:process.env.SMTP_PORT,
BREVO_SMTP_USER:process.env.BREVO_SMTP_USER,
SMTP_KYE:process.env.SMTP_KYE,
JWT_SECRET:process.env.JWT_SECRET,
JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
EMAIL_FROM:process.env.EMAIL_FROM
}



export default config