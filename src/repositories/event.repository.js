import { EventDetailDTO } from "../dao/event-detail.dto.js";
import { EventModel } from "../models/event.model.js";

export const createEventRepository = async (title, description, organizer) => {
    try {
        const newEvent = await EventModel.create({
            title: title,
            description: description,
            organizer: organizer
        });

        return new EventDetailDTO(newEvent);

    } catch (error) {
        throw error;
    }
};

export const getEventByIdRepository = async (eventId) => {
    try {
        const event = await EventModel.findById(eventId)


        return new EventDetailDTO(event);
    }
    catch (error) {
        throw error;
    }
};
export const findEventsRepository = async (title, sort, skip, limit) => {
    try {
        const lEvents = await EventModel.find()
            .populate('organaizer')
            // .sort(sort)
            // .skip(skip)
            // .limit(limit)

        const eventsDTO = lEvents.map(event => new EventDetailDTO(event))

        return eventsDTO
    }
    catch (error) {
        throw error;
    }
};