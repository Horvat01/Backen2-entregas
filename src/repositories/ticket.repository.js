import { TicketModel } from "../models/ticket.model.js";

export const createTicketRepository = (data) => {
    return TicketModel.create(data);
};

export const findActiveTicketsByEventRepository = (eventId) => {
    return TicketModel.find({
        event: eventId,
        status: {
            $in: ["confirmed", "pending"]
        }
    });
};

export const findTicketsByUserRepository = (userId) => {
    return TicketModel.find({
        user: userId
    }).populate("event", "title date location");
};

export const getTicketByIdRepository = (ticketId) => {
    return TicketModel.findById(ticketId)
        .populate("event", "title date location");
};

export const cancelTicketRepository = (ticketId) => {

    return TicketModel.findByIdAndUpdate(
        ticketId,
        {
            status: "cancelled",
            cancelledAt: new Date()
        },
        {
            new: true
        }
    );
};

export const findTicketsByEventRepository = (eventId) => {
    return TicketModel.find({
        event: eventId
    }).populate("user", "first_name last_name email");
};