const moment = require('moment');
const mongoose = require('mongoose');

require('../models/bookSchema');
require('../models/memberModel');
require('../models/managersModel');

const BookSchema = mongoose.model('books');
const LogSchema = mongoose.model('logs');
const MemberSchema = mongoose.model('members');

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
			if (!data) throw new Error('Not Valid Book ID');

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
	BookSchema.find({ author: req.params.name }, { __v: 0, createdAt: 0, updatedAt: 0 })
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			return null;
		});
};

exports.getBooksByPublisher = (req, res, next) => {
	BookSchema.find({ publisher: req.params.name }, { __v: 0, createdAt: 0, updatedAt: 0 })
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			return null;
		});
};

exports.getBooksByTitle = (req, res, next) => {
	BookSchema.find({ title: req.params.name }, { __v: 0, createdAt: 0, updatedAt: 0 })
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			return null;
		});
};

exports.getAvailableBooks = (req, res, next) => {
	BookSchema.find({ available: { $gte: 1 } }, { __v: 0, createdAt: 0, updatedAt: 0 })
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			return null;
		});
};

exports.getBorrowingBooks = (req, res, next) => {
	LogSchema.find({ status: 'borrow', returned_date: '' }, { __v: 0, createdAt: 0, updatedAt: 0 })
		// .populate({path:"member",select:{full_name:1}})
		.populate('member', 'full_name')
		.populate('book', 'title')
		// .populate({path:"managers",select:{firstName:1,lastName:1}})
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			return null;
		});
};

exports.getLateBooks = (req, res, next) => {
	let today = new Date(Date.now()).toISOString().split('T')[0];
	// let today = new Date("2025-01-01").toISOString().split("T")[0]
	LogSchema.find(
		{ status: 'borrow', returned_date: '', expected_date: { $lt: today } },
		{ __v: 0, createdAt: 0, updatedAt: 0 }
	)
		// .populate({path:"member",select:{full_name:1}})
		.populate('member emp book', 'full_name title firstName lastName')
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((error) => {
			return null;
		});
};

