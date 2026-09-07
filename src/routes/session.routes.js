import { Router } from "express";
import { register, login, current } from "../controllers/session.controller.js";
import { autMiddleware } from "../middlewares/auth.middleweare.js";

const router = Router();



router.post('/register', register)
router.post('/login', login)
router.get('/current', autMiddleware, current)

export default router;