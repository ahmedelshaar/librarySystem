/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - publisher
 *         - category
 *         - publishingDate
 *         - pages
 *         - edition
 *         - noOfCopies
 *         - shelfNo
 *         - available
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         publisher:
 *           type: string
 *           description: The publisher of the book
 *         category:
 *           type: string
 *           description: The category of the book
 *         publishingDate:
 *           type: string
 *           format: date
 *           description: The publishing date of the book
 *         pages:
 *           type: integer
 *           description: The number of pages in the book
 *         edition:
 *           type: integer
 *           description: The edition of the book
 *         noOfCopies:
 *           type: integer
 *           description: The number of copies of the book
 *         shelfNo:
 *           type: string
 *           description: The shelf number of the book
 *         available:
 *           type: integer
 *           description: The number of available copies of the book
 *       example:
 *         title: The Alchemist
 *         author: Paulo Coelho
 *         publisher: HarperCollins
 *         category: Fiction
 *         publishingDate: 1988-01-01
 *         pages: 208
 *         edition: 25
 *         noOfCopies: 5
 *         shelfNo: FIC-01
 *         available: 3
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *         member:
 *           type: number
 *         book:
 *           type: number
 *         emp:
 *           type: number
 *         status:
 *           type: string
 *           enum:
 *             - read
 *             - borrow
 *         returned_date:
 *           type: string
 *           format: date-time
 *         expected_date:
 *           type: string
 *           format: date-time
 *       required:
 *         - member
 *         - book
 *         - status
 */



// reports
/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Get log data for a given day
 *     tags: [Reports]
 *     description: Retrieve log data for a specific day
 *     parameters:
 *       - in: query
 *         name: day
 *         required: false
 *         description: "The day for which to retrieve log data (format: YYYY-MM-DD)"
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON object containing the log data for the specified day
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: An array of log data objects
 *                   items:
 *                     type: object
 *                     properties:
 *                       member:
 *                         type: object
 *                         description: The member associated with the log entry
 *                         properties:
 *                           full_name:
 *                             type: string
 *                             description: The full name of the member
 *                           title:
 *                             type: string
 *                             description: The title of the member
 *                       emp:
 *                         type: object
 *                         description: The employee associated with the log entry
 *                         properties:
 *                           firstName:
 *                             type: string
 *                             description: The first name of the book author
 *                           lastName:
 *                             type: string
 *                             description: The last name of the book author
 *                       book:
 *                         type: object
 *                         description: The book associated with the log entry
 *                         properties:
 *                           title:
 *                             type: string
 *                             description: The title of the book
 *                           
 *         examples:
 *           application/json:
 *             data:
 *               - member:
 *                   full_name: John Smith
 *                   title: Manager
 *                 emp:
 *                   full_name: Jane Doe
 *                 book:
 *                   title: The Catcher in the Rye
 *                   firstName: J.D.
 *                   lastName: Salinger
 *               - member:
 *                   full_name: Mary Johnson
 *                   title: Assistant Manager
 *                 emp:
 *                   full_name: Jack Brown
 *                 book:
 *                   title: To Kill a Mockingbird
 *                   firstName: Harper
 *                   lastName: Lee
 *       '400':
 *         description: Bad request error
 *       '500':
 *         description: Internal server error
 */

// books get all
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     description: Retrieve a list of all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the book
 *                       title:
 *                         type: string
 *                         description: The title of the book
 *                       author:
 *                         type: string
 *                         description: The author of the book
 *                       genre:
 *                         type: string
 *                         description: The genre of the book
 *                       published:
 *                         type: string
 *                         description: The publication date of the book
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time the book was created
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time the book was last updated
 *       500:
 *         description: Server error
 */
// books add one
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a book
 *     tags: [Books]
 *     description: Add a new book to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book.
 *               author:
 *                 type: string
 *                 description: The author of the book.
 *               publisher:
 *                 type: string
 *                 description: The publisher of the book.
 *               category:
 *                 type: string
 *                 description: The category of the book.
 *               publishingDate:
 *                 type: string
 *                 format: date
 *                 description: The publishing date of the book.
 *               pages:
 *                 type: number
 *                 description: The number of pages in the book.
 *               edition:
 *                 type: string
 *                 description: The edition of the book.
 *               noOfCopies:
 *                 type: number
 *                 description: The number of copies of the book.
 *               shelfNo:
 *                 type: string
 *                 description: The shelf number of the book.
 *             example:
 *               title: The Alchemist
 *               author: Paulo Coelho
 *               publisher: HarperOne
 *               category: Fiction
 *               publishingDate: 1988-01-01
 *               pages: 197
 *               edition: 1st
 *               noOfCopies: 10
 *               shelfNo: A001
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal Server Error
 */

