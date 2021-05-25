
const express= require("express");
const mongoose= require("mongoose");
const {Schema}= mongoose;


const ProductSchema= new Schema( {
    id:mongoose.Schema.Types.ObjectId,
    pName:{
    type:String,
    unique:[true,"product name should be unique :/"],
    required:[true,"please add the name :("]
  },
    creator:{
    type:String,
    required:[true,"please add the kreator name :("]
  },
    platform:{
    type:String,
    required:[true,"please add the platform name :("]
  },
    image:{
    type:String,
    required:[true,"please add the url for the image :("]
  },
    price:{
    type:Number,
    required:[true,"please add the price for the product :("]
  },

    idealFor:{
    type:String,
    enum:{values:["men","Women"],message:`{VALUE} is not supported :(` },
    required:[true,"please add the gender :("],
  }, 

    qty:Number,

    inStock:Boolean,

    fastDelivery:Boolean,

    createdAt:{ type: Date, default: Date.now },

    updatedAt:{ type: Date, default: Date.now },

},{timestamps:true})


const Product= new mongoose.model("Product",ProductSchema)


module.exports={Product}