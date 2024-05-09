import passport from "passport";
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import uuid from 'uuid'
import userModel from "../models/userModel.js";
import { createHash, isValidPass } from "../utils/cryptPass.js";
import { adminUser, adminPassword, CLIENT_ID, CLIENT_SECRET } from "./config.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
        const { first_name, last_name, age, email } = req.body
        try {
            const user = await User.findOne({ email: username })
            if (user) {
                console.log("existe")
                return done(null, false)
            }
            const newUserInfo = { first_name, last_name, age, email, password: createHash(password) }
            const newUser = await userModel.create(newUserInfo)
            return done(null, newUser)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            if (username === adminUser && password === adminPassword) {
                let user = {
                    _id: uuid.v4(),
                    first_name: "Admin",
                    last_name: "Admin",
                    email: adminUser,
                    role: "admin",
                    isAdmin: true
                }
                return done(null, user)
            }
            const user = await userModel.findOne({ email: username })
            if (!user) {
                return done(null, false)
            }

            if (!isValidPassword(user, password))
                return done(null, false)

            return done(null, user)

        } catch (error) {
            return done(error)
        }
    }))

    passport.use("github", new GithubStrategy({
        clientID: CLIENT_ID, clientSecret: CLIENT_SECRET, callbackUrl: "http://localhost:8080/auth/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            const user = await User.findOne({ email: profile._json.email })
            if (!user) {
                const newUserInfo = { first_name: profile._json.name, last_name: "", age: 18, email: profile._json.email, password: "", _id: "" }
                const newUser = await userModel.create(newUserInfo)
                return done(null, newUser)
            } else {
                return done(null, user)
            }

        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user);
    })
}

export default initializePassport