// books get one
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     description: Retrieve a book from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the book to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: number
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     description:
 *                       type: string
 *                     publication_date:
 *                       type: string
 *                     genres:
 *                       type: array
 *                       items:
 *                         type: string
 *                     rating:
 *                       type: number
 *                   example:
 *                     _id: 1
 *                     title: The Hitchhiker's Guide to the Galaxy
 *                     author: Douglas Adams
 *                     description: A comedic science fiction series
 *                     publication_date: 1979-10-12
 *                     genres: [Comedy, Science Fiction]
 *                     rating: 4.5
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */

// books update one
/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     description: Update a book in the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the book to update
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: book
 *         description: The book to update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             author:
 *               type: string
 *             publisher:
 *               type: string
 *             category:
 *               type: string
 *             publishingDate:
 *               type: string
 *               format: date
 *             pages:
 *               type: integer
 *             edition:
 *               type: string
 *             noOfCopies:
 *               type: integer
 *             shelfNo:
 *               type: string
 *             available:
 *               type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid Request
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */

// books delete one
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     description: Delete a book from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the book to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */

// book/auther
/**
 * @swagger
 * /books/author/{name}:
 *   get:
 *     summary: Get books by author
 *     tags: [Books Search]
 *     description: Retrieve books from the database by the name of the author.
 *     parameters:
 *       - in: path
 *         name: name
 *         description: Name of the author to retrieve books for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       404:
 *         description: No books found for the given author
 *       500:
 *         description: Internal Server Error
 */

// book/publisher
/**
 * @swagger
 * /books/publisher/{name}:
 *   get:
 *     summary: Get all books by publisher
 *     tags: [Books Search]
 *     description: Retrieve a list of books published by a specific publisher
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of the publisher to search for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of books published by the specified publisher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       '404':
 *         description: No books found for the specified publisher
 *       '500':
 *         description: Internal server error
 */

// book/title
/**
 * @swagger
 * /books/title/{name}:
 *   get:
 *     summary: Get books by title
 *     tags: [Books Search]
 *     description: Retrieve a list of books by their title
 *     parameters:
 *       - in: path
 *         name: name
 *         description: Title of the book
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of books matching the specified title
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */

// books/available
/**
 * @swagger
 * /books/available:
 *   get:
 *     summary: Get all available books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all available books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */

// books/borrowing
/**
 * @swagger
 * /books/borrowing:
 *   get:
 *     summary: Get a list of borrowed books.
 *     tags: [Books]
 *     description: Returns a list of all books that are currently borrowed and have not been returned yet.
 *     responses:
 *       200:
 *         description: A list of borrowed books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the borrowing record.
 *                   member:
 *                     type: object
 *                     description: The member who borrowed the book.
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the member.
 *                       full_name:
 *                         type: string
 *                         description: The full name of the member.
 *                   book:
 *                     type: object
 *                     description: The book that was borrowed.
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the book.
 *                       title:
 *                         type: string
 *                         description: The title of the book.
 *                   status:
 *                     type: string
 *                     description: The status of the borrowing record (should always be "borrow").
 *                   borrowed_date:
 *                     type: string
 *                     description: The date the book was borrowed.
 *                   due_date:
 *                     type: string
 *                     description: The date the book is due to be returned.
 */

// books/late
/**
 * @swagger
 *
 * /books/late:
 *   get:
 *     summary: Retrieve all late borrowed books
 *     tags: [Books]
 *     description: Retrieve all books that are currently borrowed and have passed their expected return date
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Log'
 */

// books/new
/**
 * @swagger
 * /books/new:
 *   get:
 *     summary: Retrieve new books added to the library in the last month.
 *     tags: [Books]
 *     description: This endpoint returns a list of new books added to the library in the last month. For members, it returns books added in the last month or since their last login, whichever is greater.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lastLogin
 *         in: query
 *         description: The last login timestamp of the member requesting the data.
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: A list of new books added to the library in the last month.
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error.
 */


