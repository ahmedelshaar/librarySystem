const mongoose = require("mongoose");
require("../models/bookSchema");
require("../models/memberModel");
require("../models/managersModel");

const BookSchema = mongoose.model("books");
const LogSchema = mongoose.model("logs");
const MemberSchema = mongoose.model("members");
const EmpSchema = mongoose.model("managers");
const bookApi = require("../services/bookAPI");

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
	let id = req.params.id || req.body.id; // Get ID from body or params
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
	let id = req.params.id || req.body.id; // Get ID from body or params
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
		Category: req.body.Category,
		PublishingDate: req.body.PublishingDate,
		pages: req.body.pages,
		Edition: req.body.Edition,
		NoOfCopies: req.body.NoOfCopies,
		shelfNo: req.body.shelfNo,
		Avilable: req.body.NoOfCopies, // First time to be add the avaibale is same as number of copies and 0 borrowedCopies
	})
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
};

exports.updateBook = (req, res, next) => {
	let id = req.params.id || req.body.id; // Get ID from body or params
	BookSchema.findOne({ _id: id })
		.then((data) => {
			if (!data) throw new Error("Not Valid Book ID");

			// if editing NoOfCopies
			// changing availabe count
			if (req.body.NoOfCopies)
				// the diff between the request copies count and current copies is add to the current available
				// current available is NoOfCopies - borrowedCopies - ReadingCopies[From Log]
				req.body.Avilable = data.Avilable + (req.body.NoOfCopies - data.NoOfCopies);
			return BookSchema.updateOne(
				{
					_id: id,
				},
				{
					// working without $set :D
					title: req.body.title,
					author: req.body.author,
					publisher: req.body.publisher,
					Category: req.body.Category,
					PublishingDate: req.body.PublishingDate,
					pages: req.body.pages,
					Edition: req.body.Edition,
					NoOfCopies: req.body.NoOfCopies,
					shelfNo: req.body.shelfNo,
					Avilable: req.body.Avilable,
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

exports.getBooksByAuthor = (request, response, next) => {
	bookApi.getBookByAuthor(request.params.authorName);
	console.log(request.params.authorName);
};

// to be improved
exports.borrowBook = (req, res, next) => {
	// to be continued
	// 1 if member is borrowing same book
	// 
	// 2 count reading books from log then add the rest to available
	// 3 check if book is available
	// 4 check if member is exist
	


	let member_id = req.body.member_id
	let book_id = req.body.book_id
	let expectedDate = req.body.expectedDate
	MemberSchema.findOne({_id:member_id},{_id:1})
	.then((data) => {
		if (!data) throw new Error("member is not found");
		// console.log(data);
		return BookSchema.findOne({_id:book_id},{_id:1,Avilable:1})
	})
	.then((data) => {
		if (!data) throw new Error("book is not found");
		// console.log(data);
		// console.log(data.Avilable > 1 , (data.Avilable == 1 && data.NoOfCopies-data.borrowedCopies>=2));
		if (data.Avilable > 1 
			||  
			(data.Avilable == 1 && data.NoOfCopies-data.borrowedCopies>=2) 
			){
				// check if member is borrowing same book
				return LogSchema.findOne(
					{
						member:member_id,
						book:book_id,
						status:"borrow",
						returned_date:"", // No return Date yet
					}
					,{_id:1})		
			}
		else{
			throw new Error("no book available to borrow this momment.")
		}
	})
	.then(data=>{
		if (data) throw new Error("member is borrowing this book already");
		return LogSchema.create(
			{
				member:member_id,
				book:book_id,
				emp:req.id,
				status:"borrow",
				expected_date:expectedDate,
			}
			)
	})
	.then(data=>{
		return BookSchema.updateMany({_id:book_id},{$inc:{Avilable:-1,borrowedCopies:1}})
	})
	.then(data=>{
		return BookSchema.findOne({_id:book_id},{_id:0,Avilable:1})
	})
	.then(data=>{
		res.status(200).json({ data:"success",Avilable:data.Avilable });
	})
	.catch((error) => { 
		next(error);
	}
	)
}

// to be improved
exports.returnBorrowedBook = (req, res, next) => {
	let member_id = req.body.member_id
	let book_id = req.body.book_id
	MemberSchema.findOne({_id:member_id},{_id:1})
	.then((data) => {
		if (!data) throw new Error("member is not found");
		// console.log(data);
		return BookSchema.findOne({_id:book_id},{_id:1,Avilable:1})
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
		if (data.modifiedCount == 0) throw new Error("no books currenty borrowed to this member");
		return BookSchema.updateMany({_id:book_id},{$inc:{Avilable:1,borrowedCopies:-1}})
	})
	.then(data=>{
		return BookSchema.findOne({_id:book_id},{_id:0,Avilable:1})
	})
	.then(data=>{
		res.status(200).json({ data:"success",Avilable:data.Avilable });
	})
	.catch((error) => { 
		next(error);
	}
	)
}

// return borrow
// check if return date is larger than now
// ban for one week