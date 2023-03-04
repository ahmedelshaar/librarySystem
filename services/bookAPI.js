const mongoose=require("mongoose");
require("./../Models/bookSchema");

const BookSchema=mongoose.model("books");
const LogSchema=mongoose.model("logs");

// Get All Books
exports.getAllBooks = ()=>{
    BookSchema.find({})
        .then(data=>{
            return data;
        })
        .catch(error=>{
            return [];
        })
}

// Get Book By Specific ID
exports.getBookByID = (id)=>{
    BookSchema.findOne({_id:id})
        .then(data=>{
            return [data]
        })
        .catch(error=>{
            return null;
        })
}

// Get All Books By Specifi Author
exports.getBookByAuthor = (author)=>{
    BookSchema.find({author:author})
        .then(data=>{
            return data;
        })
        .catch(error=>{
            return null
        })
}
exports.getBookByPublisher = (publisher)=>{
    BookSchema.find({publisher:publisher})
        .then(data=>{
            return data;
        })
        .catch(error=>{
            return null;
        })
}
exports.getBookByTitle = (title)=>{
    BookSchema.find({title:title}) // Not FindOne Cause we can have multi editions || same title with diff author
        .then(data=>{
            return data;
        })
        .catch(error=>{
            return null
        })
}

exports.avilableBooks = (req,res,next)=>{
    BookSchema.find({Avilable:{$gt:0}})
        .then(data=>{
            return data;
        })
        .catch(error=>{
            return null;
        })
}

// TO BE CONTINUED


// Read Book
exports.readBook = async(member_id,book_id)=>{
    let data = await BookSchema.findOne({_id:book_id})
    // if No Books with This ID
    if (!data) return False
    // if No books available [all borrowed and currently reading]
    if (data.Avilable <= 0) return False;
    // Adding +1 reading to the book
    await BookSchema.updateMany({_id:book_id},{$inc:{Avilable:-1}})
    // Adding log with read status 
    data = await LogSchema.create({member:member_id,book:book_id,emp:emp_id,status:"read"})
    return true;
};
// Done Reading Book
exports.readBookDone = (member_id,book_id)=>{
    
};

// Borrow Book
exports.borrowBook = (member_id,book_id)=>{
    
};
// Done Borrowing Book
exports.borrowBookDone = (member_id,book_id)=>{
    
};

/* exports.borrowedBooks = (req,res,next)=>{
    LogSchema.find({Avilable:true},{_id:0})
    .populate({path:"book",select:{title:1}})
    .populate({path:"member",select:{fullname:1}})
    .populate({path:"emp",select:{fullname:1}})
        .then(data=>{
            res.status(200).json({data});
        })
        .catch(error=>{
            next(error);
        })
} */

