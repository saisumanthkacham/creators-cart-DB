const errorHandler=(err,req,res,next)=>{
  
res.json({success:false,errorMessage:err.message,error:err})
};

module.exports={errorHandler};

