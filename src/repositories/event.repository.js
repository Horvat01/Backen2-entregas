import { EventDetailDTO } from "../dao/event-detail.dto.js";
import { EventModel } from "../models/event.model.js";

export const createEventRepository = async (eventData) => {
    try {
        const newEvent = await EventModel.create(eventData);

        return new EventDetailDTO(newEvent);
    } catch (error) {
        throw error;
    }
};

export const getEventByIdRepository = async (eventId) => {
    try {
        const event = await EventModel
            .findById(eventId)
            .populate("organizer");

        if (!event) {
            return null;
        }

        return new EventDetailDTO(event);
    } catch (error) {
        throw error;
    }
};

export const findEventsRepository = async (
    filters,
    sort,
    skip,
    limit
) => {
    try {
        const events = await EventModel
            .find(filters)
            .populate("organizer")
            .sort(sort)
            .skip(skip)
            .limit(limit);

        return events.map(event => new EventDetailDTO(event));
    } catch (error) {
        throw error;
    }
};

export const countEventsRepository = async (filters) => {
    try {
        return await EventModel.countDocuments(filters);
    } catch (error) {
        throw error;
    }
};

export const updateEventRepository = async (eventId, updateData) => {
    try {
        const event = await EventModel
            .findByIdAndUpdate(
                eventId,
                updateData,
                {
                    new: true,
                    runValidators: true
                }
            )
            .populate("organizer");

        if (!event) {
            return null;
        }

        return new EventDetailDTO(event);
    } catch (error) {
        throw error;
    }
};

export const updateEventStatusRepository = async (eventId, status) => {
    try {
        const event = await EventModel
            .findByIdAndUpdate(
                eventId,
                { status },
                {
                    new: true,
                    runValidators: true
                }
            )
            .populate("organizer");

        if (!event) {
            return null;
        }

        return new EventDetailDTO(event);
    } catch (error) {
        throw error;
    }
};
