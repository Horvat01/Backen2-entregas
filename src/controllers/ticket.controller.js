import { createTicketService } from "../services/ticket.service.js";

export const createTicket = async (req, res) => {

    try {
        const ticket = await createTicketService({
            eventId: req.params.eventId,
            quantity: req.body?.quantity,
            user: req.user
        })

        res.status(201).json({
            status: 'success',
            message: 'Inscripcion realizada correctamente',
            payload: ticket
        })
    }
    catch (error) {
        res.status(500).json({data:error.toString()})
        // sendServiceError(res, error, 'Error al crear la inscripcion')
    }
};