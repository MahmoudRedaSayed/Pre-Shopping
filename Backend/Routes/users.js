const express=require("express");
const router=express.Router();
const {auth}=require("../controllers/usersController");


router.route("/login").post(auth);

module.exports= router;