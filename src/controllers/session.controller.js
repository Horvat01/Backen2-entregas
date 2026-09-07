import UserModel from '../models/user.model.js';
import { createHash, isValidPassword } from '../utils/password.utils.js';
import { getUserByEmail } from '../services/user.service.js';
import JsonWebToken from 'jsonwebtoken';


/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
*/

export const current = async (req, res) => {
    const token = req.cookies.currentUser

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'No autenticado'
        })
    }
    return res.status(200).json({ user: token });
}

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Todos los campos son obligatorios'
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const userExists = await getUserByEmail(normalizedEmail);

        if (userExists) {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe un usuario registrado con el mismo mail'
            });
        }

        const newUser = await UserModel.create({
            first_name: first_name,
            last_name: last_name,
            email: normalizedEmail,
            password: await createHash(password, 10),
            role: 'user'
        });

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            data: {
                id: newUser._id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
            }
        });

    } catch (error) {
        res.status(400).json({
            status: 'Error',
            message: error.toString()
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Email y contraseña son obligatorios'
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const userExists = await getUserByEmail(normalizedEmail);

        if (!userExists) {
            return res.status(401).json({
                status: 'error',
                message: 'Credenciales invalidas'
            });
        }

        const validPassword = await isValidPassword(
            password,
            userExists.password
        );

        // console.log("CONTRASEÑA VALIDA:", validPassword);

        if (!validPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Credenciales invalidas'
            });
        }

        const tokenUser = {
            id: userExists._id,
            email: userExists.email,
            role: userExists.role
        };

        const jwtToken = JsonWebToken.sign(tokenUser, '1234', { expiresIn: 60 });

        res.cookie('currentUser', jwtToken, {
            httpOnly: true,
            maxAge: 60 * 1000,
            sameSite: 'lax',
            secure: false,
            // signed: true
        })



        return res.status(200).json({
            status: 'success',
            message: 'Login correcto',
            jwt: jwtToken
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor'
        });
    }


};