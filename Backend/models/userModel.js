const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:15
     },
     email:{
        type:String,
        required:true,
        uniqe:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
    },
    cartData:{
        type:Object,
        default:{}
    },
    
})//{minimize:false}

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;