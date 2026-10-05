import { Router } from "express";
import passport from "passport";
import { createTicket, getMyTickets, getTicketsByEvent } from "../controllers/ticket.controller.js";
import { authorizerEventOwnerOrAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/events/:eventId/tickets", passport.authenticate("current", { session: false }), createTicket);

router.get("/tickets/my-tickets", passport.authenticate("current", { session: false }), getMyTickets);

router.get("/events/:eventId/tickets", passport.authenticate("current", { session: false }), authorizerEventOwnerOrAdmin, getTicketsByEvent,);


export default router;