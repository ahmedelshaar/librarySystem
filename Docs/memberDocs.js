/**
 * @swagger
 * components:
 *   schemas:
 *     AddMember:
 *       type: object
 *       properties:
 *         full_name:
 *           type: string
 *           description: The full name of the new member
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the new member
 *     NewMember:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: The ID of the member.
 *         full_name:
 *           type: string
 *           description: The full name of the new member
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the new member
 *         last_login:
 *           type: string
 *           format: date
 *           description: The last login date of the member
 *         ban_date:
 *           type: string
 *           format: date
 *           description: Tha date which the member banned until
 *         activated:
 *           type: boolean
 *           format: boolean
 *           description: The Member Activation State
 *         timestamps:
 *           type: object
 *           description: the TimeStamps of the member
 *           properties:
 *             created_at:
 *               type: string
 *               format: date-time
 *               description: The Date which the member created At
 *             updated_at:
 *               type: string
 *               format: date-time
 *               description: The Date which the member Updated At
 *       required:
 *         - full_name
 *         - email
 *     MemberSearch:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: The ID of the member.
 *         full_name:
 *           type: string
 *           description: The full name of the new member
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the new member
 *     MemberUpdate:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: The ID of the member.
 *         full_name:
 *           type: string
 *           description: The full name of the new member
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the new member
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the new member
 *         image:
 *           type: string
 *           description: The URL of an image for the new member
 *         phone_number:
 *           type: string
 *           pattern: '^01[0125][0-9]{8}$'
 *           description: The phone number of the new member
 *         birth_date:
 *           type: string
 *           format: date
 *           maximum: '2009-01-01'
 *           description: The birth date of the new member
 *         address:
 *           type: object
 *           description: The address of the new member
 *           properties:
 *             city:
 *               type: string
 *               description: The city name of the address
 *             street:
 *               type: string
 *               description: The street of the address
 *             building:
 *               type: number
 *               description: building number of the address
 *     Member:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: The ID of the member.
 *         full_name:
 *           type: string
 *           description: The full name of the new member
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the new member
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the new member
 *         image:
 *           type: string
 *           description: The URL of an image for the new member
 *         phone_number:
 *           type: string
 *           pattern: '^01[0125][0-9]{8}$'
 *           description: The phone number of the new member
 *         birth_date:
 *           type: string
 *           format: date
 *           maximum: '2009-01-01'
 *           description: The birth date of the new member
 *         address:
 *           type: object
 *           description: The address of the new member
 *           properties:
 *             city:
 *               type: string
 *               description: The city name of the address
 *             street:
 *               type: string
 *               description: The street of the address
 *             building:
 *               type: number
 *               description: building number of the address
 *         last_login:
 *           type: string
 *           format: date
 *           description: The last login date of the member
 *         ban_date:
 *           type: string
 *           format: date
 *           description: Tha date which the member banned until
 *         activated:
 *           type: boolean
 *           format: boolean
 *           description: The Member Activation State
 *         timestamps:
 *           type: object
 *           description: the TimeStamps of the member
 *           properties:
 *             created_at:
 *               type: string
 *               format: date-time
 *               description: The Date which the member created At
 *             updated_at:
 *               type: string
 *               format: date-time
 *               description: The Date which the member Updated At
 *       required:
 *         - full_name
 *         - email
 *   responses:
 *     '404':
 *       description: Not found.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Page Not Found
 *     '500':
 *       description: Internal Server Error.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: Internal Server Error.
 */
// Get All Members
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
 *       400:
 *           description: Bad request
 *           content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/responses/NotFound'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 *
 */
// Get Member By ID
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
 *                   description: The full name of the new member
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email address of the new member
 *                 password:
 *                   type: string
 *                   format: password
 *                   description: The password of the new member
 *                 image:
 *                   type: string
 *                   description: The URL of an image for the new member
 *                 phone_number:
 *                   type: string
 *                   pattern: '^01[0125][0-9]{8}$'
 *                   description: The phone number of the new member
 *                 birth_date:
 *                   type: string
 *                   format: date
 *                   maximum: '2009-01-01'
 *                   description: The birth date of the new member
 *                 address:
 *                   type: object
 *                   description: The address of the new member
 *                   properties:
 *                     city:
 *                       type: string
 *                       description: The city name of the address
 *                     street:
 *                       type: string
 *                       description: The street of the address
 *                     building:
 *                       type: number
 *                       description: building number of the address
 *                 last_login:
 *                   type: string
 *                   format: date
 *                   description: The last login date of the member
 *                 ban_date:
 *                   type: string
 *                   format: date
 *                   description: Tha date which the member banned until
 *                 activated:
 *                   type: boolean
 *                   format: boolean
 *                   description: The Member Activation State
 *                 timestamps:
 *                   type: object
 *                   description: the TimeStamps of the member
 *                   properties:
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: The Date which the member created At
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: The Date which the member Updated At
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
// Add New Member
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
 *             $ref: '#/components/schemas/AddMember'
 *     responses:
 *       201:
 *         description: Member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewMember'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
// Updated Member By ID
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
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
// Delete Member
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
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
// Search For Memebr by [Name, Email]
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
 *               full_name:
 *                 type: string
 *                 description: The search query string.
 *                 example: member
 *               email:
 *                 type: email
 *                 description: The search query string.
 *                 example: member@gmail.com
 *     responses:
 *       200:
 *         description: A list of members matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MemberSearch'
 *       404:
 *         $ref: '#/components/responses/404'
 *       500:
 *         $ref: '#/components/responses/500'
 */
// Autocomplete For Memebr by [Name, Email]
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
 *               full_name:
 *                 type: string
 *                 description: The search query string.
 *                 example: member
 *               email:
 *                 type: email
 *                 description: The search query string.
 *                 example: member@gmail.com
 *     responses:
 *       200:
 *         description: A list of members matching the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MemberSearch'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/500'
 *       404:
 *         $ref: '#/components/responses/404'
 */
