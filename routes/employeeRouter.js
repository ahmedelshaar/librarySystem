const express = require("express");
const saveImage = require("../services/saveImage");
const employeeController = require("../controllers/employeeController");
const {
  validateAddEmployee,
  validateUpdateEmployee,
  validateGetById,
  validateSearchEmployee,
} = require("../validation/employeeValidation");
const validateMW = require("../validation/validationMW");

const router = express.Router();

router
  .route("/employee")
  .get(employeeController.getAllEmployees)
  .post(validateAddEmployee, validateMW, employeeController.addEmployee)
  .patch(saveImage("employee"), validateUpdateEmployee, validateMW, employeeController.updateEmployee)
  .delete(validateUpdateEmployee, validateMW, employeeController.deleteEmployee);

router.route("/employee/:id").get(validateGetById, validateMW, employeeController.getEmployeeById);
router.route("/employee/search").post(validateSearchEmployee, validateMW, employeeController.seacrchEmployee);
router.route("/employee/autocomplete").post(validateSearchEmployee, validateMW, employeeController.autoComplete);

module.exports = router;
