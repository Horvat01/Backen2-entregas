import { createTicketRepository, findActiveTicketsByEventRepository, findTicketsByUserRepository, findTicketsByEventRepository } from "../repositories/ticket.repository.js";
import { randomBytes } from "crypto";
import { getEventByIdRepository } from "../repositories/event.repository.js";
import { enviarMail } from "./mail.service.js";

const generateReservationCode = () => {
    return `TCK-${randomBytes(4).toString("hex").toUpperCase()}`;
};

export const createTicketService = async ({ eventId, quantity = 1, user }) => {

    // Validar que el evento exista
    const event = await getEventByIdRepository(eventId);

    if (!event) {
        throw new Error("Evento no encontrado");
    }

    // Validar que el evento esté publicado
    if (event.status !== "published") {
        throw new Error("El evento no está disponible para inscripciones");
    }

    // Validar que el evento no haya finalizado
    if (new Date(event.date) <= new Date()) {
        throw new Error("El evento ya ha finalizado");
    }

    // Validar quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("La cantidad debe ser un número entero mayor a 0");
    }

    // Buscar tickets activos del evento
    const activeTickets = await findActiveTicketsByEventRepository(eventId);

    // Verificar que el usuario no tenga ya una inscripción activa
    const userHasActiveTicket = activeTickets.some(
        ticket => ticket.user.toString() === user._id.toString()
    );

    if (userHasActiveTicket) {
        throw new Error("El usuario ya tiene una inscripción activa para este evento");
    }

    // Calcular cantidad de cupos ocupados
    const occupiedSeats = activeTickets.reduce(
        (total, ticket) => total + ticket.quantity,
        0
    );

    // Calcular cupos disponibles
    const availableSeats = event.capacity - occupiedSeats;

    // Verificar cupos
    if (availableSeats < quantity) {
        throw new Error(
            `No hay cupos suficientes. Cupos disponibles: ${availableSeats}`
        );
    }

    // Generar código de reserva
    const reservationCode = generateReservationCode();

    // Crear ticket
    const ticket = await createTicketRepository({
        user: user.id,
        event: event.id,
        quantity,
        reservationCode,
        status: "confirmed"
    });

    // Enviar email de confirmación
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

export const getMyTicketsService = async (userId) => {
    return await findTicketsByUserRepository(userId);
};

export const getTicketsByEventService = async (eventId) => {
    const event = await getEventByIdRepository(eventId);

    if (!event) {
        throw new Error("Evento no encontrado");
    }

    return await findTicketsByEventRepository(eventId);
};