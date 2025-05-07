const userModel = require("../models/userModel")

 const addToCart = async(req , res)=>{
   try {
       const {userId, itemId,size} = req.body

       
       if (!userId || !itemId || !size) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }

      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
       let cartData = await userData.cartData

       if(cartData[itemId]){
          if(cartData[itemId][size]){
            cartData[itemId][size] +=1
          }
          else{
             cartData[itemId][size] = 1
          }
       }
       else{
         cartData[itemId] = {}
         cartData[itemId][size] = 1
       }

       await userModel.findByIdAndUpdate(userId,{cartData});

       res.status(201).json({
         success:true,
         message:"Added to cart "
       })
   } catch (error) {
    console.log(error)
    res.json({success:false,
        message:error.message
    })
   }
}

const updateCart = async(req , res)=>{
    try {
          const {userId, itemId,sizes,quantity} = req.body

          const userData = await userModel.findById(userId);
          if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
          }
         
          let cartData = userData.cartData || {}; 

          if (!cartData[itemId]) {
            cartData[itemId] = {};
          }
          cartData[itemId][sizes] = quantity;

          await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

         res.status(201).json({
         success:true,
         message:"updated to cart "
       })

    } catch (error) {
        console.log(error)
        res.json({success:false,
        message:error.message
    }) 
    } 
}

const getUserCart = async(req , res)=>{
    try {
        const {userId} = req.body 

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData
 
        res.status(201).json({
            success:true,
            cartData
          }) 
        
    } catch (error) {
        console.log(error)
        res.json({success:false,
        message:error.message
    }) 
    }
}   
 
module.exports = {addToCart, updateCart,getUserCart}