const express =require("express");
const cors =require("cors");
const app = express();
const productsRouter=require("./Routes/products")



app.use(cors());
app.listen(5000,function(){
    console.log(
        "the server is running on the port 5000"
        )
    })
    
    app.use("/api",productsRouter);
