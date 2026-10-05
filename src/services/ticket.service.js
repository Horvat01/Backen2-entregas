import { createTicketRepository } from "../repositories/ticket.repository.js";
import { randomBytes } from "crypto";
import { getEventByIdRepository } from "../repositories/event.repository.js";
import { enviarMail } from "./mail.service.js";

const generateReservationCode = () => {
    return `TCK-${randomBytes(4).toString("hex").toUpperCase()}`;
};

export const createTicketService = async ({ eventId, quantity = 1, user }) => {
    const event = await getEventByIdRepository(eventId);

    if (!event) {
        throw new Error("Evento no encontrado");
    }

    const reservationCode = generateReservationCode();

    const ticket = await createTicketRepository({
        user: user._id,
        event: event.id,
        quantity: quantity,
        reservationCode: generateReservationCode,
        status: "confirmed"
    });

    await enviarMail(
        user.email,
        "Nueva reserva",
        `<h1>Reserva confirmada</h1>
         <p>Código de reserva: ${reservationCode}</p>
         <p>Evento: ${event.title}</p>
         <p>Cantidad: ${quantity}</p>`,
        `Reserva confirmada. Código: ${reservationCode}`
    );

    return ticket;
};