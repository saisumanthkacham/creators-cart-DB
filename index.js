const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())

// importing functions
const {startDBConnection}= require("./db-connection.js")
const {intialisingProductsIntoDBFn,intialisingUsersIntoDBFn} = require("./db-intialisationFuncs.js")

// importing routers
const {productsRouter}= require("./routers/product.router.js")
const {userRouter}= require("./routers/user.router.js")
const {cartRouter}= require("./routers/cart.router.js")



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


app.listen(3000, () => {
  console.log('api server breathing..');
});