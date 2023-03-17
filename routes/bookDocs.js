/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Get log data for a given day
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

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
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

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
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


/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
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


/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a book
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


/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
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
 * /books/author/{name}:
 *   get:
 *     summary: Get books by author
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


/**
 * @swagger
 * /books/publisher/{name}:
 *   get:
 *     summary: Get all books by publisher
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



/**
 * @swagger
 * /books/title/{name}:
 *   get:
 *     summary: Get books by title
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


/**
 * @swagger
 * /books/available:
 *   get:
 *     summary: Get all available books
 *     tags:
 *       - Books
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
/**
 * @swagger
 * /books/borrowed:
 *   get:
 *     summary: Get a list of borrowed books.
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
 *     tags:
 *       - Books
 */

/**
 * @swagger
 *
 * /books/late:
 *   get:
 *     summary: Retrieve all late borrowed books
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
 *     tags:
 *       - Books
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
/**
 * @swagger
 * /api/books/new:
 *   get:
 *     summary: Retrieve new books added to the library in the last month.
 *     description: This endpoint returns a list of new books added to the library in the last month. For members, it returns books added in the last month or since their last login, whichever is greater.
 *     tags:
 *       - Books
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

