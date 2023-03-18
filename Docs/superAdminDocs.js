/**
 * @swagger
 * components:
 *   schemas:
 *     Manager:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: Manager ID.
 *           example: 1
 *         firstName:
 *           type: string
 *           description: Manager first name.
 *           example: John
 *         lastName:
 *           type: string
 *           description: Manager last name.
 *           example: Doe
 *         email:
 *           type: string
 *           description: Manager email address.
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           description: Manager password.
 *           example: password123
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Manager birth date.
 *           example: "1990-01-01"
 *         hireDate:
 *           type: string
 *           format: date
 *           description: Manager hire date.
 *           example: "2020-01-01"
 *         salary:
 *           type: number
 *           description: Manager salary.
 *           example: 50000
 *         image:
 *           type: string
 *           description: Manager image filename.
 *           example: john-doe.jpg
 *         role:
 *           type: string
 *           description: Manager role.
 *           enum: [root, super-admin, admin, employee]
 *           example: super-admin
 *         token:
 *           type: string
 *           description: Manager token.
 *           example: abc123def456
 *         lastLoginTime:
 *           type: string
 *           format: date-time
 *           description: Manager last login time.
 *           example: "2022-03-18T10:15:30.000Z"
 *         activated:
 *           type: boolean
 *           description: Manager activation status.
 *           example: true
 */

/**
 * @swagger
 *
 * /api/super-admins:
 *   get:
 *     summary: Get all super admins
 *     tags: [Super Admin]
 *     description: Returns a list of all super admins in the system
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of super admins
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/SuperAdmin'
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 *
 * /api/super-admins/{id}:
 *   get:
 *     summary: Get a super admin by ID
 *     tags: [Super Admin]
 *     description: Returns a super admin with the specified ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the super admin to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A super admin object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   description: The ID of the super admin.
 *                 firstName:
 *                   type: string
 *                   description: The first name of the super admin.
 *                 lastName:
 *                    type: string
 *                    description: The last name of the super admin.
 *                 email:
 *                   type: string
 *                   description: The email address of the member.
 *                 birthDate:
 *                   type: string
 *                   format: date-time
 *                   description: The birth date of the super admin.
 *                 hireDate:
 *                    type: string
 *                    format: date-time
 *                    description: the super admin hire date
 *                 role:
 *                   type: string
 *                 image:
 *                   type: string
 *                   description: the super admin image
 *                 salary:
 *                    type: number
 *                    description: the super admin salary
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
z
/**
 * @swagger
 *
 * /api/super-admins:
 *   post:
 *     summary: Add a new super admin
 *     tags: [Super Admin]
 *     description: Adds a new super admin to the system
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: The super admin object to add
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewSuperAdmin'
 *     responses:
 *       201:
 *         description: The newly created super admin object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   description: The first name of the super admin.
 *                 lastName:
 *                    type: string
 *                    description: The last name of the super admin.
 *                 email:
 *                   type: string
 *                   description: The email address of the member.
 *                 birthDate:
 *                   type: string
 *                   format: date-time
 *                   description: The birth date of the super admin.
 *                 hireDate:
 *                    type: string
 *                    format: date-time
 *                    description: the super admin hire date
 *                 role:
 *                   type: string
 *                 salary:
 *                    type: number
 *                    description: the super admin salary
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
 * /super-admins/{id}:
 *   patch:
 *     summary: Update a Super Admin
 *     tags: [Super Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Super Admin to update
 *       - in: formData
 *         name: firstName
 *         schema:
 *           type: string
 *         description: The first name of the Super Admin
 *       - in: formData
 *         name: lastName
 *         schema:
 *           type: string
 *         description: The last name of the Super Admin
 *       - in: formData
 *         name: email
 *         schema:
 *           type: string
 *         description: The email address of the Super Admin
 *       - in: formData
 *         name: password
 *         schema:
 *           type: string
 *         description: The password of the Super Admin
 *       - in: formData
 *         name: birthDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The birth date of the Super Admin
 *       - in: formData
 *         name: salary
 *         schema:
 *           type: number
 *         description: The salary of the Super Admin
 *       - in: formData
 *         name: image
 *         schema:
 *           type: file
 *         description: The profile image of the Super Admin
 *       - in: formData
 *         name: role
 *         schema:
 *           type: string
 *           enum: [super-admin, admin, employee]
 *         description: The role of the Super Admin
 *     responses:
 *       '200':
 *         description: Super Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   description: The first name of the super admin.
 *                 lastName:
 *                    type: string
 *                    description: The last name of the super admin.
 *                 email:
 *                   type: string
 *                   description: The email address of the member.
 *                 birthDate:
 *                   type: string
 *                   format: date-time
 *                   description: The birth date of the super admin.
 *                 image:
 *                   type: string
 *                   description: Super Admin Image
 *                 role:
 *                   type: string
 *                   enum: ["super-admin","admin","employee"]
 *                 salary:
 *                    type: number
 *                    description: the super admin salary
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
 * /super-admins/{id}:
 *   delete:
 *     summary: Delete a Super Admin by ID
 *     tags: [Super Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Super Admin to delete
 *     responses:
 *       200:
 *         description: Successful operation. Super Admin deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Message indicating that the Super Admin has been deleted successfully.
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
