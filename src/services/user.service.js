
import { isValidPassword } from "../utils/password.utils.js";
import { findUserByEmailRepository } from "../repositories/user.repository.js";

export const getUserByEmail = async (email) => {
    return findUserByEmailRepository(email.toLowerCase().trim());
};

export const validateLogin = async (email, password) => {
    const user = await getUserByEmail(email);

    if (!user) {
        return null;
    }

    const validPassword = await isValidPassword(
        password,
        user.password
    );

    if (!validPassword) {
        return null;
    }

    return {
        id: user._id.toString(),
        email: user.email,
        role: user.role
    };
};