exports.getNewBooks = (req, res, next) => {
	// let OneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
	let OneMonthAgo = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0];
	// bigger of [last login || 30 days ago] for member
	if (req.role && req.role == "member" && req.lastLogin && Number(req.lastLogin) < new Date(OneMonthAgo).getTime())
		OneMonthAgo = req.lastLogin;
	BookSchema.find({ createdAt: { $gte: OneMonthAgo } }, { __v: 0, createdAt: 0, updatedAt: 0 })
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
	let today = new Date(Date.now()).toISOString().split('T')[0];
	// Check for Late Book reading
	LogSchema.find({ book: book_id, status: 'read', returned_date: '', createdAt: { $lte: today } })
		.then((data) => {
			if (!data.length) return { modifiedCount: 0 };

			return LogSchema.updateMany(
				{ book: book_id, status: 'read', returned_date: '', createdAt: { $lte: today } },
				{ returned_date: Date.now() }
			);
		})
		.then((data) => {
			if (!data.modifiedCount) return true;

			return BookSchema.updateMany({ _id: book_id }, { $inc: { available: data.modifiedCount } });
		})
		.then((data) => {
			return MemberSchema.findOne({ _id: member_id }, { _id: 1 });
		})
		// MemberSchema.findOne({ _id: member_id }, { _id: 1 })
		.then((data) => {
			if (!data) throw new Error('member is not found');
			// console.log(data);
			return BookSchema.findOne({ _id: book_id }, { _id: 1, available: 1 });
		})
		.then((data) => {
			if (!data) throw new Error('book is not found');
			// console.log(data);
			// console.log(data.available > 1 , (data.available == 1 && data.noOfCopies-data.borrowedCopies>=2));
			if (data.available > 1 || (data.available == 1 && data.noOfCopies - data.borrowedCopies >= 2)) {
				// check if member is borrowing same book
				return LogSchema.findOne(
					{
						member: member_id,
						book: book_id,
						status: 'borrow',
						returned_date: '', // No return Date yet
					},
					{ _id: 1 }
				);
			} else {
				throw new Error('no book available to borrow this momment.');
			}
		})
		.then((data) => {
			if (data) throw new Error('member is borrowing this book already');
			return LogSchema.create({
				member: member_id,
				book: book_id,
				emp: req.id || 1,
				status: 'borrow',
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
			res.status(200).json({ data: 'success', available: data.available });
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
	let member_id = req.body.member_id;
	let book_id = req.body.book_id;
	MemberSchema.findOne({ _id: member_id }, { _id: 1 })
		.then((data) => {
			if (!data) throw new Error('member is not found');
			// console.log(data);
			return BookSchema.findOne({ _id: book_id }, { _id: 1, available: 1 });
		})
		.then((data) => {
			if (!data) throw new Error('book is not found');

			return LogSchema.findOne({
				member: member_id,
				book: book_id,
				status: 'borrow',
				returned_date: '', // No return Date yet
			})
		})
		.then((data)=>{
			if (!data) throw new Error('no books currenty borrowed to this member');
			// console.log(data)
			const expected_date = moment(data.expected_date);
			// console.log(expected_date)
			if (expected_date.isValid() && expected_date.isBefore(moment())) {
				console.log("baned until ",moment().add(7,'d').format('YYYY-MM-DD'),expected_date.format('YYYY-MM-DD'));
				return MemberSchema.updateOne({_id:member_id},{ban_date:moment().add(7,'d').format('YYYY-MM-DD')})
			}
			return true;
		})
		.then((data)=>{
			return LogSchema.updateMany(
				{
					member: member_id,
					book: book_id,
					status: 'borrow',
					returned_date: '', // No return Date yet
				},
				{ returned_date: Date.now() }
			);
		})
		.then((data) => {
			// console.log(data);
			if (data.modifiedCount == 0) throw new Error('no books currenty borrowed to this member');
			return BookSchema.updateMany({ _id: book_id }, { $inc: { available: 1, borrowedCopies: -1 } });
		})
		.then((data) => {
			return BookSchema.findOne({ _id: book_id }, { _id: 0, available: 1 });
		})
		.then((data) => {
			res.status(200).json({ data: 'success', available: data.available });
		})
		.catch((error) => {
			next(error);
		});
};

exports.readBook = (req, res, next) => {
	let member_id = req.body.member_id;
	let book_id = req.body.book_id;
	MemberSchema.findOne({ _id: member_id }, { _id: 1 })
		.then((data) => {
			if (!data) throw new Error('member is not found');
			return BookSchema.findOne({ _id: book_id }, { _id: 1, available: 1 });
		})
		.then((data) => {
			if (!data) throw new Error('book is not found');
			if (data.available >= 1) {
				// check if member is reading same book
				return LogSchema.findOne(
					{
						member: member_id,
						book: book_id,
						status: 'read',
						returned_date: '', // No return Date yet
					},
					{ _id: 1 }
				);
			} else {
				throw new Error('no book available to read this momment.');
			}
		})
		.then((data) => {
			if (data) throw new Error('member is reading this book already');
			return LogSchema.create({
				member: member_id,
				book: book_id,
				emp: req.id,
				status: 'read',
			});
		})
		.then((data) => {
			return BookSchema.updateMany({ _id: book_id }, { $inc: { available: -1 } });
		})
		.then((data) => {
			return BookSchema.findOne({ _id: book_id }, { _id: 0, available: 1 });
		})
		.then((data) => {
			res.status(200).json({ data: 'success', available: data.available });
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
			if (!data) throw new Error('member is not found');
			return BookSchema.findOne({ _id: book_id }, { _id: 1, available: 1 });
		})
		.then((data) => {
			if (!data) throw new Error('book is not found');
			return LogSchema.updateMany(
				{
					member: member_id,
					book: book_id,
					status: 'read',
					returned_date: '', // No return Date yet
				},
				{ returned_date: Date.now() }
			);
		})
		.then((data) => {
			if (data.modifiedCount == 0) throw new Error(' not book reading for this member right now');
			return BookSchema.updateMany({ _id: book_id }, { $inc: { available: 1 } });
		})
		.then((data) => {
			return BookSchema.findOne({ _id: book_id }, { _id: 0, available: 1 });
		})
		.then((data) => {
			res.status(200).json({ data: 'success', available: data.available });
		})
		.catch((error) => {
			next(error);
		});
};

exports.currentBorrowedBooks = (req, res, next) => {
	LogSchema.aggregate([
		{
			$match: {
				status: 'borrow',
				member: req.id || 2,
			},
		},
		{
			$lookup: {
				from: 'books',
				localField: 'book',
				foreignField: '_id',
				as: 'book_details',
			},
		},
		{
			$lookup: {
				from: 'members',
				localField: 'member',
				foreignField: '_id',
				as: 'member_details',
			},
		},
		{
			$lookup: {
				from: 'managers',
				localField: 'emp',
				foreignField: '_id',
				as: 'employee_details',
			},
		},

		{
			$project: {
				_id: 0,
				status: 1,
				createdAt: 1,
        		expected_date:1,
				book_details: { _id: 1, title: 1 },
				member_details: { _id: 1, full_name: 1 },
				employee_details: { _id: 1, firstName: 1 },
				returned_date: 1,
				isLAte: {
					$cond: {
						if: { $gt: ['$expected_date', "$returned_date"] },
						then: false,
						else: true,
					},
				},
			},
		},
		{
			$group: {
				_id: '$book_details.title',
        		number_of_borrowed:{$sum:1},
				book_details: { $push: '$$ROOT' },
			},
		}
	])
		.then((data) => {
			res.json({ data });
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.searchBooks = (req,res,next)=>{
  const permittedQueries = ["category","publisher","author","available","year"];
  let findBy = {};
//   console.log(req.query);
  Object.keys(req.query).forEach(key => {
    if (permittedQueries.includes(key) && req.query[key])
      findBy[key] = req.query[key];
  });
  
  if (findBy.year){
    
    findBy.publishingDate = {
      $lt:new Date(new Date(`${Number(findBy.year)+1}-01-01`)).toISOString().split("T")[0],
      $gte:new Date(new Date(`${findBy.year}-01-01`)).toISOString().split("T")[0]
    }
    delete findBy['year'];
  }
//   console.log(findBy);
  BookSchema.find(findBy).then(data=>{
    res.status(200).json({data});
  })
  .catch(error=>{
      next(error);
  })  
};



exports.mostBorrowedBooks = (req,res,next)=>{
	let condition = {
		status: 'borrow',
	}
	if (req.params && Number(req.params.year)){
    
		condition.createdAt = {
			// $lt:new Date(new Date(new Date(`${Number(req.params.year)+1}-01-01`)).toISOString().split("T")[0]),
			// $gte:new Date(new Date(new Date(`${req.params.year}-01-01`)).toISOString().split("T")[0])
		  	 $lt:new Date(new Date(`${Number(req.params.year)+1}-01-01`)),
		 	 $gte:new Date(new Date(`${Number(req.params.year)}-01-01`)),
		  
		}
	  }
	// console.log(condition);
	LogSchema.aggregate([
		{
			$match: condition
		},
		{
			$group: {
				_id: '$book',
				count:{$sum:1},
			},
		},
		{
			$limit:10
		},
		{
			$sort:{
				count:-1
			}
		},
		{
			$lookup: {
				from: 'books',
				localField: '_id',
				foreignField: '_id',
				as: 'book',
			},
		},
		{
			$project: {
				_id:1,
				count:1,
				book: { title: 1,category:1 ,author:1,publisher:1,publishingDate:1,edition:1},
			}
		}
	]).then(data=>{
		res.status(200).json({data});
	})
	.catch(error=>{
		next(error);
	})	
};

exports.mostReadingBooks = (req,res,next)=>{
	let condition = {
		status: 'read',
	}
	if (req.params && Number(req.params.year)){
    
		condition.createdAt = {
		//   $lt:new Date(new Date(`${Number(req.params.year)+1}-01-01`)).toISOString().split("T")[0],
		//   $gte:new Date(new Date(`${req.params.year}-01-01`)).toISOString().split("T")[0]
		 	 $lt:new Date(new Date(`${Number(req.params.year)+1}-01-01`)),
		 	 $gte:new Date(new Date(`${Number(req.params.year)}-01-01`)),
		}
	  }
	// console.log(condition);
	LogSchema.aggregate([
		{
			$match: condition
		},
		{
			$group: {
				_id: '$book',
				count:{$sum:1},
			},
		},
		{
			$limit:10
		},
		{
			$sort:{
				count:-1
			}
		},
		{
			$lookup: {
				from: 'books',
				localField: '_id',
				foreignField: '_id',
				as: 'book',
			},
		},
		{
			$project: {
				_id:1,
				count:1,
				book: { title: 1,category:1 ,author:1,publisher:1,publishingDate:1,edition:1},
			}
		}
	]).then(data=>{
		res.status(200).json({data});
	})
	.catch(error=>{
		next(error);
	})	
};

// need to add months filter thou
exports.memberBorrowedBooks = (req,res,next)=>{
	let condition = {
		status: 'borrow',
		member:req.id||1,
		createdAt: {
			// 1st of next month
			$lt:new Date(new Date(new Date().toISOString().split("T")[0].split("-")[0]).setMonth(new Date().getMonth()+1)),
			// 1st of this month
			$gte:new Date(new Date(new Date().toISOString().split("T")[0].split("-")[0]).setMonth(new Date().getMonth())),
		}
	}

	if (req.params && Number(req.params.year)){
		condition.createdAt = {
			// $lt:new Date(new Date(new Date(`${Number(req.params.year)+1}-01-01`)).toISOString().split("T")[0]),
			// $gte:new Date(new Date(new Date(`${req.params.year}-01-01`)).toISOString().split("T")[0])
		  	 $lt:new Date(new Date(`${Number(req.params.year)+1}-01-01`)),
		 	 $gte:new Date(new Date(`${Number(req.params.year)}-01-01`)),
		}
	}
	console.log(condition);
	LogSchema.aggregate([
		{
			$match:condition
		},
		{
			$group: {
				_id: '$book',
				count:{$sum:1},
			}
		},
		{
			$lookup: {
				from: 'books',
				localField: '_id',
				foreignField: '_id',
				as: 'book',
			},
		},
		{
			$project: {
				_id:1,
				count:1,
				book: { title: 1,category:1 ,author:1,publisher:1,publishingDate:1,edition:1},
			}
		}
		
	
	]).then(data=>{
		res.status(200).json({data});
	})
	.catch(error=>{
		next(error);
	})	
};

// need to add months filter thou
exports.memberReadingBooks = (req,res,next)=>{
	let condition = {
		status: 'read',
		member:req.id||1,
		createdAt: {
			// 1st of next month
			$lt:new Date(new Date(new Date().toISOString().split("T")[0].split("-")[0]).setMonth(new Date().getMonth()+1)),
			// 1st of this month
			$gte:new Date(new Date(new Date().toISOString().split("T")[0].split("-")[0]).setMonth(new Date().getMonth())),
		}
	}

	if (req.params && Number(req.params.year)){
		condition.createdAt = {
			// $lt:new Date(new Date(new Date(`${Number(req.params.year)+1}-01-01`)).toISOString().split("T")[0]),
			// $gte:new Date(new Date(new Date(`${req.params.year}-01-01`)).toISOString().split("T")[0])
		  	 $lt:new Date(new Date(`${Number(req.params.year)+1}-01-01`)),
		 	 $gte:new Date(new Date(`${Number(req.params.year)}-01-01`)),
		}
	}
	console.log(condition);
	LogSchema.aggregate([
		{
			$match:condition
		},
		{
			$group: {
				_id: '$book',
				count:{$sum:1},
			}
		},
		{
			$lookup: {
				from: 'books',
				localField: '_id',
				foreignField: '_id',
				as: 'book',
			},
		},
		{
			$project: {
				_id:1,
				count:1,
				book: { title: 1,category:1 ,author:1,publisher:1,publishingDate:1,edition:1},
			}
		}
		
	
	]).then(data=>{
		res.status(200).json({data});
	})
	.catch(error=>{
		next(error);
	})	
};

