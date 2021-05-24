const express= require("express")
const productsRouter= express.Router()
const mongoose= require("mongoose")
const {Product} = require("../models/productModel")


const excludeKeys={
  __v:0,
}

productsRouter.route("/")
.get(async(req,res)=>{
   const body= req.body
    console.log("from product router",{body})
  try{
    const productsData= await Product.find({},excludeKeys)
    res.status(200).json({success:true,message:"successful",data:productsData}) 
  }
  catch(err){
    res.status(500).json({success:false,message:"error while fetching products",errorMsg:err.msg})
  }
  
})


productsRouter.route("/:id")

.get(async(req,res)=>{
  
   try{
    const id= req.params.id
    const prod= await Product.findById(id)
    res.json({success:true,prod})
   }
   catch(err){
    res.status(404).json({success:false,message:"product not found"})
  }
})

module.exports= {productsRouter}