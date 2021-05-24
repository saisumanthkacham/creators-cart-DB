const express= require("express")
const wishListRouter= express.Router()
const mongoose= require("mongoose")
const {User} = require("../models/userModel")
const {extend}= require("lodash")


// middleware to find user by ID and inserting the extracted user into the request
wishListRouter.param("userId",async (req,res,next,userId)=>{
  try{
    const user= await User.findById(userId)
    req.user= user
    next()
  }
  catch(err){
    res.status(404).json({success:false,message:"couldnot find the user",errorMsg:err.msg})
  }
 
})


wishListRouter.route("/:userId/wishList")
// getting cart from the user using userId
.get((req,res)=>{
  const {wishList}=req.user
  res.json({success:true,message:"success",wishList})
})

// adding product to the cart using userId
.post(async(req,res)=>{
  const extractedProd= req.body
  const user=req.user
  user.wishList.push(extractedProd)
  await user.save()
  res.json({success:true,message:"product is added to wishList successfully",user})
  
})


wishListRouter.route("/:userId/wishList/:productId")

// deleting the product from wishList using userId and productId
.delete(async(req,res)=>{
     const user=req.user
     const {productId}=req.params
     const prod= user.wishList.find(item=>item.productId==productId)

     if(!prod)
     {return res.json({success:false,message:"please enter the correct product Id",user})}

     user.wishList.pull(prod)
     await user.save()
      res.json({success:true,message:"product is deleted successfully",user})
})

module.exports={wishListRouter}