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
            res.json({ _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.Admin,
                        token:generateToken(user._id)});
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
        if(user) 
        {
            if (user) {
                res.json({
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  isAdmin: user.isAdmin,
                  token:generateToken(user._id)
                })
            }
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
        throw Error("Invalid email or password");
    }

})


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
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
            if (user) {
                res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token:generateToken(user._id)
                })
        }
        else
        {
            res.status(400);
            throw new Error("data invalid");
        }
        }
    }
    catch(error)
    {
        console.log(error.message);
        res.status(401);
        res.json({error:"invalid data"})
    }
})

const getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({});
    res.json(users);
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

  const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  

  const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.Admin = req.body.isAdmin
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.Admin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  

module.exports={auth,getUserProfile,userRegisteration,updateUserProfile,getUsers,deleteUser,getUserById,updateUser};