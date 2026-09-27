import { Router } from "express";
import passport from "passport";
import UserModel from "../models/user.model.js";
import { authorizeRole } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
    '/',
    passport.authenticate('current', { session: false }),
    authorizeRole('admin'),
    async (req, res) => {
        try {
            const users = await UserModel.find({});

            res.status(200).json({
                status: 'success',
                payload: users
            });

        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Error al obtener usuarios'
            });
        }
    }
);

export default router;