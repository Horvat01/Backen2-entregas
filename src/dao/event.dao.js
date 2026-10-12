import { EventModel } from "../models/event.model.js";

export const createEventDAO = (data) => {
    return EventModel.create(data);
};

export const findEventByIdDAO = (id) => {
    return EventModel.findById(id).populate(
        "organizer",
        "first_name last_name email role"
    );
};

export const findEventsDAO = (filters, sort, skip, limit) => {
    return EventModel.find(filters)
        .populate("organizer", "first_name last_name email role")
        .sort(sort)
        .skip(skip)
        .limit(limit);
};

export const countEventsDAO = (filters) => {
    return EventModel.countDocuments(filters);
};

export const updateEventDAO = (id, data) => {
    return EventModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    }).populate("organizer", "first_name last_name email role");
};

export const updateEventStatusDAO = (id, status) => {
    return EventModel.findByIdAndUpdate(
        id,
        { status },
        {
            new: true,
            runValidators: true
        }
    ).populate("organizer", "first_name last_name email role");
};

