const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const Apifeatures = require("../utils/apifeatures");



//Create products-- admin

const createProduct =catchAsyncError( async (req,res,next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })

})


//Get all products


const getAllproduct = catchAsyncError(async (req, res) => {

    const resultPerpage = 5;
    const productCount = await Product.countDocuments();
    
    const apifeature= new Apifeatures(Product.find(),req.query).search().filter().pagination(resultPerpage)
    const products = await apifeature.query;
    
    res.status(200).json({
        success: true,
        products
    })

})

//get product details

const getProductdetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler("product not found",404))
    }
    
    res.status(200).json({
        success: true,
        product,
        productCount
    })

    
})

//update products--admin


const Updateproduct =catchAsyncError( async (req, res, next) => {
    let product =await Product.findById(req.params.id);

   if (!product) {
        return next(new ErrorHandler("product not found",404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify:false
    });

    res.status(200).json({
        success: true,
        product
    })

})


//Delete product

const deleteProduct = catchAsyncError(async (req,res,next) => {
    
    const product = await Product.findById(req.params.id);

   if (!product) {
        return next(new ErrorHandler("product not found",404))
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message:"product is deleted successfully"
    })
})





module.exports = { getAllproduct,createProduct,Updateproduct,deleteProduct,getProductdetails }