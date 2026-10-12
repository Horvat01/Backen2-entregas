import { EventDTO } from "../dto/event.dto.js";
import {
    createEventDAO,
    findEventByIdDAO,
    findEventsDAO,
    countEventsDAO,
    updateEventDAO,
    updateEventStatusDAO
} from "../dao/event.dao.js";

export const createEventRepository = async (eventData) => {
    const newEvent = await createEventDAO(eventData);

    return new EventDTO(newEvent);
};

export const getEventByIdRepository = async (eventId) => {
    const event = await findEventByIdDAO(eventId);

    if (!event) {
        return null;
    }

    return new EventDTO(event);
};

export const findEventsRepository = async (filters, sort, skip, limit) => {
    const events = await findEventsDAO(filters, sort, skip, limit);

    return events.map(event => new EventDTO(event));
};

export const countEventsRepository = async (filters) => {
    return await countEventsDAO(filters);
};

export const updateEventRepository = async (eventId, updateData) => {
    const event = await updateEventDAO(eventId, updateData);

    if (!event) {
        return null;
    }

    return new EventDTO(event);
};

export const updateEventStatusRepository = async (eventId, status) => {
    const event = await updateEventStatusDAO(eventId, status);

    if (!event) {
        return null;
    }

    return new EventDTO(event);
};