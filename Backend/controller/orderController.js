const orderModel = require("../models/orderModel");
const userModel = require("../models/orderModel")
const Stripe = require("stripe");


const stripe = new Stripe(process.env.STRIPE_SECRET_KRY)

const currency = 'inr';
const deliveryCharge = 10;

const placeOrders = async(req,res)=>{
    try {
         const {userId, items,amount,address, paymentMethod } = req.body;

         if (!paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'Payment method is required'
            });
        }

         const orderData = {
             userId,
             items,
             address,    
             amount,
             paymentMethod,
             payment: false,
             date:Date.now()
         }

         const newOrder = new orderModel(orderData);
         await newOrder.save();
          
         await userModel.findByIdAndUpdate(userId, { cart: {} });
          
         res.status(201).json({
            success:true,
            message:"Order Placed"
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const stripeMethod = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;
    const { origin } = req.headers;

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Payment method is required.'
      });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod,
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery charges'
        },
        unit_amount: deliveryCharge * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment'
    });

    res.status(201).json({
      success: true,
      session_url: session.url
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const verifyStripe = async(req,res)=>{
    const {orderId, success, userId} = req.body

    try {
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.status(201).json({
                success:true,
            })
        }
        else{
           await orderModel.findByIdAndDelete(orderId);
           res.status(400).json({
            success:false
           })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const allOrders = async (req, res) => {
    try {
      const orders = await orderModel.find({}); 
  
      res.status(200).json({
        success: true,
        orders
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
const userOrders = async(req,res)=>{
   try {
       const {userId} = req.body

       console.log('Received userId:', userId);

       if (!userId) {
        return res.status(400).json({
          success: false,
          message: "userId is required",
        });
      }
      const orders = await orderModel.find({ userId });
       console.log('Orders found:', orders); 
       if (orders.length === 0) {  
        return res.status(200).json({
          success: true,
          orders: [],     
          message: "No orders found for this user",
        });
      } 

       res.status(201).json({
          success:true,
          orders
       })
   } catch (error) {
       console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
   }
}

const updateStatus = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { orderId, status } = req.body;

    // Check if both orderId and status are provided
    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "orderId and status are required",
      });
    }

    // Attempt to update the order status
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    // Check if the order was found and updated
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Return success message
    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


module.exports = {stripeMethod,allOrders,placeOrders,userOrders,updateStatus,verifyStripe}