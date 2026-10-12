import { Router } from "express";
import passport from "passport";
import { authorizeRole } from "../middlewares/auth.middleware.js";
import { findAllUsersRepository } from "../repositories/user.repository.js";

const router = Router();

router.get(
    "/",
    passport.authenticate("current", { session: false }),
    authorizeRole("admin"),
    async (req, res) => {
        try {
            const users = await findAllUsersRepository();

            return res.status(200).json({
                status: "success",
                payload: users
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Error al obtener usuarios"
            });
        }
    }
);

export default router;
