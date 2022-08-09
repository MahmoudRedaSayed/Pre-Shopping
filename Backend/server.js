const  express =require("express");
const   productsRouter =require("./Routes/products");
const cors =require("cors");
const app = express();
const bodyParser=require("body-parser");
const ConnectDB =require("./config/db");
const {notFound,errorHandler}=require("./middleware/errorMiddleware");
app.use(bodyParser.urlencoded({ extended: true }));


ConnectDB();

app.use(cors());
app.listen(5000,function(){
    console.log(
        "the server is running on the port 5000"
        )
    })
    
    app.use("/api/products",productsRouter);
    app.use(notFound);
    app.use(errorHandler);
