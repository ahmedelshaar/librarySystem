const express = require("express");
const controller = require("../controllers/memberController");
const validation = require("../validation/validationMW");
const memberValidation = require("../validation/memberValidation");
const multer = require("multer");
const path = require("path");

const uploadImage = multer({
  fileFilter: (req, file, callback) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
      callback(null, true);
    } else {
      callback(new Error("Invalid image"));
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join(__dirname, "..", "images/members"));
    },
    filename: (req, file, callback) => {
      let extension = path.extname(file.originalname);
      let name = path.basename(file.originalname, extension);
      let imageName = name + "-" + Date.now() + extension;
      callback(null, imageName);
    },
  }),
  limits: {
    fileSize: 1024 * 1024,
  },
});

const router = express.Router();

router
  .route("/members")
  .get(memberValidation.checkId, controller.getAllMembers)
  .post(uploadImage.single("image"), memberValidation.postValidation, validation, controller.addMember);

router
  .route("/members/:id")
  .get(controller.getMembers)
  .delete(uploadImage.single("image"), memberValidation.checkID, validation, controller.deleteMember)
  .patch(
    uploadImage.single("image"),
    memberValidation.checkID,
    memberValidation.patchValidation,
    validation,
    controller.updateMember
  );

router.route("/members/search").post(memberValidation.validateSearchMember, validation, controller.searchByName);

module.exports = router;
