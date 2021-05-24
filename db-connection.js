const express= require("express");
const mongoose= require("mongoose");
const mySecret = process.env['pass']

const url= "mongodb+srv://saisumanthkacham:"+mySecret+"@neog-cluster.v4nka.mongodb.net/creators-cart-DB?retryWrites=true&w=majority";

const startDBConnection=async()=>{
  
   console.log("trying to connect with the DB...")

  try{
     const connection=await mongoose.connect(url,
     {useNewUrlParser: true,
     useUnifiedTopology: true})

      connection?console.log("connection established with DB :)"):console.log("cannot connect to DB :(")
    }

  catch(err){
    console.log({success:false,message:"connection failed DB error :(",error:err})
  }
}


module.exports={startDBConnection}

