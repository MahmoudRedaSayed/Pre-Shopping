const jwt=require("jsonwebtoken");
const generateToken=(id)=>{
    return jwt.sign({id},"Armteam",{
        expiresIn:"30d"
    })
}

module.exports=generateToken;