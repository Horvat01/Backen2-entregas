import { Router } from "express";
import passport from "passport";
import { register, login, current, logout } from "../controllers/session.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();
router.post('/register', register);
router.post('/login', passport.authenticate('login', { session: false }), login);
router.get('/current', auth, current);
router.post('/logout', logout);

export default router;