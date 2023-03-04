const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require("mongoose");

require('dotenv').config({path: './.env'});
const cors = require("cors");
const logger = require("morgan");

//import Routes
const LoginRoute = require("./routes/authenticationRouter");
const bookRounte = require("./routes/bookRoute");
// ========= server =========
mongoose.set("strictQuery",true);
mongoose.connect(process.env.MongoUrl)
    .then(()=> {
    console.log("DB connected");
    app.listen(process.env.PORT ||8080, 
        () => console.log(`listening on http://localhost:${process.env.PORT}`));
})
    .catch((error)=> console.log(`DB connection error ${error}`))

//============server=========


app.use(cors());
app.use(logger("dev"));

app.use(express.json({limit:'2mb'}));
app.use(express.urlencoded({extended:false,limit:'2mb'}));

//login
app.use(LoginRoute);
//routing
app.use(bookRounte); //  /books and /categories routes

// not found Middleware
app.use((req,res,next)=>{
    res.status(404)
    .json({massage:"page not found"})
    if(req.file && req.file.path)
        fs.unlinkSync(req.file.path);
})

// error Middleware
app.use((err,req,res,next)=>{
    let status=err.status|| 500;
    res.status(status).json({message:err+""});
    // Delete Saved files in case of error throwing 
    if(req.file && req.file.path)
        fs.unlinkSync(req.file.path);
})

module.exports = app;
