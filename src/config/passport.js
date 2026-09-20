import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";

import UserModel from "../models/user.model.js";
import { getUserByEmail } from "../services/user.service.js";
import { createHash, isValidPassword } from "../utils/password.utils.js";
import { env } from "./env.js";




// REGISTER

passport.use('register', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    },

    async (req, email, password, done) => {
        try {

            const { first_name, last_name } = req.body;

            if (!first_name || !last_name || !email || !password) {
                return done(null, false, {
                    message: 'Todos los campos son obligatorios'
                });
            }

            const normalizedEmail = email.toLowerCase().trim();


            const userExists = await getUserByEmail(normalizedEmail);

            if (userExists) {
                return done(null, false, {
                    message: 'El email ya está registrado'
                });
            }

            const hashedPassword = await createHash(password, 10);



            const newUser = await UserModel.create({
                first_name,
                last_name,
                email: normalizedEmail,
                password: hashedPassword,
                role: 'user'
            });

            return done(null, newUser);

        } catch (error) {
            return done(error);
        }
    }
));


// LOGIN

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: false
        },

        async (email, password, done) => {
            try {
                if (!email || !password) {
                    return done(null, false, {
                        message: "Email y contraseña son obligatorios"
                    });
                }

                const normalizedEmail = email.toLowerCase().trim();

                const userExists = await getUserByEmail(normalizedEmail);

                if (!userExists) {
                    return done(null, false, {
                        message: "Credenciales invalidas"
                    });
                }

                const validPassword = await isValidPassword(
                    password,
                    userExists.password
                );

                if (!validPassword) {
                    return done(null, false, {
                        message: "Credenciales invalidas"
                    });
                }

                return done(null, userExists);

            } catch (error) {
                return done(error);
            }
        }
    )
);


// CURRENT - JWT

const cookieExtractor = function (req) {
    let token = null;

    if (req && req.cookies && req.cookies.currentUser) {
        token = req.cookies.currentUser;
    }

    return token;
};


passport.use(
    "current",
    new JwtStrategy(
        {
            jwtFromRequest: cookieExtractor,
            secretOrKey: env.JWT_SECRET
        },

        async (jwtPayload, done) => {
            try {
                const user = await getUserByEmail(jwtPayload.email);

                if (!user) {
                    return done(null, false);
                }

                return done(null, user);

            } catch (error) {
                return done(error, false);
            }
        }
    )
);