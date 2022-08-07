const mongoose =require("mongoose");

const review=mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true}
})
const productSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    }
    ,category:{
        type:String,
        required:true
    }
    ,description:{
        type:String,
        required:true
    }
    ,image:{
        type:String,
        required:true,
    }
    ,brand:{
        type:String,
        required:true,
    }
    ,rating:{
        type:Number,
        required:true,
        default:0
    }
    ,numReviews:{
        type:Number,
        required:true,
        default:0
    }
    ,numInStocks:{
        type:Number,
        required:true,
        default:0
    }
},{
    timestamps:true
})

const Product= mongoose.model("Product",productSchema);

module.exports=Product;
