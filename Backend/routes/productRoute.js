const express = require("express");
const {addProduct,listProducts,removeProduct, singleProduct, updateProduct} = require("../controller/productController");
const upload = require("../middleware/multer")
const router = express.Router();
const adminAuth = require('../middleware/adminAuth')

router.post("/add",adminAuth,upload.fields([{name:"image1", maxCount:1},{name:"image2", maxCount:1},{name:"image3", maxCount:1},{name:"image4", maxCount:1}]),addProduct);
router.post("/remove",adminAuth,removeProduct);
router.post("/update", adminAuth, upload.fields([{name:"image1", maxCount:1}, {name:"image2", maxCount:1}, {name:"image3", maxCount:1}, {name:"image4", maxCount:1}]), updateProduct);
router.post("/list", listProducts);
router.post("/single", singleProduct);

module.exports = router;