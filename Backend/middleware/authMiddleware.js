const  jwt =require('jsonwebtoken');
const  asyncHandler = require('express-async-handler');
const  User =require('../models/user');

//@desc to check the vaild token
//@route /api/users/profile
//@access private

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token,"Armteam")

      req.user = await User.findById(decoded.id).select('-password')
      console.log(req.user);

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

//@desc to check the vaild Admin
//@route /api/users/profile
//@access private

const admin = (req, res, next) => {
  if (req.user && req.user.Admin) {
    next()
  } else {
    console.log(req.user)
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

module.exports= { protect, admin }
