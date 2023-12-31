const Product = require("../model/productSchema")

// post product controller 
const postProductController = async (req, res) => {
    try {
        const product = new Product({ ...req.body })
        const result = await product.save();
        res.status(200).json({
            message: "Success",
            data: result
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// get product 
const getProductController = async (req, res) => {
    try {
        let totalProducts;
        totalProducts = await Product.find().countDocuments();
        const product = await Product.find()
            .populate({ path: 'categories', select: 'category' })
            .populate({ path: 'subCategory', select: 'name' })

        if (product) {
            res.status(200).json({
                message: "success",
                totalProducts,
                data: product
            })
        } else {
            res.status(404).json({ message: "product not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// get single product 
const getSingleProductController = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (product) {
            res.status(200).json({
                message: "Success",
                data: product
            })
        } else {
            res.status(404).json({ message: "product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// update product 
const updateProudctController = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body);
        if (product) {
            res.status(200).json({
                message: "update succesfull",
                data: product
            })
        } else {
            res.status(404).json({ message: "product not update" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// delete product 
const deleteProductController = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id });
        if (product) {
            res.status(200).json({ message: "Delete Successfull" });
        } else {
            res.status(404).json({ message: "Product not deleted" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    postProductController,
    getProductController,
    getSingleProductController,
    updateProudctController,
    deleteProductController
}