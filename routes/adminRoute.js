//Requires
const express = require("express");
const adminController = require("./../controllers/adminController");
const { validateAddAdmin, validateUpdateAdmin } = require("./../validation/adminValidation");
const validateMW = require("./../validation/validationMW");
const multer = require("multer");
const path = require("path");
const moment = require("moment");
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
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/admins"));
  },
  filename: (req, file, callBack) => {
    let extension = path.extname(file.originalname);
    let baseName = path.basename(file.originalname, extension);
    // let imageDate = moment.unix(Date.now()).format("DD-MM-YYYY");
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
  .put(upload.single("image"), validateUpdateAdmin, validateMW, adminController.updateAdmin)
  .delete(adminController.deleteAdmin);