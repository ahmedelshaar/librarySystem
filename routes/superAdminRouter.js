//Requires
const express = require('express');
const superAdminController = require('../controllers/superAdminController');
const { validateAddManagers, validateUpdateManagers, validateGetById } = require('../validation/managersValidation');
const validateMW = require('../validation/validationMW');
const saveImage = require('../services/saveImage');
const { isSuperAdmin } = require('../middlewares/authorizationMw');
//Router obj
const router = express.Router();

//Routes
router
	.route('/superAdmin')
	.all(isSuperAdmin)
	.get(superAdminController.getAllSuperAdmins)
	.post(validateAddManagers, validateMW, superAdminController.addSuperAdmin);
//Get by id
router
	.route('/superAdmin/:id')
	.all(isSuperAdmin)
	.get(validateGetById, validateMW, superAdminController.getSuperAdminById)
	.patch(saveImage('superAdmins'), validateUpdateManagers, validateMW, superAdminController.updateSuperAdmin)
	.delete(validateGetById, validateMW, superAdminController.deleteSuperAdmin);

// Export router
module.exports = router;
