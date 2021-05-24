const pageNotFound=(req,res)=>{
  res.status(404).json({success:false,message:"page not found on api server"})
}

module.exports={pageNotFound}