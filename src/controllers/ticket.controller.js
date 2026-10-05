import {
    createTicketService,
    getMyTicketsService,
    getTicketsByEventService,
    cancelTicketService
} from "../services/ticket.service.js";

export const createTicket = async (req, res) => {

    try {
        const ticket = await createTicketService({
            eventId: req.params.eventId,
            quantity: req.body?.quantity,
            user: req.user
        });

        res.status(201).json({
            status: "success",
            message: "Inscripcion realizada correctamente",
            payload: ticket
        });

    } catch (error) {

        if (error.message === "Evento no encontrado") {
            return res.status(404).json({
                status: "error",
                message: error.message
            });
        }

        if (error.message === "El evento no está disponible para inscripciones") {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }

        if (error.message === "El evento ya ha finalizado") {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }

        if (error.message === "La cantidad debe ser un número entero mayor a 0") {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }

        if (error.message === "El usuario ya tiene una inscripción activa para este evento") {
            return res.status(409).json({
                status: "error",
                message: error.message
            });
        }

        if (error.message.startsWith("No hay cupos suficientes")) {
            return res.status(409).json({
                status: "error",
                message: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Error interno al crear la inscripción"
        });
    }
};

export const getMyTickets = async (req, res) => {
    try {
        const tickets = await getMyTicketsService(req.user.id);

        return res.status(200).json({
            status: "success",
            payload: tickets
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Error al obtener las inscripciones"
        });
    }
};

export const getTicketsByEvent = async (req, res) => {
    try {
        const tickets = await getTicketsByEventService(req.params.eventId);

        return res.status(200).json({
            status: "success",
            payload: tickets
        });

    } catch (error) {
        console.error(error);

        return res.status(404).json({
            status: "error",
            message: error.message
        });
    }
};

export const cancelTicket = async (req, res) => {
    try {
        const ticket = await cancelTicketService(
            req.params.ticketId,
            req.user
        );

        return res.status(200).json({
            status: "success",
            message: "Ticket cancelado correctamente",
            payload: ticket
        });

    } catch (error) {
        console.error(error);

        return res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message
        });
    }
};