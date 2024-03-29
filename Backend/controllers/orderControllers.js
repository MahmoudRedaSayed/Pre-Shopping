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
  const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Orders.find({ user: req.user._id })
    res.json(orders)
  })
  

  const updateOrderToPaied = asyncHandler(async (req, res) => {
    const order = await Orders.findById(req.params.id);

  
    if (order) {
      order.isPaid=true;
      order.paidAt=Date.now();
      order.paymentResult={
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time ,
        email_address:req.body.payer.email_address
      }
      const updatedOrder=await order.save();
      res.json(updatedOrder);
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

module.exports={createOrder,getOrderById,updateOrderToPaied,getMyOrders};
