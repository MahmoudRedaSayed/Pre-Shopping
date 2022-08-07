const   express =require("express");
const   products =require("../products");
const router= express.Router();
const asyncHandler =require( "express-async-handler");
const Products=require("../models/products");


//@desc fetch all products
//@route /api/products  
//@access public

router.get("/",asyncHandler(async function(req,res){
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
}))

router.post("/",function(req,res){
    res.json("done");
})

//@desc fetch a product by id
//@route /api/products/:id 
//@access public

router.get("/:id",asyncHandler(async function(req,res){
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
}))


module.exports= router;
