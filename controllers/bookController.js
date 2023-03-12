const mongoose = require("mongoose");
require("../models/bookSchema");
require("../models/memberModel");
require("../models/managersModel");

const BookSchema = mongoose.model("books");
const LogSchema = mongoose.model("logs");
const MemberSchema = mongoose.model("members");
// const EmpSchema = mongoose.model("managers");
// const bookApi = require("../services/bookAPI");

// Fetch all Books
exports.getAllBooks = (req, res, next) => {
  BookSchema.find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

//---------------- Single Book Requets

// Get Book By ID
exports.getBookByID = (req, res, next) => {
  let id = req.params.id;
  BookSchema.findOne({ _id: id })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

// Delete Book By ID
exports.deleteBook = (req, res, next) => {
  let id = req.params.id;
  BookSchema.deleteOne({ _id: id })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

// Add new Book
exports.addBook = (req, res, next) => {
  // console.log(req.body);
  BookSchema.create({
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    category: req.body.category,
    publishingDate: req.body.publishingDate,
    pages: req.body.pages,
    edition: req.body.edition,
    noOfCopies: req.body.noOfCopies,
    shelfNo: req.body.shelfNo,
    available: req.body.noOfCopies, // First time to be add the avaibale is same as number of copies and 0 borrowedCopies
  })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateBook = (req, res, next) => {
  let id = req.params.id;
  BookSchema.findOne({ _id: id })
    .then((data) => {
      if (!data) throw new Error("Not Valid Book ID");

      // if editing noOfCopies
      // changing availabe count
      if (req.body.noOfCopies)
        // the diff between the request copies count and current copies is add to the current available
        // current available is noOfCopies - borrowedCopies - ReadingCopies[From Log]
        req.body.available = data.available + (req.body.noOfCopies - data.noOfCopies);
      return BookSchema.updateOne(
        {
          _id: id,
        },
        {
          // working without $set :D
          title: req.body.title,
          author: req.body.author,
          publisher: req.body.publisher,
          category: req.body.category,
          publishingDate: req.body.publishingDate,
          pages: req.body.pages,
          edition: req.body.edition,
          noOfCopies: req.body.noOfCopies,
          shelfNo: req.body.shelfNo,
          available: req.body.available,
        }
      );
    })
    .then((data) => {
      return BookSchema.findOne({ _id: id });
    })
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getBooksByAuthor = (req, res, next) => {
  // BookSchema.find({ author: req.params.name },{title:1,publisher:1,available:1,borrowedCopies:1,noOfCopies:1,author:1})
  BookSchema.find({ author: req.params.name },{__v:0,createdAt:0,updatedAt:0})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      return null;
    });
};

exports.getBooksByPublisher = (req, res, next) => {
  BookSchema.find({ publisher: req.params.name },{__v:0,createdAt:0,updatedAt:0})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      return null;
    });
};
exports.getBooksByTitle = (req, res, next) => {
  BookSchema.find({ title: req.params.name },{__v:0,createdAt:0,updatedAt:0})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      return null;
    });
};
exports.getAvailableBooks = (req, res, next) => {
  BookSchema.find({ available: {$gte:1} },{__v:0,createdAt:0,updatedAt:0})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      return null;
    });
};
exports.getBorrowingBooks = (req, res, next) => {
	LogSchema.find({ status:"borrow",returned_date:"" },{__v:0,createdAt:0,updatedAt:0})
	// .populate({path:"member",select:{full_name:1}})
	.populate('member','full_name')
	.populate('book','title')
	// .populate({path:"managers",select:{firstName:1,lastName:1}})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      return null;
    });
};
exports.getLateBooks = (req, res, next) => {
	let today = new Date(Date.now()).toISOString().split("T")[0]
	// let today = new Date("2025-01-01").toISOString().split("T")[0]
	LogSchema.find({ status:"borrow",returned_date:"",expected_date:{$lt:today} },{__v:0,createdAt:0,updatedAt:0})
	// .populate({path:"member",select:{full_name:1}})
	.populate('member emp book','full_name title firstName lastName')
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      return null;
    });
};
exports.getNewBooks = (req, res, next) => {
	// let OneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
	let OneMonthAgo = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0];
	// bigger of [last login || 30 days ago] for user
	BookSchema.find({ createdAt: {$gte:OneMonthAgo} },{__v:0,createdAt:0,updatedAt:0})
	  .then((data) => {
		res.status(200).json({ data });
	  })
	  .catch((error) => {
		return null;
	  });
  };


