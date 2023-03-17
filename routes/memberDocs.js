/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         full_name:
 *           type: string
 *           description: The full name of the new member
 *         email:
 *           type: string
 *           description: The email address of the new member
 *         password:
 *           type: string
 *           description: The password of the new member
 *         image:
 *           type: string
 *           description: The URL of an image for the new member
 *         phone_number:
 *           type: string
 *           description: The phone number of the new member
 *         birth_date:
 *           type: string
 *           format: date
 *           description: The birth date of the new member
 *         address:
 *           type: object
 *           description: The address of the new member
 *           properties:
 *             street:
 *               type: string
 *               description: The street name of the address
 *             city:
 *               type: string
 *               description: The city of the address
 *             state:
 *               type: string
 *               description: The state of the address
 *             zip_code:
 *               type: string
 *               description: The zip code of the address
 *       required:
 *         - full_name
 *         - email
 *         - password
 */

/**
 * @swagger
 *
 * /members:
 *   get:
 *     summary: Retrieve a list of all members.
 *     tags:
 *       - Members
 *     description: Retrieve a list of all members stored in the database.
 *     responses:
 *       200:
 *         description: A list of members.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Get a member by ID
 *     tags:
 *       - Members
 *     description: Retrieve a member by ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the member to retrieve.
 *     responses:
 *       200:
 *         description: Member details successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   description: The ID of the member.
 *                 full_name:
 *                   type: string
 *                   description: The full name of the member.
 *                 email:
 *                   type: string
 *                   description: The email address of the member.
 *                 image:
 *                   type: string
 *                   description: The image URL of the member.
 *                 phone_number:
 *                   type: string
 *                   description: The phone number of the member.
 *                 birth_date:
 *                   type: string
 *                   format: date-time
 *                   description: The birth date of the member.
 *                 address:
 *                   type: object
 *                   description: The address object of the member.
 *                   properties:
 *                     street:
 *                       type: string
 *                       description: The street address of the member.
 *                     city:
 *                       type: string
 *                       description: The city of the member's address.
 *                     state:
 *                       type: string
 *                       description: The state of the member's address.
 *                     country:
 *                       type: string
 *                       description: The country of the member's address.
 *                     zip:
 *                       type: string
 *                       description: The zip code of the member's address.
 *                 last_login:
 *                   type: string
 *                   format: date-time
 *                   description: The last login time of the member.
 *                 ban_date:
 *                   type: string
 *                   format: date-time
 *                   description: The ban date of the member.
 *                 activated:
 *                   type: boolean
 *                   description: Whether the member is activated or not.
 *       404:
 *         description: Member not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */

/**
 * @swagger
 * /members/{memberId}:
 *   get:
 *     summary: Retrieve a member by
 *     tags:
 *       - Members
 *     description: Retrieve a member by their unique ID.
 *     parameters:
 *       - in: path
 *         name: memberId
 *         description: ID of the member to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member
 *     tags:
 *       - Members
 *     description: Create a new member with the given information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewMember'
 *     responses:
 *       201:
 *         description: Member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         description: Bad request, invalid member data provided
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 *
 * /members/{id}:
 *   patch:
 *     summary: Update a member by ID.
 *     tags:
 *       - Members
 *     description: Update the specified member by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the member to update.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: body
 *         description: The fields to update for the specified member.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             full_name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             image:
 *               type: string
 *             phone_number:
 *               type: string
 *             birth_date:
 *               type: string
 *               format: date
 *             address:
 *               $ref: '#/components/schemas/Address'
 *     requestBody:
 *       description: The fields to update for the specified member.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberUpdate'
 *     responses:
 *       200:
 *         description: The updated member.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: The specified member ID does not exist.
 */

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete a member by ID
 *     tags:
 *       - Members
 *     description: Delete a member by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The ID of the member to delete
 *     responses:
 *       200:
 *         description: Member deleted successfully
 *       404:
 *         description: Member not found
 */

/**
 * @swagger
 * /members/search:
 *   post:
 *     summary: Search for members by name or email
 *     tags:
 *       - Members
 *     description: Search for members by name or email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: The search query
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: A list of members matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *       400:
 *         description: Invalid search query
 */

/**
 * @swagger
 * /members/autocomplete:
 *   post:
 *     summary: Autocomplete member search by name or email.
 *     tags:
 *       - Members
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *                 description: The search query string.
 *                 example: john
 *     responses:
 *       200:
 *         description: A list of members matching the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
