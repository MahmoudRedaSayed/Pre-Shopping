const   express =require("express");
const router= express.Router();
const {getProducts
    ,getProductById
    ,deleteProduct
    ,updateProduct
    ,createProduct
    ,createProductReview
    ,getTopProducts}=require("../controllers/productsController");
const{protect, admin}=require("../middleware/authMiddleware")



//@route /api/products  
//@access public

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts)


router.route('/:id/reviews').post(protect, createProductReview)


//@route /api/products/:id 
//@access public

router
.route('/:id')
.get(getProductById)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct)




module.exports= router;
