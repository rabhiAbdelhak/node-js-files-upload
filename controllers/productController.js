const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes')


//get all products
const getAllProducts = async (req, res) => {
     const products = await Product.find();
     res.status(StatusCodes.OK).json({products});
}

//create product
const createProduct = async (req, res) => {
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product: req.body});
}

//get single products
const getSingleProduct = async (req, res) => {
   const {id} = req.params;
   const product = await Product.findOne({_id: id});
   if(!product){
       throw new NotFoundError('the product with the provided ID does not exist')
   }
   res.status(StatusCodes.OK).json({product})
}

//update product
const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findOneAndUpdate({_id: id}, req.body);
    if(!product){
        throw new NotFoundError('the product with the provided ID does not exist')
    }
    res.status(StatusCodes.OK).json({product})
}

//delete product
const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findOneAndDelete({_id: id});
    if(!product){
        throw new NotFoundError('the product with the provided ID does not exist')
    }
    res.status(StatusCodes.OK).json({product})
}

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct

}