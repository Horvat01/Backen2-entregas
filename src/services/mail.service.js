import { transporter } from "../config/mail.js";
import { env } from "../config/env.js";

export async function enviarMail(to, subject, html, text) {
    try {
        await transporter.sendMail({
            from: env.MAIL_FROM,
            to: to,
            subject: subject,
            html: html,
            text: text
        });
    } catch (error) {
        throw error;
    }
}

// const info = await transporter.sendMail({
//     from: '"Example Team" <team@example.com>', // sender address
//     to: "alice@example.com, bob@example.com", // list of recipients
//     subject: "Hello", // subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // HTML body
// });

// console.log("Message sent: %s", info.messageId);