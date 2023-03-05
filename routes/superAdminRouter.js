//Requires
const express = require("express");
const superAdminController = require("../controllers/superAdminController");
const { validateAddAdmin, validateUpdateAdmin, validateParam } = require("../validation/adminValidation");
const validateMW = require("../validation/validationMW");
const multer = require("multer");
const path = require("path");
//Router obj
const router = express.Router();

//Multer
const fileFilter = (req, file, callBack) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype == "image/jpeg") {
    callBack(null, true);
  } else {
    callBack(new Error("Invalid file type, only JPEG, PNG and JPG are allowed!"));
  }
};
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname, "../images/superAdmins"));
  },
  filename: (req, file, callBack) => {
    let extension = path.extname(file.originalname);
    let baseName = path.basename(file.originalname, extension);
    let imageName = file.fieldname + "-" + baseName + "-" + Date.now() + extension;
    callBack(null, imageName);
  },
});

const upload = multer({ limits: { fileSize: 1024 * 1024 * 2 }, storage: storage, fileFilter: fileFilter });

//Routes
router
  .route("/superAdmin")
  .get(superAdminController.getAllSuperAdmins)
  .post(upload.single("image"), validateAddAdmin, validateMW, superAdminController.addSuperAdmin)
  .patch(upload.single("image"), validateUpdateAdmin, validateMW, superAdminController.updateSuperAdmin)
  .delete(superAdminController.deleteSuperAdmin);
//Get by id
router.route("/superAdmin/:id").get(validateParam, validateMW, superAdminController.getSuperAdminById);
// Export router
module.exports = router;
