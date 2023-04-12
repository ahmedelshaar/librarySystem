/**
 * @swagger
 *
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [employee]
 *     description: Returns a list of all  employees in the system
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of  employees
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/employee'
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 *
 * /api/employees/{id}:
 *   get:
 *     summary: Get a  employee by ID
 *     tags: [employee]
 *     description: Returns a  employee with the specified ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the  employee to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A  employee object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                   description: The ID of the  employee.
 *                 firstName:
 *                   type: string
 *                   description: The first name of the  employee.
 *                 lastName:
 *                    type: string
 *                    description: The last name of the  employee.
 *                 email:
 *                   type: string
 *                   description: The email address of the employee.
 *                 birthDate:
 *                   type: string
 *                   format: date-time
 *                   description: The birth date of the  employee.
 *                 hireDate:
 *                    type: string
 *                    format: date-time
 *                    description: the  employee hire date
 *                 role:
 *                   type: string
 *                 image:
 *                   type: string
 *                   description: the  employee image
 *                 salary:
 *                    type: number
 *                    description: the  employee salary
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
 * /api/-employees:
 *   post:
 *     summary: Add a new  employee
 *     tags: [employee]
 *     description: Adds a new  employee to the system
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: The  employee object to add
 *         required: true
 *         schema:
 *           $ref: '#/definitions/newemployee'
 *     responses:
 *       201:
 *         description: The newly created employee object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   description: The first name of the employee.
 *                 lastName:
 *                    type: string
 *                    description: The last name of the employee.
 *                 email:
 *                   type: string
 *                   description: The email address of the member.
 *                 birthDate:
 *                   type: string
 *                   format: date-time
 *                   description: The birth date of the  employee.
 *                 hireDate:
 *                    type: string
 *                    format: date-time
 *                    description: the  employee hire date
 *                 role:
 *                   type: string
 *                 salary:
 *                    type: number
 *                    description: the  employee salary
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
 * /-employees/{id}:
 *   patch:
 *     summary: Update a  employee
 *     tags: [employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the  employee to update
 *       - in: formData
 *         name: firstName
 *         schema:
 *           type: string
 *         description: The first name of the  employee
 *       - in: formData
 *         name: lastName
 *         schema:
 *           type: string
 *         description: The last name of the  employee
 *       - in: formData
 *         name: email
 *         schema:
 *           type: string
 *         description: The email address of the  employee
 *       - in: formData
 *         name: password
 *         schema:
 *           type: string
 *         description: The password of the  employee
 *       - in: formData
 *         name: birthDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The birth date of the  employee
 *       - in: formData
 *         name: salary
 *         schema:
 *           type: number
 *         description: The salary of the  employee
 *       - in: formData
 *         name: image
 *         schema:
 *           type: file
 *         description: The profile image of the  employee
 *       - in: formData
 *         name: role
 *         schema:
 *           type: string
 *           enum: [super-admin,admin, employee]
 *         description: The role of the  employee
 *     responses:
 *       '200':
 *         description:  employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   description: The first name of the  employee.
 *                 lastName:
 *                    type: string
 *                    description: The last name of the  employee.
 *                 email:
 *                   type: string
 *                   description: The email address of the member.
 *                 birthDate:
 *                   type: string
 *                   format: date-time
 *                   description: The birth date of the  employee.
 *                 image:
 *                   type: string
 *                   description:  employee Image
 *                 role:
 *                   type: string
 *                   enum: ["super-admin","admin","employee"]
 *                 salary:
 *                    type: number
 *                    description: the  employee salary
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
 * /-employees/{id}:
 *   delete:
 *     summary: Delete a  employee by ID
 *     tags: [employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the  employee to delete
 *     responses:
 *       200:
 *         description: Successful operation.  employee deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Message indicating that the  employee has been deleted successfully.
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