// to be improved
exports.borrowBook = (req, res, next) => {
	// Happy scenario
  // 1 count reading books from log then add the rest to available if no return date until today
  // 2 check if the member is valid
  // 3 check if the book is valid
  // 4 check if the book is available
  // 5 check if the member is borrowing the same book
  // 6 send the log transaction 
  // 7 update the book available and borrowed count
  // 8 return the available count and success respond
  
	let member_id = req.body.member_id;
	let book_id = req.body.book_id;
	let expectedDate = req.body.expectedDate;
	let today = new Date(Date.now()).toISOString().split("T")[0];
	// Check for Late Book reading
	LogSchema.find({book:book_id,status:"read",returned_date: "",createdAt:{$lte:today}})
	.then(data=>{
		if (!data.length) return {modifiedCount:0};
		
		return LogSchema.updateMany(
			{book:book_id,status:"read",returned_date: "",createdAt:{$lte:today}}
			,{returned_date:Date.now()}
		)
	})
	.then(data=>{
		if (!data.modifiedCount) return true

		return BookSchema.updateMany({ _id: book_id },{$inc:{available:data.modifiedCount}});
	}).then(data=>{
	return MemberSchema.findOne({ _id: member_id }, { _id: 1 })
	})
	// MemberSchema.findOne({ _id: member_id }, { _id: 1 })
    .then((data) => {
      if (!data) throw new Error("member is not found");
      // console.log(data);
      return BookSchema.findOne({ _id: book_id }, { _id: 1, available: 1 });
    })
    .then((data) => {
      if (!data) throw new Error("book is not found");
      // console.log(data);
      // console.log(data.available > 1 , (data.available == 1 && data.noOfCopies-data.borrowedCopies>=2));
      if (data.available > 1 || (data.available == 1 && data.noOfCopies - data.borrowedCopies >= 2)) {
        // check if member is borrowing same book
        return LogSchema.findOne(
          {
            member: member_id,
            book: book_id,
            status: "borrow",
            returned_date: "", // No return Date yet
          },
          { _id: 1 }
        );
      } else {
        throw new Error("no book available to borrow this momment.");
      }
    })
    .then((data) => {
      if (data) throw new Error("member is borrowing this book already");
      return LogSchema.create({
        member: member_id,
        book: book_id,
        emp: req.id||1,
        status: "borrow",
        expected_date: expectedDate,
      });
    })
    .then((data) => {
      return BookSchema.updateMany({ _id: book_id }, { $inc: { available: -1, borrowedCopies: 1 } });
    })
    .then((data) => {
      return BookSchema.findOne({ _id: book_id }, { _id: 0, available: 1 });
    })
    .then((data) => {
      res.status(200).json({ data: "success", available: data.available });
    })
    .catch((error) => {
      next(error);
    });
};

// to be improved
// return borrow
// check if return date is larger than now
// ban for one week
exports.returnBorrowedBook = (req, res, next) => {
	let member_id = req.body.member_id
	let book_id = req.body.book_id
	MemberSchema.findOne({_id:member_id},{_id:1})
	.then((data) => {
		if (!data) throw new Error("member is not found");
		// console.log(data);
		return BookSchema.findOne({_id:book_id},{_id:1,available:1})
	})
	.then((data) => {
		if (!data) throw new Error("book is not found");
		return LogSchema.updateMany(
			{
				member:member_id,
				book:book_id,
				status:"borrow",
				returned_date:"", // No return Date yet
			},{returned_date:Date.now()}
			)
	})
	.then(data=>{
    // console.log(data);
		if (data.modifiedCount == 0) throw new Error("no books currenty borrowed to this member");
		return BookSchema.updateMany({_id:book_id},{$inc:{available:1,borrowedCopies:-1}})
	})
	.then(data=>{
		return BookSchema.findOne({_id:book_id},{_id:0,available:1})
	})
	.then(data=>{
		res.status(200).json({ data:"success",available:data.available });
	})
	.catch((error) => { 
		next(error);
	}
	)
}


