import { EventModel } from "../models/event.model.js";

export const createEventService = async (title, description, organizer) => {

    try {

        const newEvent = await EventModel.create({
            title: title,
            description: description,
            organizer: organizer

        });

        return newEvent
    }

    catch (error) {
        throw error
    }
};

export const geteventById = async (eventId) => {
    try {
        const event = await EventModel.findById(eventId)

        return event
    }
    catch (error) {
        throw error
    }
}