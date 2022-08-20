const asyncHandler =require( "express-async-handler");
const Orders=require("../models/order");

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Orders.findById(req.params.id).populate(
      'user',
      'name email'
    )
  
    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })


const createOrder=asyncHandler(async function(req,res){
    try{
        const {orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        }=req.body;


        if(orderItems&&orderItems.length===0)
        {
            throw new Error("no ordered items");
            return;
        }
        else
        {
            console.log(paymentMethod)
            const order=new Orders({
                orderedItem:orderItems,
                user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
            })
            const createdOrder=await order.save();
            res.status(201);
            console.log(createdOrder)
            res.json(createdOrder);
        }
    }
    catch(error)
    {
        console.log(error.message);
        res.status(404);
        throw new Error("no ordered items");
    }
});

module.exports={createOrder,getOrderById};
