import { createEventService, getEventByIdService, findEventsService, updateEventService, updateEventStatusService } from "../services/event.services.js";


export const getEvents = async (req, res) => {
    try {
        const { status, category, location, dateFrom, dateTo, page = 1, limit = 10, sort = "date"} = req.query;

        const filters = {};
 
        if (status) {
            filters.status = status;
        }

        if (category) {
            filters.category = category;
        }

        if (location) {
            filters.location = location;
        }

        if (dateFrom || dateTo) {
            filters.date = {};

            if (dateFrom) {
                filters.date.$gte = new Date(dateFrom);
            }

            if (dateTo) {
                filters.date.$lte = new Date(dateTo);
            }
        }

        const sortDirection = sort.startsWith("-") ? -1 : 1;
        const sortField = sort.startsWith("-")
            ? sort.substring(1)
            : sort;

        const result = await findEventsService({
            filters,
            page: Number(page),
            limit: Number(limit),
            sort: {
                [sortField]: sortDirection
            }
        });

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener eventos"
        });
    }
};


export const getEventsById = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        const event = await getEventByIdService(eventId);

        if (!event) {
            return res.status(404).json({
                error: "Evento no encontrado"
            });
        }

        res.status(200).json({
            message: "ok",
            data: event
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener evento"
        });
    }
};


export const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            date,
            location,
            capacity,
            price
        } = req.body;

        const newEvent = await createEventService({
            title,
            description,
            category,
            date,
            location,
            capacity,
            price,
            organizer: req.user.id
        });

        res.status(201).json({
            message: "Evento creado",
            data: newEvent
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            error: error.message
        });
    }
};


export const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        const updatedEvent = await updateEventService(
            eventId,
            req.body
        );

        if (!updatedEvent) {
            return res.status(404).json({
                error: "Evento no encontrado"
            });
        }

        res.status(200).json({
            message: "Evento actualizado",
            data: updatedEvent
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            error: error.message
        });
    }
};


export const updateEventStatus = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const { status } = req.body;

        const updatedEvent = await updateEventStatusService(
            eventId,
            status
        );

        if (!updatedEvent) {
            return res.status(404).json({
                error: "Evento no encontrado"
            });
        }

        res.status(200).json({
            message: "Estado del evento actualizado",
            data: updatedEvent
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            error: error.message
        });
    }
};

