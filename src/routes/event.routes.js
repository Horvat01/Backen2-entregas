import { Router } from "express";
import { getEvents, getEventsById, createEvent, updateEvent, updateEventStatus } from "../controllers/event.controllers.js";
import passport from "passport";
import { authorizeRole, authorizerEventOwnerOrAdmin } from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/", getEvents);
router.get("/:eventId", getEventsById);
router.post("/", passport.authenticate("current", { session: false }), authorizeRole("admin", "organizer"), createEvent);
router.put("/:eventId", passport.authenticate("current", { session: false }), authorizeRole("admin", "organizer"), authorizerEventOwnerOrAdmin, updateEvent);
router.patch("/:eventId/status", passport.authenticate("current", { session: false }), authorizeRole("admin", "organizer"), authorizerEventOwnerOrAdmin, updateEventStatus);


export default router;

