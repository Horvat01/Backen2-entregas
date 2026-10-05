import nodemailer from "nodemailer";
import { env } from "./env.js";

export const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
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
