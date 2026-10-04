import { createEventRepository, getEventByIdRepository, findEventsRepository, countEventsRepository, updateEventRepository, updateEventStatusRepository } from "../repositories/event.repository.js";


export const createEventService = async (eventData) => {
    try {
        const { title, description, category, date, location, capacity, price, organizer } = eventData;

        // Validar fecha
        const eventDate = new Date(date);

        if (isNaN(eventDate.getTime())) {
            throw new Error("La fecha del evento no es valida");
        }

        if (eventDate < new Date()) {
            throw new Error("No se puede crear un evento con fecha pasada");
        }

        // Validar capacidad
        if (capacity <= 0) {
            throw new Error("La capacidad debe ser mayor a 0");
        }

        // Validar precio
        if (price < 0) {
            throw new Error("El precio no puede ser negativo");
        }

        const newEvent = await createEventRepository({
            title,
            description,
            category,
            date: eventDate,
            location,
            capacity,
            price,
            organizer
        });

        return newEvent;

    } catch (error) {
        throw error;
    }
};


export const getEventByIdService = async (eventId) => {
    try {
        const event = await getEventByIdRepository(eventId);

        return event;

    } catch (error) {
        throw error;
    }
};


export const findEventsService = async ({
    filters = {},
    page = 1,
    limit = 10,
    sort = { date: 1 }
}) => {
    try {
        const skip = (page - 1) * limit;

        const [events, total] = await Promise.all([
            findEventsRepository(
                filters,
                sort,
                skip,
                limit
            ),
            countEventsRepository(filters)
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: events, page, limit, total, totalPages
        };

    } catch (error) {
        throw error;
    }
};


export const updateEventService = async (eventId, updateData) => {
    try {
        const event = await getEventByIdRepository(eventId);

        if (!event) {
            return null;
        }

        // Un evento cancelado no puede modificarse
        if (event.status === "cancelled") {
            throw new Error(
                "No se puede modificar un evento cancelado"
            );
        }

        // No permitir fecha pasada
        if (updateData.date !== undefined) {
            const eventDate = new Date(updateData.date);

            if (isNaN(eventDate.getTime())) {
                throw new Error("La fecha del evento no es valida");
            }

            if (eventDate < new Date()) {
                throw new Error(
                    "No se puede modificar un evento con fecha pasada"
                );
            }

            updateData.date = eventDate;
        }

        // Validar capacidad
        if (
            updateData.capacity !== undefined &&
            updateData.capacity <= 0
        ) {
            throw new Error(
                "La capacidad debe ser mayor a 0"
            );
        }

        // Validar precio
        if (
            updateData.price !== undefined &&
            updateData.price < 0
        ) {
            throw new Error(
                "El precio no puede ser negativo"
            );
        }

        // El organizer no se puede modificar
        delete updateData.organizer;

        // El status se modifica mediante PATCH /status
        delete updateData.status;

        return await updateEventRepository(
            eventId,
            updateData
        );

    } catch (error) {
        throw error;
    }
};


export const updateEventStatusService = async (
    eventId,
    status
) => {
    try {
        const event = await getEventByIdRepository(eventId);

        if (!event) {
            return null;
        }

        // No se puede modificar un evento cancelado
        if (event.status === "cancelled") {
            throw new Error(
                "No se puede modificar el estado de un evento cancelado"
            );
        }

        // Validar estados permitidos
        const validStatuses = [
            "draft",
            "published",
            "cancelled",
            "finished"
        ];

        if (!validStatuses.includes(status)) {
            throw new Error(
                "Estado de evento no valido"
            );
        }

        // No se puede publicar un evento finalizado
        if (
            status === "published" &&
            event.status === "finished"
        ) {
            throw new Error(
                "No se puede publicar un evento finalizado"
            );
        }

        // No se puede publicar un evento cancelado
        if (
            status === "published" &&
            event.status === "cancelled"
        ) {
            throw new Error(
                "No se puede publicar un evento cancelado"
            );
        }

        return await updateEventStatusRepository(
            eventId,
            status
        );

    } catch (error) {
        throw error;
    }
};

