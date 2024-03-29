const mongoose =require("mongoose");
const bycrpt =require("bcryptjs");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    ,email:{
        type:String,
        required:true,
        unique:true
    }
    ,password:{
        type:String,
        required:true
    }
    ,Admin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
})
userSchema.methods.matchPassword=async function(enteredPassword)
{
    return await bycrpt.compare(enteredPassword,this.password);
}

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    const salt=await bycrpt.genSalt(10);
    this.password=await bycrpt.hash(this.password,salt)

})

const User= mongoose.model("User",userSchema);



module.exports=User;
