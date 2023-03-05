const express = require("express");
const multer = require("multer");
const path = require("path");

const employeeController = require("../controllers/employeeController");
const { validateAddEmployee, validateUpdateEmployee, validateGetById, validateSearchEmployee } = require("../validation/employeeValidation");
const validateMW = require("../validation/validationMW");

const router = express.Router();

const upload = multer({
  fileFilter: (req, file, callBack) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype == "image/jpeg") {
      callBack(null, true);
    } else {
      callBack(new Error("Invalid file type, only JPEG, PNG and JPG are allowed!"));
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, path.join(__dirname, "../images/employee"));
    },
    filename: (req, file, callBack) => {
      let extension = path.extname(file.originalname);
      let baseName = path.basename(file.originalname, extension);
      let imageName = file.fieldname + "-" + baseName + "-" + Date.now() + extension;
      callBack(null, imageName);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 2 },
})

router
  .route("/employee")
  .get(employeeController.getAllEmployees)
  .post(validateAddEmployee, validateMW, employeeController.addEmployee)
  .patch(upload.single("image"), validateUpdateEmployee, validateMW, employeeController.updateEmployee)
  .delete(validateUpdateEmployee, validateMW, employeeController.deleteEmployee);

router.route("/employee/:id").get(validateGetById, validateMW, employeeController.getEmployeeById);
router.route("/employee/search").post(validateSearchEmployee, validateMW,employeeController.seacrchEmployee);
router.route("/employee/autocomplete").post(validateSearchEmployee, validateMW,employeeController.autoComplete);







module.exports = router;
