import mongoose from "mongoose";

const ticketCollection = "ticket"

const ticketSchema = mongoose.Schema({
    code: String,
    purchase_datatime: Date,
    amount: Number,
    purchaser: String
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export default ticketModel