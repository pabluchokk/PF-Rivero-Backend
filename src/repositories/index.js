const ProductRepository = require("./Products.repositories")
const Products = require("../DAO/factory.js")

const productService = new ProductRepository(Products)

module.exports = productService