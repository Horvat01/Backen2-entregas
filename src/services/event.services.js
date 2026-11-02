import { createEventRepository, getEventByIdRepository, findEventsRepository, countEventsRepository, updateEventRepository, updateEventStatusRepository } from "../repositories/event.repository.js";

export const createEventService = async (eventData) => {
    const { title, description, category, date, location, capacity, price, organizer } = eventData;

    const eventDate = new Date(date);
    const eventCapacity = Number(capacity);
    const eventPrice = Number(price);

    if (isNaN(eventDate.getTime())) { throw new Error("La fecha del evento no es valida"); }

    if (eventDate < new Date()) { throw new Error("No se puede crear un evento con fecha pasada"); }

    if (!Number.isInteger(eventCapacity) || eventCapacity <= 0) { throw new Error("La capacidad debe ser un numero entero mayor a 0"); }

    if (!Number.isFinite(eventPrice) || eventPrice < 0) { throw new Error("El precio debe ser un numero mayor o igual a 0"); }

    return await createEventRepository({ title, description, category, date: eventDate, location, capacity: eventCapacity, price: eventPrice, organizer });
};

export const getEventByIdService = async (eventId) => {
    return await getEventByIdRepository(eventId);
};

export const findEventsService = async ({
    filters = {},
    page = 1,
    limit = 10,
    sort = { date: 1 }
}) => {
    if (!Number.isInteger(page) || page < 1) {
        throw new Error("La pagina debe ser un numero entero mayor a 0");
    }

    if (!Number.isInteger(limit) || limit < 1) {
        throw new Error("El limite debe ser un numero entero mayor a 0");
    }

    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
        findEventsRepository(filters, sort, skip, limit),
        countEventsRepository(filters)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        data: events,
        page,
        limit,
        total,
        totalPages
    };
};

export const updateEventService = async (eventId, updateData) => {
    const event = await getEventByIdRepository(eventId);

    if (!event) {
        return null;
    }

    if (event.status === "cancelled") {
        throw new Error("No se puede modificar un evento cancelado");
    }

    const data = { ...updateData };

    if (data.date !== undefined) {
        const eventDate = new Date(data.date);

        if (isNaN(eventDate.getTime())) {
            throw new Error("La fecha del evento no es valida");
        }

        if (eventDate < new Date()) {
            throw new Error("No se puede modificar un evento con fecha pasada");
        }

        data.date = eventDate;
    }

    if (data.capacity !== undefined) {
        const capacity = Number(data.capacity);

        if (!Number.isInteger(capacity) || capacity <= 0) {
            throw new Error("La capacidad debe ser un numero entero mayor a 0");
        }

        data.capacity = capacity;
    }

    if (data.price !== undefined) {
        const price = Number(data.price);

        if (!Number.isFinite(price) || price < 0) {
            throw new Error("El precio debe ser un numero mayor o igual a 0");
        }

        data.price = price;
    }

    delete data.organizer;
    delete data.status;

    return await updateEventRepository(eventId, data);
};

export const updateEventStatusService = async (eventId, status) => {
    const event = await getEventByIdRepository(eventId);

    if (!event) {
        return null;
    }

    if (event.status === "cancelled") {
        throw new Error("No se puede modificar el estado de un evento cancelado");
    }

    const validStatuses = [
        "draft",
        "published",
        "cancelled",
        "finished"
    ];

    if (!validStatuses.includes(status)) {
        throw new Error("Estado de evento no valido");
    }

    if (status === "published" && event.status === "finished") {
        throw new Error("No se puede publicar un evento finalizado");
    }

    return await updateEventStatusRepository(eventId, status);
};

