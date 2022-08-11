const users=require("../models/user");
const asyncHandler =require( "express-async-handler");

const auth=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await users.findOne({email});
        if(user&&await(user.matchPassword(password))) 
        {
            res.json({...user,token:null});
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


module.exports={auth};