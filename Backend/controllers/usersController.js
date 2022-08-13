const users=require("../models/user");
const asyncHandler =require( "express-async-handler");
const {generateToken}=require("../utils/generateToken");
const User = require("../models/user");


//@desc auth user
//@access private
//@route /api/users/login
const auth=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await users.findOne({email});
        if(user&&await(user.matchPassword(password))) 
        {
            res.json({...user,token:generateToken(user._id)});
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
        res.status(401);
        res.json({error:"error in data"});
    }
})

//@desc get user profile
//@access private
//@route /api/users/profile
const getUserProfile=asyncHandler(async(req,res)=>{
    try{
        const user=await users.findById(req.user._id);
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

//@desc register user
//@access public
//@route post /api/users
const userRegisteration=asyncHandler(async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const userExist=User.findOne({email});
        if(userExist===undefined)
        {
            console.log(userExist.name)
            res.status(400);
            throw new Error("user Exist");
        }
        const user=await User.create({
            email,
            password,
            name
        })
        if(user)
        {
            res.status(201);
            res.json({
                ...user,
                token:generateToken(user._id)
            })
        }
        else
        {
            res.status(400);
            throw new Error("data invalid");
        }
    }
    catch(error)
    {
        console.log(error.message);
        res.status(401);
        res.json({error:"invalid data"})
    }
})


module.exports={auth,getUserProfile,userRegisteration};