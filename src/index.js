import MongoStore from "connect-mongo";
import express from 'express'
import handlebars from "handlebars";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import swaggerJSDoc from "swagger-jsdoc";
import __dirname from './utils/index.js'
import swaggerUiExpress from 'swagger-ui-express'
import initializePassport from './config/passport.config.js'
import routes from './routes/index.routes.js'
import { user, password, host } from "./config/config";
import addLogger from './utils/logger.js'
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

app.use(express.json())
mongoose.connect(`mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`, error => {
    if (error) {
        console.log("No se pudo conectar")
        process.exit()
    }
})

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion de API"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve,swaggerUiExpress.setup(specs))
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${user}:${password}@backend.0hlxsge.mongodb.net/coder-sessions?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 15,

    }),
    secret: password, resave: false, saveUninitialized: false
}))
initializePassport()
app.use(passport.initialize());
app.use(passport.session());
app.use(addlogger)
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", handlebars.engine())
app.use(express.static(__dirname + "/public"))
app.set("views", __dirname + "/views")

routes(app)

export default app