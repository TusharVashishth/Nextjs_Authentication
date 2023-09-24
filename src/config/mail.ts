import nodemailer from "nodemailer";
import Env from "./env";

export const transporter = nodemailer.createTransport({
  host: Env.SMTP_HOST,
  port: Number(Env.SMTP_PORT),
  secure: false,
  auth: {
    user: Env.SMTP_USER,
    pass: Env.SMTP_PASSWORD,
  },
});

// * To send the email
export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<string | null> => {
  const info = await transporter.sendMail({
    from: Env.EMAIL_FROM,
    to: to,
    subject: subject,
    html: html,
  });

  return info?.messageId;
};
