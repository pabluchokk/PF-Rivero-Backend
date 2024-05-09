import cartModel from "../../models/cartsModel.js";
import { deleteProduct } from './product.mongo.js'

class CartMongoDAO {
    constructor() { }
    async createCart(cartData) {
        try {
            const result = await cartModel.create(cartData);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addToCart(idCart, idProduct) {
        try {
            const exists = await cartModel.find({ products: { $elemMatch: { products: idProduct } } });

            if (exists.length !== 0) {
                const result = await cartModel.updateOne(
                    { _id: idCart, "products.products": idProduct },
                    { $inc: { "products.$.qty": 1 } }
                );

                return { status: "success", payload: result };
            } else {
                const result = await cartModel.updateOne({ _id: idCart }, {
                    $push: {
                        products: {
                            $each: [
                                { products: idProduct, qty: 1 }
                            ]
                        }
                    }
                });

                return result
            }
        } catch (error) {
            throw error;
        }
    }

    async updateCart(idCart, array) {
        try {
            const result = await cartModel.updateOne({ _id: idCart }, { $push: { products: { $each: array } } });
            return result
        } catch (error) {
            throw error;
        }
    }
    async updateProduct(idCart, idProduct, quantity) {
        try {
            const result = await cartModel.updateOne(
                { _id: idCart, "products.products": idProduct },
                { $set: { "products.$.qty": quantity } }
            );
            return result
        } catch (error) {
            throw error;
        }
    }
    async deleteProduct(idCart, idProduct) {
        try {
            const result = await cartModel.updateOne(
                { _id: idCart },
                { $pull: { products: { products: idProduct } } }
            );

            return result
        } catch (error) {
            throw error;
        }
    }

    async deleteCart(idCart) {
        try {
            const cart = await cartModel.findOne({ _id: idCart })
            cart.products = []
            const result = await cartModel.updateOne({ _id: idCart }, cart)
            return result
        } catch (error) {
            throw error
        }
    }

    async getCartById(idCart) {
        try {
            const result = await collection.findOne({ _id: idCart });
            return result;
        } catch (error) {
            throw error
        }
    }

}

export default new CartMongoDAO()