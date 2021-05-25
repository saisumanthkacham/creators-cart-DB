const express = require('express');
const bodyParser = require('body-parser')
const cors= require("cors")
const app = express();
app.use(bodyParser.json())
app.use(cors())

// importing functions
const {startDBConnection}= require("./db-connection.js")
const {intialisingProductsIntoDBFn,intialisingUsersIntoDBFn} = require("./db-data-intialisationFuncs.js")
const {pageNotFound} = require("./middlewares/pageNotFound.js")
const {errorHandler}= require("./middlewares/errorHandler.js")


// importing routers
const {productsRouter}= require("./routers/product.router.js")
const {userRouter}= require("./routers/user.router.js")
const {cartRouter}= require("./routers/cart.router.js")
const {wishListRouter}= require("./routers/wishList.router.js")


app.listen(3000, () => {
  console.log('api server breathing..');
});


app.get('/', (req, res) => {
  startDBConnection()
  // these func should be run only once for the sake of intialisation
  // intialisingProductsIntoDBFn()
  // intialisingUsersIntoDBFn()
  res.send('Hello Express app!')
});


// routers implementation
app.use("/products",productsRouter)
app.use("/users",userRouter)
app.use("/users",cartRouter)
app.use("/users",wishListRouter)
app.use("/*",pageNotFound)
app.use(errorHandler)

