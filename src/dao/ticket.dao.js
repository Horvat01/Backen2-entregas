import { TicketModel } from "../models/ticket.model.js";
import { ACTIVE_TICKET_STATUSES } from "../models/ticket.model.js";

export const createTicketDAO = (data) => {
    return TicketModel.create(data);
};

export const findActiveTicketsByEventDAO = (eventId) => {
    return TicketModel.find({
        event: eventId,
        status: { $in: ACTIVE_TICKET_STATUSES }
    });
};

export const findTicketsByUserDAO = (userId) => {
    return TicketModel.find({ user: userId })
        .populate("event", "title date location");
};

export const findTicketByIdDAO = (ticketId) => {
    return TicketModel.findById(ticketId)
        .populate("event", "title date location");
};

export const findTicketsByEventDAO = (eventId) => {
    return TicketModel.find({ event: eventId })
        .populate("user", "first_name last_name email");
};

export const countActiveTicketsByEventDAO = (eventId) => {
    return TicketModel.countDocuments({
        event: eventId,
        status: { $in: ACTIVE_TICKET_STATUSES }
    });
};

export const cancelTicketDAO = (ticketId) => {
    return TicketModel.findByIdAndUpdate(
        ticketId,
        {
            status: "cancelled",
            cancelledAt: new Date()
        },
        { new: true }
    ).populate("event", "title date location");
};
