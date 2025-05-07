const express = require("express");
const router = express.Router();
const {verifyStripe,stripeMethod,allOrders,userOrders,updateStatus,placeOrders} = require("../controller/orderController");
const adminAuth  = require("../middleware/adminAuth");
const authUser  = require("../middleware/auth");

router.post('/list',adminAuth,allOrders);
router.post('/status',adminAuth,updateStatus);

router.post('/place',authUser,placeOrders);
router.post('/stripe',authUser,stripeMethod);
router.post('/userOrder',authUser,userOrders);
              
router.post('/verifyStripe',authUser,verifyStripe);


module.exports = router