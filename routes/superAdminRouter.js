//Requires
const express = require("express");
const superAdminController = require("../controllers/superAdminController");
const { validateAddAdmin, validateUpdateAdmin, validateParam } = require("../validation/adminValidation");
const validateMW = require("../validation/validationMW");
const saveImage = require("../services/saveImage");
const { isSuperAdmin } = require("../middlewares/authorizationMw");
//Router obj
const router = express.Router();

//Routes
router
  .route("/superAdmin")
  .all(isSuperAdmin)
  .get(superAdminController.getAllSuperAdmins)
  .post(saveImage("superAdmins"), validateAddAdmin, validateMW, superAdminController.addSuperAdmin)
  .patch(saveImage("superAdmins"), validateUpdateAdmin, validateMW, superAdminController.updateSuperAdmin)
  .delete(superAdminController.deleteSuperAdmin);
//Get by id
router.route("/superAdmin/:id").get(validateParam, validateMW, superAdminController.getSuperAdminById);
// Export router
module.exports = router;
