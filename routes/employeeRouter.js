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
const { isEmployee, isAdmin } = require("./../middlewares/authorizationMw");

const router = express.Router();

router
  .route("/employee")
  .get(isAdmin, employeeController.getAllEmployees)
  .post(isAdmin, validateAddEmployee, validateMW, employeeController.addEmployee)
  .patch(isEmployee, saveImage("employee"), validateUpdateEmployee, validateMW, employeeController.updateEmployee)
  .delete(isAdmin, validateUpdateEmployee, validateMW, employeeController.deleteEmployee);

router.route("/employee/:id").get(isEmployee, validateGetById, validateMW, employeeController.getEmployeeById);
router.route("/employee/search").post(isAdmin, validateSearchEmployee, validateMW, employeeController.seacrchEmployee);
router
  .route("/employee/autocomplete")
  .post(isAdmin, validateSearchEmployee, validateMW, employeeController.autoComplete);

module.exports = router;
