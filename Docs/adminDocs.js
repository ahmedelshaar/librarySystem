/**
 * @swagger
 *
 * /api/admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     description: Returns a list of all  admins in the system
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of  admins
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Admin'
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 *
 * /api/admins/{id}:
 *   get:
 *     summary: Get a  admin by ID
 *     tags: [Admin]
 *     description: Returns a  admin with the specified ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the  admin to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A  admin object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   description: The ID of the  admin.
 *                 firstName:
 *                   type: string
 *                   description: The first name of the  admin.
 *                 lastName:
 *                    type: string
 *                    description: The last name of the  admin.
 *                 email:
 *                   type: string
 *                   description: The email address of the admin.
 *                 birthDate:
 *                   type: string
 *                   format: date-time
 *                   description: The birth date of the  admin.
 *                 hireDate:
 *                    type: string
 *                    format: date-time
 *                    description: the  admin hire date
 *                 role:
 *                   type: string
 *                 image:
 *                   type: string
 *                   description: the  admin image
 *                 salary:
 *                    type: number
 *                    description: the  admin salary
 *       400:
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: not found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */
z;
/**
 * @swagger
 *
 * /api/-admins:
 *   post:
 *     summary: Add a new  admin
 *     tags: [Admin]
 *     description: Adds a new  admin to the system
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: The  admin object to add
 *         required: true
 *         schema:
 *           $ref: '#/definitions/newAdmin'
 *     responses:
 *       201:
 *         description: The newly created admin object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   description: The first name of the admin.
 *                 lastName:
 *                    type: string
 *                    description: The last name of the admin.
 *                 email:
 *                   type: string
 *                   description: The email address of the member.
 *                 birthDate:
 *                   type: string
 *                   format: date-time
 *                   description: The birth date of the  admin.
 *                 hireDate:
 *                    type: string
 *                    format: date-time
 *                    description: the  admin hire date
 *                 role:
 *                   type: string
 *                 salary:
 *                    type: number
 *                    description: the  admin salary
 *       400:
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: not found
 *       '500':
 *         description: Internal server error
 *
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /-admins/{id}:
 *   patch:
 *     summary: Update a  Admin
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the  Admin to update
 *       - in: formData
 *         name: firstName
 *         schema:
 *           type: string
 *         description: The first name of the  Admin
 *       - in: formData
 *         name: lastName
 *         schema:
 *           type: string
 *         description: The last name of the  Admin
 *       - in: formData
 *         name: email
 *         schema:
 *           type: string
 *         description: The email address of the  Admin
 *       - in: formData
 *         name: password
 *         schema:
 *           type: string
 *         description: The password of the  Admin
 *       - in: formData
 *         name: birthDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The birth date of the  Admin
 *       - in: formData
 *         name: salary
 *         schema:
 *           type: number
 *         description: The salary of the  Admin
 *       - in: formData
 *         name: image
 *         schema:
 *           type: file
 *         description: The profile image of the  Admin
 *       - in: formData
 *         name: role
 *         schema:
 *           type: string
 *           enum: [-admin, admin, employee]
 *         description: The role of the  Admin
 *     responses:
 *       '200':
 *         description:  Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   description: The first name of the  admin.
 *                 lastName:
 *                    type: string
 *                    description: The last name of the  admin.
 *                 email:
 *                   type: string
 *                   description: The email address of the member.
 *                 birthDate:
 *                   type: string
 *                   format: date-time
 *                   description: The birth date of the  admin.
 *                 image:
 *                   type: string
 *                   description:  Admin Image
 *                 role:
 *                   type: string
 *                   enum: ["super-admin","admin","employee"]
 *                 salary:
 *                    type: number
 *                    description: the  admin salary
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 *
 * /-admins/{id}:
 *   delete:
 *     summary: Delete a  Admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the  Admin to delete
 *     responses:
 *       200:
 *         description: Successful operation.  Admin deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Message indicating that the  Admin has been deleted successfully.
 *                   example: Deleted
 *       400:
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: not found
 *       '500':
 *         description: Internal server error
 */
