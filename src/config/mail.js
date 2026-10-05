import nodemailer from "nodemailer";
import { env } from "./env.js";

export const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: false,
    auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
    },
});

export const enviarMail = async (to, subject, html, text) => {
    try {
        await transporter.sendMail({
            from: env.SMTP_USER,
            to: to,
            subject: subject,
            html: html,
            text: text,
        });
    } catch (error) {
        console.error("Error al enviar el mail:", error);
        throw error;
    }
}
