require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");


// routes
const authrouts = require("./routers/auth");
const userRoutes = require("./routers/user");
const userCategory = require("./routers/category");
const userProduct = require("./routers/product");
const order = require("./routers/order");
const paymentBRoutes = require("./routers/paymentBRoutes");

port =8000 || process.env.port;


// middlever
app.use(express.json());
// app.use(express.urlencoded(true))
app.use(cors());
app.use(cookieParser());
 


//router
app.use("/api",authrouts);
app.use("/api",userRoutes);
app.use("/api",userCategory);
app.use("/api",userProduct)
app.use("/api",order)
app.use("/api",paymentBRoutes);



//databsae coonection
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
}
).then(()=>{
  console.log("DB CONNECTED");
});





//server running
app.listen(port,()=>{
  console.log(`app is lisning at ${port}`);
})