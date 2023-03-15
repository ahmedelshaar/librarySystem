const express = require('express');
const saveImage = require('../services/saveImage');
const employeeController = require('../controllers/employeeController');
const {
	validateAddManagers,
	validateUpdateManagers,
	validateGetById,
	validateSearchEmployee,
} = require('../validation/managersValidation');
const validateMW = require('../validation/validationMW');
const { isEmployee, isAdmin } = require('./../middlewares/authorizationMw');

const router = express.Router();

router
	.route('/employee')
	.get(isAdmin, employeeController.getAllEmployees)
	.post(isAdmin, validateAddManagers, validateMW, employeeController.addEmployee);

router
	.route('/employee/:id')
	.get(isEmployee, validateGetById, validateMW, employeeController.getEmployeeById)
	.patch(isEmployee, saveImage('employee'), validateUpdateManagers, validateMW, employeeController.updateEmployee)
	.delete(isAdmin, validateGetById, validateMW, employeeController.deleteEmployee);

router.route('/employee/search').post(isAdmin, validateSearchEmployee, validateMW, employeeController.seacrchEmployee);
router
	.route('/employee/autocomplete')
	.post(isAdmin, validateSearchEmployee, validateMW, employeeController.autoComplete);

module.exports = router;
