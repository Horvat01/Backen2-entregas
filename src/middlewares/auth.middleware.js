import { verifyToken } from "../utils/jwt.utils.js";
import { getEventByIdService } from "../services/event.services.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.currentUser;

        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "No autenticado"
            });
        }

        const payload = verifyToken(token);

        req.user = payload;

        next();

    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "No autenticado"
        });
    }
};


/**
 * Middleware para validar roles
 */
export const authorizeRole = (...allowedRoles) => {

    return (req, res, next) => {

        try {

            if (!req.user) {
                return res.status(401).json({
                    message: "No autenticado"
                });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    message: "roles insuficientes"
                });
            }

            next();

        } catch (error) {

            return res.status(500).json({
                error: error.toString()
            });
        }
    };
};


/**
 * Verifica que el usuario sea:
 * - el dueño del evento
 * - o un administrador
 */
export const authorizerEventOwnerOrAdmin = async (req, res, next) => {

    try {

        const { eventId } = req.params;

        const event = await getEventByIdService(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Evento no encontrado"
            });
        }

        const isAdmin = req.user.role === "admin";

        const organizerId = event.organizer?.id?.toString();

        const isOwner =
            organizerId === req.user.id.toString();

        if (!isAdmin && !isOwner) {
            return res.status(403).json({
                message: "No tienes permisos para modificar este evento"
            });
        }

        req.event = event;

        next();

    } catch (error) {

        return res.status(500).json({
            error: error.toString()
        });
    }
};

