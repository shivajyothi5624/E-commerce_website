const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    maxlength:32,
    trim:true
  },
  description:{
    type:String,
    required:true,
    maxlength:3000,
    trim:true
  },
  sold:{
    type:Number,
    default:0
  },
  stock:{
    type:Number
  },
  price:{
    type:Number,
    required:true,
  },
  category:{
    type:ObjectId,
    ref:"Category",
    required:true
  },
  photo:{
    data:Buffer,
    contentType:String
  }
},{timestamps:true});

module.exports = mongoose.model("Product",productSchema);