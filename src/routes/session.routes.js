import { Router } from "express";
import passport from "passport";
import { register, login, current, logout } from "../controllers/session.controller.js";

const loginUser = (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error interno al identificar el usuario',
                info: err.toString()
            })
        }
        if (!user) {
            const message = info?.message || 'datos inválidos';
            return res.status(401).json({ status: 'error', message });


        }
        req.user = user
        next()
    })(req, res, next)
};



const router = Router();
router.post('/register', passport.authenticate('register', { session: false }), register);
router.post('/login', loginUser, login);
router.post('/logout', logout);
router.get('/current', passport.authenticate('current', { session: false }), current);
export default router; 