const mongoose=require("mongoose");

const AutoIncrement = require('mongoose-sequence')(mongoose);

const {categories} = require("../Core/Static/categories");

const bookSchema = new mongoose.Schema({
    _id:Number,
    //String
    title:{type:String,required:true},
    author:{type:String,required:true},
    publisher:{type:String,required:true},
    category:{type:String,required:true,enum:categories},
    //Number
    publishingDate:{type:Date,required:true},
    edition:{type:Number,required:true},
    pages:{type:Number,required:true},
    noOfCopies:{type:Number,required:true},
    shelfNo:{type:Number,required:true},
    available:{type:Number,required:true}, // can read copies [ No of copies - borrowed ] changing during runtime
    //Extra
    borrowedCopies:{type:Number,required:true,default:0},
    // readingCopies:{type:Number,required:false,default:0}, // can be found from available and borrowed copies
    
}, { timestamps: true}); // Stamps for new arrived books

const logSchema = new mongoose.Schema({
    _id:Number,
    //Numbers
    member:{type:Number,required:true,ref:"members"},
    book:{type:Number,required:true,ref:"books"},
    emp:{type:Number,required:false,ref:"managers"}, // employee responsible of borrowing // optional incase of reading
    // Strings
    status:{type:String,enum:["read","borrow"],required:true}, // read,borrow
    returned_date:Date, // set to Date when borrow status is done
    expected_date: {type:Date,required: false} // set to Date when borrow status is done
}, { timestamps: true });

// AutoIncrements
bookSchema.plugin(AutoIncrement,{id: 'books_id', inc_field: "_id"});
logSchema.plugin(AutoIncrement,{id: 'log_id', inc_field: "_id"});
// Models
mongoose.model("books",bookSchema);
mongoose.model("logs",logSchema);