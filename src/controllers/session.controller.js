import UserModel from '../models/user.model.js';

export const register = async (req, res) => {
    try {
        // console.log("BODY RECIBIDO:", req.body);
        const { first_name, last_name, email, password, role } = req.body;

        if (!first_name, !last_name, !email, !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Todos los campos son obligatorios'
            })
        }

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            password,
            role
        });

        res.status(201).json({
            message: "Usuario registrado correctamente",
            data: newUser
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.toString()
        });
    }
};