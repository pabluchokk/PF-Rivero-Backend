import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            qty:Number,
            products:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            }
        }], default: [],
    }
})

cartSchema.plugin(mongoosePaginate)
const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel