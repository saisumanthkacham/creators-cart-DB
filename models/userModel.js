const express= require("express");
const mongoose= require("mongoose");
const {Schema,model}= mongoose;
const {Product}= require("./productModel.js")

UserSchema= new Schema([
  {
  id:mongoose.Schema.Types.ObjectId,
  userName:{
    type:String,
    unique:[true,"username should be unique"],
    required:[true,"please enter the username"]
  },
  password:{
    type:String,
    required:[true,"please enter the password"]
  },
  emailId:{
    type:String,
    unique:[true,"email-id should be unique"],
    required:[true,"please enter the email-id"]
  },
  address:[{
    pinCode:{
    type:Number,
    required:[true,"please enter the pincode"]
  },
    address:{
    type:String,
    required:[true,"please enter the address"]
  },
    city:String,
    town:String,
    state:String,
    country:String,
    phoneNumber:Number,
  }],

    cart:[
      {
        productId:{ 
        type: mongoose.Schema.Types.ObjectId, ref:Product},
       qty:{ type:Number, min:1}
      }  
  ],

   wishList:[
      {
        productId:{ 
        type: mongoose.Schema.Types.ObjectId, ref:Product},
      }
      
    ],

    createdAt:{ type: Date, default: Date.now },

    updatedAt:{ type: Date, default: Date.now },
}
  
],{timestamps:true})

// creating a model
const User= new model("User",UserSchema)



module.exports={User}