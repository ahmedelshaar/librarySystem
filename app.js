const express = require('express');
const app = express();
const mongoose = require("mongoose");

require('dotenv').config({path: './.env'});
const cors = require("cors");
const logger = require("morgan");

//import Routes
const LoginRoute = require("./routes/loginRoute");
// ========= server =========
mongoose.set("strictQuery",true);
mongoose.connect(process.env.MongoUrl)
    .then(()=> {
    console.log("DB connected");
    app.listen(process.env.PORT, () => console.log(`listening on http://localhost:${process.env.PORT}`));
})
    .catch((error)=> console.log(`DB connection error ${error}`))

//============server=========


app.use(cors());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//login
app.use(LoginRoute);
//routing

// not found Middleware
app.use((req,res,next)=>{
    res.status(404)
    .json({massage:"page not found"})
})

// error Middleware
app.use((err,req,res,next)=>{
    let status=err.status||500;
    res.status(status).json({message:err+""});
})

module.exports = app;
