import { transporter } from "../config/mail.js";
import { env } from "../config/env.js";
import nodemailer from "nodemailer";

export async function enviarMail(to, subject, html, text) {
    const info = await transporter.sendMail({
        from: env.MAIL_FROM,
        to,
        subject,
        html,
        text
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);

    console.log("Correo de prueba enviado correctamente");
    console.log("Vista previa:", previewUrl);

    return info;
}
