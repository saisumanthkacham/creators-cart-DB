const express= require("express")
const wishListRouter= express.Router()
const mongoose= require("mongoose")
const {User} = require("../models/userModel")
const {extend}= require("lodash")


const populateOptions={
  path:"wishList.productId",
  select:"id pName creator platform image price idealFor"
}

// middleware to find user by ID and inserting the extracted user into the request
wishListRouter.param("userId",async (req,res,next,userId)=>{
  try{
    const user= await User.findById(userId)
    req.user= user
    next()
  }
  catch(err){
    res.status(404).json({success:false,message:"couldnot find the user :(",error:err})
  }
 
})


wishListRouter.route("/:userId/wishList")
.get(async(req,res)=>{
  const user= req.user
  try{
     const {wishList}= await user.populate(populateOptions).execPopulate()
  res.status(200).json({success:true,message:"success :)",wishList})
  }
  catch(err){
    res.status(500).json({success:false,message:"could not fetch the wishList :("})
  }
 
})

// adding product to the cart using userId
.post(async(req,res)=>{
  const extractedProd= req.body
  const user=req.user
  user.wishList.push(extractedProd)

  try{
  await user.save()
  res.status(201).json({success:true,message:"product is added to wishList successfully :)",wishList:user.wishList})
  }
  catch(err){
    res.status(500).json({success:false,message:"could not add the product to wishList :(",error:err})
  }
 
})


wishListRouter.route("/:userId/wishList/:productId")

// deleting the product from wishList using userId and productId
.delete(async(req,res)=>{
     const user=req.user
     const {productId}=req.params
     const prod= user.wishList.find(item=>item.productId==productId)

     if(!prod)
     {return res.status(404).json({success:false,message:"please enter the correct product Id :("})}
     user.wishList.pull(prod)

     try{
     await user.save()
     res.status(200).json({success:true,message:"product is deleted successfully :)",wishList:user.wishList})
     }
     catch(err){
      res.status(500).json({success:false,message:"could not delete the product from wishList :(",error:err})
  }
})

module.exports={wishListRouter}