const asyncHandler =require( "express-async-handler");
const Products=require("../models/products");


//@desc fetch all products

const getProducts=asyncHandler(async function(req,res){
    try{
        const products=await Products.find({});
        if(products)
        {
            res.json(products);
        }
        else{
            res.status(404);
            throw new Error("Not found")
        }
    }
    catch(error)
    {
        console.log(error.message);
        res.status(404);
        throw new Error("not found");
    }
});


//@desc fetch a product by id
const getProductById=asyncHandler(async function(req,res){
    try{
        const product =await Products.findById(req.params.id);
        if(product)
        {
            res.json(product);
        }
        else{
            res.status(404);
            throw new Error("not found");
        }
    }
    catch(error)
    {
        console.log(error.message);
        res.status(404);
        throw new Error("not found");
    }
})

module.exports= {getProducts ,getProductById};