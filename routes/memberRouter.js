const express = require('express');
const controller = require('../controllers/memberController');
const validation = require('../validation/validationMW');
const memberValidation = require('../validation/memberValidation');
const saveImage = require('../services/saveImage');
const { isEmployee, isMember } = require('../middlewares/authorizationMw');

const router = express.Router();

router
	.route('/members')
	.get(isEmployee, memberValidation.checkId, controller.getAllMembers)
	.post(isEmployee, memberValidation.postValidation, validation, controller.addMember);
router
	.route('/members/:id')
	.get(isMember, memberValidation.checkId, validation, controller.getAllMemberById)
	.patch(isMember, saveImage('members'), memberValidation.patchValidation, validation, controller.updateMember)
	.delete(isEmployee, memberValidation.checkId, validation, controller.deleteMember);

router
	.route('/members/search')
	.post(isEmployee, memberValidation.validateSearchMember, validation, controller.searchMember);

router
	.route('/members/autocomplete')
	.post(isEmployee, memberValidation.validateSearchMember, validation, controller.autocompleteMember);

module.exports = router;
