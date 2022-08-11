const express=require("express");
const router=express.Router();
const {auth,getUserProfile}=require("../controllers/usersController");

//@desc auth user
//@access private
//@route /api/users/login
router.route("/login").post(auth);

//@desc get user profile
//@access private
//@route /api/users/profile
router.route("/profile").get(getUserProfile);

module.exports= router;