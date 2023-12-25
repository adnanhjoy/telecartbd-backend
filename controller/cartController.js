const Cart = require("../model/cartSchema");
const Product = require("../model/productSchema");

const addCartController = async (req, res) => {
    try {
        const products = await Product.find({ _id: req.body.cartId });

        const { title, price, offerPrice, altTag, images } = products[0]
        const cart = new Cart({
            title,
            price,
            offerPrice,
            altTag,
            images
        });

        const result = await cart.save();
        if (result) {
            res.status(200).json({
                message: "Success",
                data: result
            })
        } else {
            res.status(404).json({ message: "cart not added" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    addCartController
}