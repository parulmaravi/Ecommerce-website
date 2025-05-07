const express = require("express");
const router = express.Router();
const {addToCart, updateCart,getUserCart} = require('../controller/cartController');
const authUser = require("../middleware/auth.js")

router.post('/get',authUser,getUserCart);
router.post('/update',authUser,updateCart);
router.post('/add',authUser,addToCart)

module.exports = router
