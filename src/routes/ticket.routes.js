import { Router } from "express";
import passport from "passport";
import { createTicket, getMyTickets, getTicketsByEvent, cancelTicket } from "../controllers/ticket.controller.js";
import { authorizerEventOwnerOrAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/events/:eventId/tickets", passport.authenticate("current", { session: false }), createTicket);

router.get("/tickets/my-tickets", passport.authenticate("current", { session: false }), getMyTickets);

router.get("/events/:eventId/tickets", passport.authenticate("current", { session: false }), authorizerEventOwnerOrAdmin, getTicketsByEvent,);

router.patch("/tickets/:ticketId/cancel", passport.authenticate("current", { session: false }), cancelTicket);


export default router;