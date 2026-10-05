import { Router } from "express";
import { getEvents, getEventsById, createEvent, updateEvent, updateEventStatus } from "../controllers/event.controllers.js";
import passport from "passport";
import { authorizeRole, authorizerEventOwnerOrAdmin } from "../middlewares/auth.middleware.js";
import { createTicket } from "../controllers/ticket.controller.js";

const router = Router();



router.post("/", passport.authenticate("current", { session: false }), createTicket)


export default router;