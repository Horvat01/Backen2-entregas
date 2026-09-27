import { EventModel } from "../models/event.model.js";

export const createEventService = async (title, description) => {

    try {

        const newEvent = await EventModel.create({
            title: title,
            description: description

        });

        return newEvent
    }

    catch (error) {
        throw error
    }
};