const express = require("express");
const controller = require("../controllers/memberController");
const validation = require("../validation/validationMW");
const memberValidation = require("../validation/memberValidation");
const saveImage = require("../services/saveImage");
const { isEmployee, isMember } = require("../middlewares/authorizationMw");

const router = express.Router();

router
  .route("/members")
  .get(isEmployee,memberValidation.ckeckId, controller.getAllMembers)
  //   .post(uploadImage.single("image"), memberValidation.postValidation, validation, controller.addMember)
  //   .delete(uploadImage.single("image"), memberValidation.ckeckId, validation, controller.deleteMember)
  //   .patch(uploadImage.single("image"), memberValidation.patchValidation, validation, controller.updateMember);
  .post(isMember,saveImage("members"), memberValidation.postValidation, validation, controller.addMember)
  .delete(isEmployee,saveImage("members"), memberValidation.ckeckId, validation, controller.deleteMember)
  .patch(isMember,saveImage("members"), memberValidation.patchValidation, validation, controller.updateMember);

router.route("/members/:id").get(controller.getMembers);

module.exports = router;
