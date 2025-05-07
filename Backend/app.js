const express = require('express');
const app = express();
const connectDB = require('./config/mongoDB');
connectDB();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const cloudinary = require('./config/cloudinary');
const userRouter = require('./routes/userRoute.js');
const produtRouter = require("./routes/productRoute.js");
const cartRouter = require('./routes/cartRoute.js');
const orderRouter = require("./routes/orderRoute.js")
const PORT = process.env.PORT || 3000;

const allowedOrigins = [process.env.FRONTEND_URL1, process.env.FRONTEND_URL2];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
};

  
app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("Server is runing")
})

app.use("/api/users",userRouter);
app.use("/api/products",produtRouter);
app.use("/api/carts",cartRouter);
app.use("/api/orders", orderRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})