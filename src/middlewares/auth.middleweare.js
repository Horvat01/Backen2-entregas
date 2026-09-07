import JsonWebToken from 'jsonwebtoken';

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
*/

export const autMiddleware = async (req, res, next) => {

    try {
        const token = req.cookies.currentUser

        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'No autenticado - MIDDLEWARE'
            })
        }

        const payload = JsonWebToken.verify(token, '1234')

        next ()
    }

    catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'No autenticado - MIDDLEWARE'
        });
    }
}