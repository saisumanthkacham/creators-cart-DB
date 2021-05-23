const {User}= require("./models/userModel.js")
const {usersData} = require("./data.js")
const {productsData} = require("./data")
const {Product}= require("./models/productModel.js")



const intialisingProductsIntoDBFn=()=>{
  
  productsData.forEach( async (item)=>{
    try{
    const createdProd= new Product(item)
    const savedProd= await createdProd.save()
  
    }
    catch(err){
      console.log({success:false,message:"couldn't able to save products to DB",error:err})
    }
  })
console.log("products saved")
}


const intialisingUsersIntoDBFn=()=>{
  usersData.forEach(async (user)=>{
    try{
        const createdUser= new User(user)
        const savedUser= await createdUser.save()
    }

    catch(error){
      console.log({success:false,message:"couldn't able to save users to DB",error:error})
    }

  })

   console.log("users saved to DB")
}

module.exports={intialisingUsersIntoDBFn,intialisingProductsIntoDBFn}