// book/read/
/**
 * @swagger
 *
 * /books/read:
 *   post:
 *     summary: Read a book.
 *     tags: [Books]
 *     description: Read a book by a member.
 *     requestBody:
 *       description: Member ID and Book ID to read.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_id:
 *                 type: string
 *                 description: The ID of the member who is reading the book.
 *               book_id:
 *                 type: string
 *                 description: The ID of the book to be read.
 *             example:
 *               member_id: 61654f149dd560292cf38d3b
 *               book_id: 61654f149dd560292cf38d3c
 *     responses:
 *       '200':
 *         description: A JSON object with a success message and the number of available copies of the book after reading.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: A success message.
 *                   example: success
 *                 available:
 *                   type: number
 *                   description: The number of available copies of the book after reading.
 *                   example: 2
 *       '400':
 *         description: Bad request. Returned if the request body is missing required fields or has invalid field values.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *                   example: member is not found
 *       '500':
 *         description: Internal server error. Returned if an unexpected error occurs on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *                   example: Internal server error.
 */

// book/borrow/
/**
 * @swagger
 *
 * /books/borrow:
 *   post:
 *     summary: Borrow a book.
 *     tags: [Books]
 *     description: Borrow a book by a member.
 *     requestBody:
 *       description: Member ID and Book ID to borrow.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_id:
 *                 type: string
 *                 description: The ID of the member who is borrowing the book.
 *               book_id:
 *                 type: string
 *                 description: The ID of the book to be borrow.
 *             example:
 *               member_id: 61654f149dd560292cf38d3b
 *               book_id: 61654f149dd560292cf38d3c
 *     responses:
 *       '200':
 *         description: A JSON object with a success message and the number of available copies of the book after reading.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: A success message.
 *                   example: success
 *                 available:
 *                   type: number
 *                   description: The number of available copies of the book after borrowing.
 *                   example: 2
 *       '400':
 *         description: Bad request. Returned if the request body is missing required fields or has invalid field values.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *                   example: member is not found
 *       '500':
 *         description: Internal server error. Returned if an unexpected error occurs on the server.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: An error message.
 *                   example: Internal server error.
 */


// /books/borrow delete
/**
 * @swagger
 *  /books/borrow:
 *   delete:
 *     summary: Return borrowed book
 *     tags: [Books]
 *     description: Returns a book that was previously borrowed by a member
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_id:
 *                 type: string
 *                 description: ID of the member who borrowed the book
 *               book_id:
 *                 type: string
 *                 description: ID of the book that is being returned
 *             required:
 *               - member_id
 *               - book_id
 *     responses:
 *       200:
 *         description: Returns the success message and number of available copies of the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Success message
 *                 available:
 *                   type: integer
 *                   description: Number of available copies of the book after returning
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Member or Book not found, or no books currently borrowed to this member
 *       500:
 *         description: Internal Server Error
 */


/**
 * Returns a read book by a member and updates the book's availability and log.
 *
 * @swagger
 * /books/read:
 *   delete:
 *     summary: Returns a read book by a member and updates the book's availability and log.
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_id:
 *                 type: string
 *                 description: The ID of the member returning the book.
 *               book_id:
 *                 type: string
 *                 description: The ID of the book being returned.
 *             required:
 *               - member_id
 *               - book_id
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Success message
 *                 available:
 *                   type: number
 *                   description: The updated availability of the returned book.
 *       '400':
 *         description: Bad request error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       '404':
 *         description: Not found error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /books/history/borrowed/{year?}/{month?}:
 *   get:
 *     summary: Get a list of currently borrowed books by the authenticated member.
 *     tags: [Books For member Only]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of currently borrowed books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the book title.
 *                       number_of_borrowed:
 *                         type: number
 *                         description: The number of copies of the book that are currently borrowed.
 *                       book_details:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             status:
 *                               type: string
 *                               description: The status of the book (borrowed or read).
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               description: The date and time the book was borrowed or read.
 *                             expected_date:
 *                               type: string
 *                               format: date-time
 *                               description: The expected return date for the book.
 *                             book_details:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: number
 *                                   description: The ID of the book.
 *                                 title:
 *                                   type: string
 *                                   description: The title of the book.
 *                             member_details:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: number
 *                                   description: The ID of the member who borrowed or read the book.
 *                                 full_name:
 *                                   type: string
 *                                   description: The full name of the member who borrowed or read the book.
 *                             employee_details:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: number
 *                                   description: The ID of the employee responsible for the borrowing.
 *                                 firstName:
 *                                   type: string
 *                                   description: The first name of the employee responsible for the borrowing.
 *                             returned_date:
 *                               type: string
 *                               format: date-time
 *                               description: The date and time the book was returned (if applicable).
 *                             isLate:
 *                               type: boolean
 *                               description: Indicates whether the book is currently late or not.
 *     produces:
 *       - application/json
 */

