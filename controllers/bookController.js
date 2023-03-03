const mongoose=require("mongoose");
require("./../Models/bookSchema");

const BookSchema=mongoose.model("books");
const LogsSchema=mongoose.model("logs");

exports.getAllBooks=(req,res,next)=>{
    BookSchema.find({})
        .then(data=>{
            res.status(200).json({data});
        })
        .catch(error=>{
            next(error);
        })

}


//---------------- Single Book Requets

// Get Book By ID
exports.getBookByID=(req,res,next)=>{
    let id = req.params.id||req.body.id // Get ID from body or params
    BookSchema.findOne({_id:id})
        .then(data=>{
            res.status(200).json({data});
        })
        .catch(error=>{
            next(error);
        })

}

// Delete Book By ID
exports.deleteBook=(req,res,next)=>{
    let id = req.params.id||req.body.id // Get ID from body or params
    BookSchema.deleteOne({_id:id})
        .then(data=>{
                res.status(200).json({data});
        })
        .catch(error=>{
            next(error);
        })
}

// Add new Book
exports.addClass=(req,res,next)=>{
    // console.log(req.body);
    BookSchema.create({
        _id:req.body.id,
        title: req.body.title,
        auther: req.body.auther,
        publisher: req.body.publisher,
        Category: req.body.Category,
        PublishingDate: req.body.PublishingDate,
        Edition: req.body.Edition,
        NoOfCopies: req.body.NoOfCopies,
        shelfNo: req.body.shelfNo,
        Avilable: req.body.NoOfCopies>1?true:false,
    })
    .then(data=>{
        res.status(200).json({data});
    })
    .catch(error=>{
        next(error);
    })
    
}

exports.updateClass=(req,res,next)=>{
    let id = req.params.id||req.body.id // Get ID from body or params
    BookSchema.findOne({_id:id})
    .then(data=>{
        if (!data) throw new Error("Not Valid Book ID");

        let avilable = true;
        if (req.body.NoOfCopies){
            // if copy = one copy so no one can borrow it
            // if all copies are borrowed so no one can borrow until one copy is speared 
            if (req.body.NoOfCopies<=1 || req.body.NoOfCopies - data.borrowedCopies <=1)
                avilable = false
        }



        return BookSchema.updateOne({
            _id:id,
        },{
            title: req.body.title,
            auther: req.body.auther,
            publisher: req.body.publisher,
            Category: req.body.Category,
            PublishingDate: req.body.PublishingDate,
            Edition: req.body.Edition,
            NoOfCopies: req.body.NoOfCopies,
            shelfNo: req.body.shelfNo,
            Avilable: avilable,
        })
    })
    .then(data=>{
        return BookSchema.findOne({_id:id})
    })
    .then(data=>{
        res.status(200).json({data});
    })
    .catch(error=>{
        next(error);
    })
    
}

