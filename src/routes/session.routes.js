import { Router } from "express";
import { EventModel } from "../models/event.model.js";
import { register } from "../controllers/session.controller.js";

const router = Router();



router.post('/register', register)

export default router;