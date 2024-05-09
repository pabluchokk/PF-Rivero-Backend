import { persistence, user, password, host } from "../config/config";
import mongoose from "mongoose";

switch (persistence) {
    case "MONGO":
        mongoose.connect(`mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`, error => {
            if (error) {
                console.log("No se pudo conectar")
                process.exit()
            }
        })
        module.exports = require("../DAO/mongo/product.mongo.js")
        break
}