exports.readBook = (req, res, next) => {
  let member_id = req.body.member_id;
  let book_id = req.body.book_id;
  MemberSchema.findOne({ _id: member_id }, { _id: 1 })
    .then((data) => {
      if (!data) throw new Error("member is not found");
      return BookSchema.findOne({ _id: book_id }, { _id: 1, available: 1 });
    })
    .then((data) => {
      if (!data) throw new Error("book is not found");
      if (data.available >= 1) {
        // check if member is reading same book
        return LogSchema.findOne(
          {
            member: member_id,
            book: book_id,
            status: "read",
            returned_date: "", // No return Date yet
          },
          { _id: 1 }
        );
      } else {
        throw new Error("no book available to read this momment.");
      }
    })
    .then((data) => {
      if (data) throw new Error("member is reading this book already");
      return LogSchema.create({
        member: member_id,
        book: book_id,
        emp: req.id,
        status: "read",
      });
    })
    .then((data) => {
      return BookSchema.updateMany({ _id: book_id }, { $inc: { available: -1 } });
    })
    .then((data) => {
      return BookSchema.findOne({ _id: book_id }, { _id: 0, available: 1 });
    })
    .then((data) => {
      res.status(200).json({ data: "success", available: data.available });
    })
    .catch((error) => {
      next(error);
    });
};
exports.returnReadedBook = (req, res, next) => {
  let member_id = req.body.member_id;
  let book_id = req.body.book_id;
  MemberSchema.findOne({ _id: member_id }, { _id: 1 })
    .then((data) => {
      if (!data) throw new Error("member is not found");
      return BookSchema.findOne({ _id: book_id }, { _id: 1, available: 1 });
    })
    .then((data) => {
      if (!data) throw new Error("book is not found");
      return LogSchema.updateMany(
        {
          member: member_id,
          book: book_id,
          status: "read",
          returned_date: "", // No return Date yet
        },
        { returned_date: Date.now() }
      );
    })
    .then((data) => {
      if (data.modifiedCount == 0) throw new Error(" not book reading for this member right now");
      return BookSchema.updateMany({ _id: book_id }, { $inc: { available: 1 } });
    })
    .then((data) => {
      return BookSchema.findOne({ _id: book_id }, { _id: 0, available: 1 });
    })
    .then((data) => {
      res.status(200).json({ data: "success", available: data.available });
    })
    .catch((error) => {
      next(error);
    });
};
exports.currentBorrowedBooks = (req,res,next)=>{
	LogSchema.find({status:"borrow",returned_date:"",member:req.id},{__v:0,createdAt:0,updatedAt:0})
	.populate('member emp book','full_name title firstName lastName')
		.then(data=>{
			res.status(200).json({data:data})
		})
		.catch(error=>{
			next(error)
		})

};
exports.searchBooks = (req,res,next)=>{
  const permittedQueries = ["category","publisher","author","available","year"];
  let findBy = {};
  console.log(req.query);
  Object.keys(req.query).forEach(key => {
    if (permittedQueries.includes(key))
      findBy[key] = req.query[key];
  });
  console.log(findBy);
  BookSchema.find(findBy).then(data=>{
    res.status(200).json({data});
  })
  .catch(error=>{
      next(error);
  })
  
	}









// Do it
exports.getMemberBorrowedBooks = (req, res, next) => {

	LogSchema.aggregate([
		{
		  $match: {
			'status': {$eq: "borrow"}
		  }
		},
		{
		  /* group by year and month of the subscription event */
		  $group: {
			_id: {
			  year: {
				$year: '$createdAt'
			  },
			  month: {
				$month: '$createdAt'
			  }
			},
		  }
		},
		{
		  $sort: {
			'_id.year': -1,
			'_id.month': -1
		  }
		},
		{
		  $limit: 10,
		},
	  ])

}
