import { verifyToken } from '../utils/jwt.utils.js';
import { getEventByIdService } from "../services/event.services.js";

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
*/

export const auth = async (req, res, next) => {

    try {
        const token = req.cookies.currentUser;

        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'No autenticado'
            });
        }

        const payload = verifyToken(token);

        req.user = payload;

        next();
    }

    catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'No autenticado'
        });
    }
};
// VALIDAMOS LOS ROLES DE LOS USUARIOS

export const authorizeRole = (...allowdRoles) => {

    return (req, res, next) => {

        try {

            console.log(allowdRoles)
            if (!allowdRoles.includes(req.user.role)) {
                return res.status(403).json({ 'message': 'roles insuficientes' })
            }
            next()
        }

        catch {
            return res.status(500).json({ 'error': error.toString() })
        }
    }
}

export const authorizerEventOwnerOrAdmin = async (req, res, next) => {
    try {

        const { eventId } = req.params
        const event = await getEventByIdService(eventId)

        if (!event) {
            return res.status(404).json({ "message": "404" })
        }

        const isAdmin = req.user.role === 'admin';
        const isOwner = event.organizer.toString() === req.user.id.toString();

        if (!isAdmin && !isOwner) {
            return res.status(404).json({ "message": "404" })
        }
        req.event = event
        next()
    }
    catch (error) {
        return res.status(500).json({ 'error': error.toString() })
    }
}