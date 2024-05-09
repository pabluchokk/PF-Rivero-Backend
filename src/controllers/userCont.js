import { Router } from "express";
import passport from "passport";
import userModel from "../models/userModel.js";
import { createHash } from "../utils/cryptPass.js";

const router = Router()

router.post("/", passport.authenticate("register", { failureRedirect: "/failRegister"}), async (req, res) => {
    try {
        res.status(201).json({ messsage: "Usuario Registrado" })
    }
    catch (error) {
        if (error.code === 11000) return res.status(400).json({ error: "El Usuario ya existe" })
        res.status(500).json({ error: "Error interno del servidor" })
    }
})

router.get("/failRegister", async (req, res) => {
    console.log("Error")
})

export default userRouter