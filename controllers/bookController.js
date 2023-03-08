const mongoose = require("mongoose");
require("../models/bookSchema");

const BookSchema = mongoose.model("books");

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
