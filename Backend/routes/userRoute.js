const express = require("express");
const router = express.Router();
const {userRegister,userLogin,userLogout,adminLogin} = require("../controller/userController");


router.post("/register",userRegister);
router.post("/login",userLogin );
router.get("/logout",userLogout);
router.post("/adminLogin",adminLogin)


module.exports = router;