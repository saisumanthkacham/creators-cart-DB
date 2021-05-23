const express= require("express")
const userRouter= express.Router()
const mongoose= require("mongoose")
const {User} = require("../models/userModel")


const excludeKeys={
  __v:0,
}

userRouter.route("/")
.get(async (req,res)=>{
  try{
   const users= await User.find({},excludeKeys)
   res.status(200).json({success:true,message:"successful",users})
  }
  catch(err){
     res.status(500).json({success:false,message:"error while fetching users",errorMsg:err.msg})
  }
});

userRouter.route("/:id")
.get(async (req,res)=>{
  
  try{
  const id=req.params.id
   const user= await User.findById(id)
   res.status(200).json({success:true,message:"successful",user})
  }
  catch(err){
     res.status(500).json({success:false,message:"error while fetching user",errorMsg:err.msg})
  }

})

module.exports={userRouter}