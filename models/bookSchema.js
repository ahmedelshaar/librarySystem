const mongoose=require("mongoose");

const AutoIncrement = require('mongoose-sequence')(mongoose);

const {categories} = require("../Core/Static/categories");

const bookSchema = new mongoose.Schema({
    _id:Number,
    //String
    title:{type:String,required:true},
    auther:{type:String,required:true},
    publisher:{type:String,required:true},
    Category:{type:String,required:true,enum:categories},
    //Number
    PublishingDate:{type:Date,required:true},
    Edition:{type:Number,required:true},
    NoOfCopies:{type:Number,required:true},
    shelfNo:{type:Number,required:true},
    //Boolean
    Avilable:{type:Boolean,required:false},

    //Extra
    borrowedCopies:{type:Number,required:false,default:0},
    
}, { timestamps: true}); // Stamps for new arrived books

const logSchema = new mongoose.Schema({
    _id:Number,
    //Numbers
    member:{type:Number,required:true,ref:"members"},
    book:{type:Number,required:true,ref:"books"},
    emp:{type:Number,required:false,ref:"emps"}, // employee responsible of borrowing // optional incase of reading
    // year:{type:Number,required:false,default:new Date(Date.now()).getFullYear()}, // Will get it from CreatedAt 
    // Strings
    status:{type:String,enum:["read","borrow"],required:true}, // read,borrow
    returned:{type:Boolean,default:false} // set to true incase of changing borrowing status
}, { timestamps: true });

// AutoIncrements
// bookSchema.plugin(AutoIncrement,{id: 'books_id', inc_field: "_id"});
// logSchema.plugin(AutoIncrement,{id: 'log_id', inc_field: "_id"});
// Models
mongoose.model("books",bookSchema);
mongoose.model("logs",logSchema);