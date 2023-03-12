//Requires
const express = require("express");
const adminController = require("../controllers/adminController");
const { validateAddAdmin, validateUpdateAdmin, validateParam } = require("../validation/adminValidation");
const validateMW = require("../validation/validationMW");
const saveImage = require("../services/saveImage");
const { isAdmin, isSuperAdmin } = require("../middlewares/authorizationMw");

//Router obj
const router = express.Router();

//Routes
router
  .route("/admin")
  .get(isSuperAdmin, adminController.getAllAdmins)
  .post(isSuperAdmin, saveImage("admins"), validateAddAdmin, validateMW, adminController.addAdmin)
  .patch(isAdmin, saveImage("admins"), validateUpdateAdmin, validateMW, adminController.updateAdmin)
  .delete(isSuperAdmin, adminController.deleteAdmin);

// Get Admin by ID
router.route("/admin/:id").get(isAdmin, validateParam, validateMW, adminController.getAdminById);

// Export router
module.exports = router;
