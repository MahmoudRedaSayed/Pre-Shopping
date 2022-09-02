const express=require("express");
const router=express.Router();
const {auth,getUserProfile,updateUserProfile,userRegisteration,getUsers,deleteUser}=require("../controllers/usersController");
const {protect,admin}=require("../middleware/authMiddleware")

//@desc auth user
//@access private
//@route /api/users/login
router.route("/login").post(auth);

//@desc register user
//@access public
//@route /api/users/
router.route("/").post(userRegisteration).get(protect,admin,getUsers);


router.route('/:id').delete(protect, admin, deleteUser)

//@desc get user profile
//@access private
//@route /api/users/profile
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);

module.exports= router;