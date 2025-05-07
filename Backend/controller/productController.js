const productModel = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

const addProduct = async (req, res) => {
    try {
        const {name, price, description, category, subCategory, sizes, bestSeller } = req.body;

        const image1 = req.files.image1?.[0];
        const image2 = req.files.image2?.[0];
        const image3 = req.files.image3?.[0];
        const image4 = req.files.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        const imageUrl = await Promise.all(images.map(async (item) => {
            const result = await cloudinary.uploader.upload(item.path, {
                resource_type: 'image',
            });
            return result.secure_url;
        }));

        console.log(name, price, description, category, subCategory, sizes, bestSeller);
        console.log(imageUrl);

        const newProduct = await productModel.create({
            name,
            price: Number(price),
            description,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === 'true',
            images: imageUrl,
            date: Date.now()
        });

        console.log(newProduct);

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const listProducts = async(req,res)=>{
    try{
        const product = await productModel.find({});
         res.status(201).json({
            success: true,
            product
        });
    }
    catch(error){
       console.log(error);
       res.status(500).json({
        success:false,
        message:error.message
       })
    }
}

const removeProduct = async(req,res)=>{
    try {

        await productModel.findByIdAndDelete(req.body.id);
        res.status(201).json({
            success:true,
            message:"product Remove"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
         success:false,
         message:error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id, name, price, description, category, subCategory, sizes, bestSeller } = req.body;

        const updateFields = {
            name,
            price: Number(price),
            description,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === 'true'
        };

        if (req.files) {
            const images = [
                req.files.image1?.[0],
                req.files.image2?.[0],
                req.files.image3?.[0],
                req.files.image4?.[0]
            ].filter(Boolean);

            if (images.length > 0) {
                const imageUrl = await Promise.all(images.map(async (item) => {
                    const result = await cloudinary.uploader.upload(item.path, {
                        resource_type: 'image',
                    });
                    return result.secure_url;
                }));
                updateFields.images = imageUrl;
            }
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const singleProduct = async(req,res)=>{
    try {

        const {productId} = req.body;
        const product= await productModel.findById(productId);
        res.status(201).json({
                success:true,
                product
            })
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success:false,
        message:error.message
        })
    }
}

module.exports = { addProduct ,listProducts,removeProduct, singleProduct, updateProduct};
