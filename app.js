 const { MONGO_URI } = require('./config');


const express = require("express");
const log = require("morgan");
const mongoose = require("mongoose");
const app = express();

 //————BODYPARSER MIDDLEWARE
 app.use(express.json());
 
const users = require("./routes/users");
const items = require("./routes/items");


//DB config
// const db= "mongodb://FarahMint:FarahMint123@ds147946.mlab.com:47946/mern-shop";
const db= `${MONGO_URI}`;


// CONNECT TO MONGODB
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false 
})


.then(()=> console.log("mongodb connected...."))
.catch(err => console.log(err));


// middleware
app.use(log("dev"));
// routes
 app.use("/users", users);
 app.use("/items", items);



//Catch 404 err and foward to err handler
app.use((req, res, next)=>{
    const err = new Error("Not found");
    err.status=404;
    next(err);
})
// err handler func
app.use((err, req,res,next)=>{
    const error = app.get("env")=== "development" ? err : {};

    const status = err.status || 500;

//  res to client
    res.status(status).json({
        error:{
            message:error.message
        }
    });

//  res to us
    console.error(err);

})

// start server
const port = app.get("port") || 3000;
app.listen(port, ()=> console.log(`server listening on ${port}`));