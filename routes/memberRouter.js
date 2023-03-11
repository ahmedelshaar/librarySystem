const express = require("express");
const controller = require("../controllers/memberController");
const validation = require("../validation/validationMW");
const memberValidation = require("../validation/memberValidation");
const saveImage = require("../services/saveImage");
const { isEmployee, isMember } = require("../middlewares/authorizationMw");

const router = express.Router();

router
  .route("/members")
  .get(isEmployee, memberValidation.checkId, controller.getAllMembers)
  .post(isEmployee, saveImage("members"), memberValidation.postValidation, validation, controller.addMember)
  .delete(isEmployee, saveImage("members"), memberValidation.checkId, validation, controller.deleteMember)
  .patch(isMember, saveImage("members"), memberValidation.patchValidation, validation, controller.updateMember);
router
  .route("/members/search")
  .post(isEmployee, memberValidation.validateSearchMember, validation, controller.searchByName);

module.exports = router;
