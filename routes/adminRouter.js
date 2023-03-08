//Requires
const express = require("express");
const adminController = require("../controllers/adminController");
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
    callBack(null, path.join(__dirname, "../images/admins"));
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
  .route("/admin")
  .get(adminController.getAllAdmins)
  .post(upload.single("image"), validateAddAdmin, validateMW, adminController.addAdmin)
  .patch(upload.single("image"), validateUpdateAdmin, validateMW, adminController.updateAdmin)
  .delete(adminController.deleteAdmin);

// Get Admin by ID
router.route("/admin/:id").get(validateParam, validateMW, adminController.getAdminById);

// Get by email
// router.route("/admin/email").post(adminController.searchAdminByEmail);

// Export router
module.exports = router;
