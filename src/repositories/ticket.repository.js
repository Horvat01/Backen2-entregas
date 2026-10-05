import { TicketModel } from "../models/ticket.model.js";

export const createTicketRepository = (data) => TicketModel.create(data)