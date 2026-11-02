import { transporter } from "../config/mail.js";
import { env } from "../config/env.js";

export async function enviarMail(to, subject, html, text) {
    return transporter.sendMail({
        from: env.MAIL_FROM,
        to,
        subject,
        html,
        text
    });
}