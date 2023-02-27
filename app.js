const express = require('express');
const app = express();
const mongoose = require("mongoose");

require('dotenv').config({path: './.env'});
const cors = require("cors");
const logger = require("morgan");


// ========= server =========
mongoose.set("strictQuery",true);
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DataBaseName}`)
    .then(()=> {
    console.log("DB connected");
    app.listen(port, () => console.log(`listening on http://localhost:${process.env.PORT}`));
})
    .catch((error)=> console.log(`DB connection error ${error}`))
//============server=========


app.use(cors());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//login

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

