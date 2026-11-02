import { generateToken } from '../utils/jwt.utils.js';
import { env } from '../config/env.js';
import { UserDTO } from '../dto/users.dto.js';

export const current = async (req, res) => {
    return res.status(200).json({
        status: 'success',
        payload: new UserDTO(req.user)
    });
};

export const register = async (req, res) => {
    return res.status(201).json({
        status: 'success',
        message: 'Usuario registrado correctamente',
        data: new UserDTO(req.user)
    });
};

export const login = async (req, res) => {
    try {
        const tokenUser = {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role
        };

        const jwtToken = generateToken(tokenUser);

        res.cookie('currentUser', jwtToken, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: 'lax',
            secure: env.NODE_ENV === 'production',
            path: '/'
        });

        return res.status(200).json({
            status: 'success',
            message: 'Login correcto'
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });
    }
};

export const logout = async (req, res) => {
    res.clearCookie('currentUser', {
        httpOnly: true,
        sameSite: 'lax',
        secure: env.NODE_ENV === 'production',
        path: '/'
    });

    return res.status(200).json({
        status: 'success',
        message: 'Sesión cerrada'
    });
};
