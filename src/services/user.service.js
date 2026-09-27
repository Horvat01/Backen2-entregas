import UserModel from "../models/user.model.js";
import { isValidPassword } from "../utils/password.utils.js";

export const getUserByEmail = async email => {
    return await UserModel.findOne({ email })
}

// @desctiption
// @param {*} email
// @returns
export const validateLogin = async (email, password) => {
    const user = await getUserByEmail(email)
    if (!user) {
        return null;
    }

    const validatePassword = await isValidPassword(password, user.password)
    if (!validatePassword) {
        return null;
    }
    return ({
        id: user._id,
        email: user.email,
        role: user.role
    })
};
