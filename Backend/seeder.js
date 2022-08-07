const users=require("./data/users");
const products=require("./data/products");
const mongoose=require("mongoose");
const ConnectDB=require("./config/db");
const Users=require("./models/user");
const Products=require("./models/products");
const Orders=require("./models/order");


ConnectDB();

const importData=async ()=>{
    try{
        await Users.deleteMany();
        await Products.deleteMany();
        await Orders.deleteMany();

        const createdUsers=await Users.insertMany(users);
        const createdProducts=products.map(product=>{
            return {...product,user:createdUsers[0]};
        })

        await Products.insertMany(createdProducts);
        console.log("the data is imported");      
        process.exit();  
    }
    catch(error){
        console.log(error.message);
    }
}



const destroyData=async ()=>{
    try{
        await Users.deleteMany();
        await Products.deleteMany();
        await Orders.deleteMany();

        console.log("the data is destroied");      
        process.exit();  
    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

if(process.argv[2]==="-d")
{
    destroyData();
}
else{
    importData();
}