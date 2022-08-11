const users=require("../models/user");
const asyncHandler =require( "express-async-handler");
const {generateToken}=require("../utils/generateToken");


//@desc auth user
//@access private
//@route /api/users/login
const auth=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await users.findOne({email});
        if(user&&await(user.matchPassword(password))) 
        {
            res.json({...user,token:generateToken(user.id)});
        }
        else
        {
            res.status(401);
            throw Error("Invalid email or password");
        }
    }
    catch(error)
    {
        console.log(error.message);
    }
})

//@desc get user profile
//@access private
//@route /api/users/profile
const getUserProfile=asyncHandler(async(req,res)=>{
    res.send("success");
})


module.exports={auth,getUserProfile};