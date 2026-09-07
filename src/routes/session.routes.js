import { Router } from "express";
import { register, login, current } from "../controllers/session.controller.js";

const router = Router();



router.post('/register', register)
router.post('/login', login)
router.get('/current', current)

export default router;