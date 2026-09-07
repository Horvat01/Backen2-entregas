import JsonWebToken from 'jsonwebtoken';

import { env } from '../config/env.js';

export const generateToken = (user) => {

    return JsonWebToken.sign(
        user,
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN }
    );

};

export const verifyToken = (token) => {

    return JsonWebToken.verify(
        token,
        env.JWT_SECRET
    );
}