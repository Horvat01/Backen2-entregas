import { createTicketDAO, findActiveTicketsByEventDAO, findTicketsByUserDAO, findTicketByIdDAO, findTicketsByEventDAO, countActiveTicketsByEventDAO, cancelTicketDAO } from "../dao/ticket.dao.js";

import { TicketDTO } from "../dto/ticket.dto.js";

export const createTicketRepository = async (data) => {
    const ticket = await createTicketDAO(data);
    return new TicketDTO(ticket);
};

export const findActiveTicketsByEventRepository = (eventId) => {
    return findActiveTicketsByEventDAO(eventId);
};

export const findTicketsByUserRepository = async (userId) => {
    const tickets = await findTicketsByUserDAO(userId);
    return tickets.map(ticket => new TicketDTO(ticket));
};

export const getTicketByIdRepository = async (ticketId) => {
    const ticket = await findTicketByIdDAO(ticketId);
    return ticket ? new TicketDTO(ticket) : null;
};

export const findTicketsByEventRepository = async (eventId) => {
    const tickets = await findTicketsByEventDAO(eventId);
    return tickets.map(ticket => new TicketDTO(ticket));
};

export const countActiveTicketsRepository = (eventId) => {
    return countActiveTicketsByEventDAO(eventId);
};

export const cancelTicketRepository = async (ticketId) => {
    const ticket = await cancelTicketDAO(ticketId);
    return ticket ? new TicketDTO(ticket) : null;
};
