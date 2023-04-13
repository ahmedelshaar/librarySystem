const express = require('express');
const fs = require('fs');


const router = express.Router();

function getContentType(filename) {
  const extension = filename.split('.').pop().toLowerCase();

  switch (extension) {
    case 'jpeg':
    case 'jpg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}
router.route('/images/:folder/:filename').get( (req, res,next) => {
  const filename = req.params.filename;
  const folder = req.params.folder;
  const imagePath = `./images/${folder}/${filename}`;

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(404).send('Image not found');
      return;
    }

    const contentType = getContentType(filename);
    res.setHeader('Content-Type', contentType);
    res.send(data);
  });
});



module.exports = router;