/**
 * Search for books by category, publisher, author, available or year
 *
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: Search for books
 *     tags: [Books Search]
 *     description: Search for books by category, publisher, author, available or year
 *     parameters:
 *       - in: query
 *         name: category
 *         description: Book category
 *         schema:
 *           type: string
 *       - in: query
 *         name: publisher
 *         description: Book publisher
 *         schema:
 *           type: string
 *       - in: query
 *         name: author
 *         description: Book author
 *         schema:
 *           type: string
 *       - in: query
 *         name: available
 *         description: Whether the book is available or not
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: year
 *         description: Book publishing year
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: A list of books matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request. Nothing to search for.
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /books/mostborrowed/{year}:
 *   get:
 *     summary: Get the 10 most borrowed books in a year
 *     tags: [Books]
 *     description: Returns a list of the 10 most borrowed books in the specified year, with their count and details.
 *     parameters:
 *       - in: path
 *         name: year
 *         required: false
 *         description: The year for which to retrieve the most borrowed books.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the book.
 *                       count:
 *                         type: integer
 *                         description: The number of times the book was borrowed in the specified year.
 *                       book:
 *                         type: object
 *                         description: Details of the book.
 *                         properties:
 *                           title:
 *                             type: string
 *                             description: The title of the book.
 *                           category:
 *                             type: string
 *                             description: The category of the book.
 *                           author:
 *                             type: string
 *                             description: The author of the book.
 *                           publisher:
 *                             type: string
 *                             description: The publisher of the book.
 *                           publishingDate:
 *                             type: string
 *                             description: The publishing date of the book.
 *                           edition:
 *                             type: integer
 *                             description: The edition of the book.
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 *
 * /books/mostreading/{year}:
 *   get:
 *     summary: Returns the top 10 most read books for a given year
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: false
 *         schema:
 *           type: integer
 *         required: true
 *         description: The year for which to retrieve the most read books
 *     responses:
 *       '200':
 *         description: A list of the top 10 most read books for the given year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The book ID
 *                       count:
 *                         type: integer
 *                         description: The number of times the book was read
 *                       book:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             description: The book title
 *                           category:
 *                             type: string
 *                             description: The book category
 *                           author:
 *                             type: string
 *                             description: The book author
 *                           publisher:
 *                             type: string
 *                             description: The book publisher
 *                           publishingDate:
 *                             type: string
 *                             description: The book publishing date
 *                           edition:
 *                             type: string
 *                             description: The book edition
 */



/**
 * @swagger
 * /books/history/reading:
 *   get:
 *     summary: Get the number of books read by a member within a specific month or year
 *     tags: [Books For member Only]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *           format: int32
 *         description: The year for which to retrieve reading statistics
 *       - in: path
 *         name: month
 *         schema:
 *           type: integer
 *           format: int32
 *         description: The month for which to retrieve reading statistics (1-12)
 *     responses:
 *       200:
 *         description: The number of books read by the member during the specified time period
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the book
 *                       count:
 *                         type: integer
 *                         description: The number of times the book was read
 *                       book:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             description: The title of the book
 *                           category:
 *                             type: string
 *                             description: The category of the book
 *                           author:
 *                             type: string
 *                             description: The author of the book
 *                           publisher:
 *                             type: string
 *                             description: The publisher of the book
 *                           publishingDate:
 *                             type: string
 *                             description: The publishing date of the book (ISO 8601 format)
 *                           edition:
 *                             type: integer
 *                             description: The edition of the book
 */



/**
 * @swagger
 * /books/currentborrow:
 *   get:
 *     summary: Returns all currently borrowed books by a specific member.
 *     description: Returns all books that are currently marked as "borrowed" with the member's ID and book details.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Access token with member's ID.
 *         required: true
 *         type: string
 *       - in: query
 *         name: memberId
 *         description: ID of member to get borrowed books for. Defaults to member ID in token.
 *         required: false
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of current borrowed books with book details and number of times borrowed.
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Book title
 *                   number_of_borrowed:
 *                     type: number
 *                     description: Number of times the book has been borrowed by the member
 *                   book_details:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                           description: Current status of book
 *                         createdAt:
 *                           type: string
 *                           description: Date book was borrowed
 *                         expected_date:
 *                           type: string
 *                           description: Expected return date
 *                         member_details:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: ID of member who borrowed the book
 *                             full_name:
 *                               type: string
 *                               description: Full name of member who borrowed the book
 *                         employee_details:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: ID of employee who logged the borrow action
 *                             firstName:
 *                               type: string
 *                               description: First name of employee who logged the borrow action
 *                         returned_date:
 *                           type: string
 *                           description: Date book was returned (if returned)
 *                         isLate:
 *                           type: boolean
 *                           description: Flag indicating whether book is late or not
 */
  