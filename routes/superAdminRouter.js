//Requires

const express = require('express');

const superAdminController = require('../controllers/superAdminController');

const { validateAddManagers, validateUpdateManagers, validateGetById } = require('../validation/managersValidation');

const validateMW = require('../validation/validationMW');

const saveImage = require('../services/saveImage');
const imageUploader = require("../services/imageUploader");

const { isRoot, isSuperAdmin } = require('../middlewares/authorizationMw');

//Router obj

const router = express.Router();



//Routes

router

	.route('/superAdmin')

	.all(isRoot)

	.get(superAdminController.getAllSuperAdmins)

	.post(validateAddManagers, validateMW, superAdminController.addSuperAdmin);

//Get by id

router

	.route('/superAdmin/:id')

	// .all(isSuperAdmin)

	.get(isSuperAdmin, validateGetById, validateMW, superAdminController.getSuperAdminById)

	.patch(

		isSuperAdmin,

		saveImage('superAdmins'), imageUploader,

		validateUpdateManagers,

		validateMW,

		superAdminController.updateSuperAdmin

	)

	.delete(isRoot, validateGetById, validateMW, superAdminController.deleteSuperAdmin);



// Export router

module.exports = router;

