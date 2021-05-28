const express= require("express")
const cartRouter= express.Router()
const mongoose= require("mongoose")
const {User} = require("../models/userModel")
const {extend}= require("lodash")


const populateOptions={
     path:"cart.productId",
     select:"id pName creator platform image price inStock idealFor"
}


// middleware to find user by ID and inserting the extracted user into the request
cartRouter.param("userId",async (req,res,next,userId)=>{
  try{
    const user= await User.findById(userId)
    req.user= user
    next()
    
  }
  catch(err){
    res.status(404).json({success:false,message:"couldnot find the user :(",error:err})
  }
 
})



cartRouter.route("/:userId/cart")
// getting cart from the user using userId
.get(async(req,res)=>{
  const user= req.user
  try{
     const {cart}= await user.populate(populateOptions).execPopulate()
  res.status(200).json({success:true,message:"success :)",cart})
  }
  catch(err){
    res.status(500).json({success:false,message:"failed in extracting cart :(",error:err})
  }
 
})


// adding product to the cart using userId
.post(async(req,res)=>{
  const extractedProd= req.body
  const user=req.user

  const ifProductAlreadyExists= user.cart.some(item=>item.productId==extractedProd.productId)
  console.log("line 55",{ifProductAlreadyExists})
  if(ifProductAlreadyExists){
     return res.status(400).json({success:false,message:"product already exists in cart :("})
   }
     user.cart.push(extractedProd)
  try{
    const savedProd=await user.save()
    console.log("line 62", savedProd)
    res.status(201).json({success:true,message:"product is added to cart successfully :)",cart:user.cart})

  }

  catch(err){
    res.status(500).json({success:true,message:"could not add the product to db :(", error:err})
  }  
})


cartRouter.route("/:userId/cart/:productId")

// updating the product using product Id and userId
.post(async(req,res)=>{
  const {productId}=req.params
  const user= req.user
  const update= req.body
  const prod= user.cart.find(item=>item.productId==productId)
  
  if(!prod){return res.json({success:false,message:"please enter the correct product Id :/"})
  }
  const updatedProd= extend(prod,update)

  try{
  await user.save()
  res.status(201).json({success:true,message:"product is updated successfully :)",cart:user.cart})
   
  }
  catch(err){
   res.status(500).json({success:true,message:"could not update the product :(", error:err})
   console.log("error occured in updating")
  } 

})

// deleting the product from cart
.delete(async(req,res)=>{
     const user=req.user
     const {productId}=req.params
     const prod= user.cart.find(item=>item.productId==productId)

     if(!prod){return res.status(404).json({success:false,message:"please enter the correct product Id"})}
     user.cart.pull(prod)

    try{
     await user.save()
      res.status(200).json({success:true,message:"product is deleted successfully :)",cart:user.cart})
    }
    catch(err){
   res.status(500).json({success:false,message:"could not delete the product :(", error:err})
} 

})

module.exports={cartRouter}