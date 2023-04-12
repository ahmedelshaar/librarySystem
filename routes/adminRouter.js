//Requires
const express = require('express');
const adminController = require('../controllers/adminController');
const { validateAddManagers, validateUpdateManagers, validateGetById } = require('../validation/managersValidation');
const validateMW = require('../validation/validationMW');
const saveImage = require('../services/saveImage');
const { isAdmin, isSuperAdmin } = require('../middlewares/authorizationMw');

//Router obj
const router = express.Router();

//Routes
router
	.route('/admin')
	.get(isSuperAdmin, adminController.getAllAdmins)
	.post(isSuperAdmin, saveImage('admins'), validateAddManagers, validateMW, adminController.addAdmin);

// Routes by ID
router
	.route('/admin/:id')
	.get(isAdmin, validateGetById, validateMW, adminController.getAdminById)
	.patch(isAdmin, saveImage('admins'), validateUpdateManagers, validateMW, adminController.updateAdmin)
	.delete(isSuperAdmin, adminController.deleteAdmin);

// Export router
module.exports = router;
