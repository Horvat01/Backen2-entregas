import UserModel from '../models/user.model.js';

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

        const userExists = await UserModel.findOne({ email: normalizedEmail });

        if (userExists) {
            return res.status(409).json({
                status: 'error',
                message: 'Ya existe un usuario registrado con el mismo mail'
            });
        }

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email: normalizedEmail,
            password,
            role: 'user'
        });

        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            data: userResponse
        });

    } catch (error) {
        res.status(400).json({
            status: 'Error',
            message: error.toString()
        });
    }
};