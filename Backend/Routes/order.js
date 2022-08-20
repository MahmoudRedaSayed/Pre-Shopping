const   express =require("express");
const { createOrder,getOrderById } = require("../controllers/orderControllers");
const router= express.Router();
const {getProducts,getProductById}=require("../controllers/productsController");
const {protect}=require("../middleware/authMiddleware");



//@route /api/orders  
//@access public

router.route("/").post(protect,createOrder);
router.route("/:id").get(protect,getOrderById);

module.exports=router;