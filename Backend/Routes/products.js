const   express =require("express");
const router= express.Router();
const {getProducts,getProductById}=require("../controllers/productsController");



//@route /api/products  
//@access public

router.route("/").get(getProducts);




//@route /api/products/:id 
//@access public

router.route("/:id").get(getProductById);


module.exports= router;
