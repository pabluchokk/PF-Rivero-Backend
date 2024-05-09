import { Router } from "express";
import transport from "../utils/gmailUtil.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const {to, subject, message} = req.body
        const mailOptions = {
            from: gmailUser,
            to,
            subject,
            html: `<html><div>${message}</div>
            </html>`,
            attachments: [],
        }
        const result = await transport.sendMail(mailOptions)

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message })
    }
})

export default mailRouter