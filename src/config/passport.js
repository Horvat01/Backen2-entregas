import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

passport.use('logi', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }),

    async (email, passport, done) => {

     return done ( null ,{"nombre":"pablo"})

    }

)