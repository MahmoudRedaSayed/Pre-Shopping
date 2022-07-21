const express = require("express");
const products =require("../products");
const router= express.Router();

router.get("/products",function(req,res){
    res.json(products);
})

router.post("/products",function(req,res){
    res.json("done");
})


router.get("/products/:id",function(req,res){
    const product =products.find(pro=>pro._id===req.params.id);
    res.json(product);
})


module.exports=router;
