import UserModel from '../models/user.model.js';
import { createHash } from '../utils/password.utils.js';
import { generateToken } from '../utils/jwt.utils.js';
import { env } from '../config/env.js';


/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
*/

export const current = async (req, res) => {
    try {
        return res.status(200).json({
            status: 'success',
            payload: {
                id: req.user._id,
                email: req.user.email,
                role: req.user.role
            }
        });

    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'No autenticado'
        });
    }
};


export const register = async (req, res) => {

    try {

        const { first_name, last_name, email, password } = req.user;

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            password: await createHash(password, 10),
            role: 'user'
        });

        return res.status(201).json({
            status: 'success',
            message: 'Usuario registrado correctamente',
            data: {
                id: newUser._id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email
            }
        });

    } catch (error) {

        return res.status(400).json({
            status: 'error',
            message: error.toString()
        });

    }

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
            secure: env.NODE_ENV === 'production'
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
    res.clearCookie('currentUser');

    return res.status(200).json({
        status: 'success',
        message: 'Sesión cerrada'
    });
};