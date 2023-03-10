const multer = require("multer");
const path = require("path");

module.exports = function() {
  const fileFilter = (req, file, callBack) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype == "image/jpeg") {
      callBack(null, true);
    } else {
      callBack(new Error("Invalid file type, only JPEG, PNG and JPG are allowed!"));
    }
  };

  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, path.join(__dirname, "..", "images"));
    },
    filename: (req, file, callBack) => {
      let extension = path.extname(file.originalname);
      let baseName = path.basename(file.originalname, extension);
      let imageName = file.fieldname + "-" + baseName + "-" + Date.now() + extension;
      callBack(null, path.join(folderName, imageName));
    },
  });

  const upload = multer({ limits: { fileSize: 1024 * 1024 * 2 }, storage: storage, fileFilter: fileFilter });

  return upload.single("image");
}