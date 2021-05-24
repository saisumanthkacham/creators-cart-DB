const express= require("express")
const cartRouter= express.Router()
const mongoose= require("mongoose")
const {User} = require("../models/userModel")
const {extend}= require("lodash")


// middleware to find user by ID and inserting the extracted user into the request
cartRouter.param("userId",async (req,res,next,userId)=>{
  try{
    const user= await User.findById(userId)
    req.user= user
    next()
  }
  catch(err){
    res.status(404).json({success:false,message:"couldnot find the user",errorMsg:err.msg})
  }
 
})


cartRouter.route("/:userId/cart")
// getting cart from the user using userId
.get((req,res)=>{
  const {cart}=req.user
  res.json({success:true,message:"success",cart})
})

// adding product to the cart using userId
.post(async(req,res)=>{
  const extractedProd= req.body
  const user=req.user
  user.cart.push(extractedProd)
  await user.save()
  res.json({success:true,message:"product is added to cart successfully",user})
  
})


cartRouter.route("/:userId/cart/:productId")
// updating the product using product Id and userId
.post(async(req,res)=>{
  const {productId}=req.params
  const user=req.user
  const update= req.body
  const prod= user.cart.find(item=>item.productId==productId)

  if(!prod){return res.json({success:false,message:"please enter the correct product Id"})}
  
  const updatedProd= extend(prod,update)
  await user.save()
  res.json({success:true,message:"product is updated successfully",user})
})

// deleting the product from cart
.delete(async(req,res)=>{
     const user=req.user
     const {productId}=req.params
     const prod= user.cart.find(item=>item.productId==productId)

     if(!prod){return res.json({success:false,message:"please enter the correct product Id"})}

     user.cart.pull(prod)
     await user.save()
      res.json({success:true,message:"product is deleted successfully",user})
})

module.exports={cartRouter}