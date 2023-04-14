const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config({ path: './.env' });
cloudinary.config({
	// api_key:'339516188774425',
	// api_secret:'kk6FkrUZIOsyPjWKz7VATZg7Md0',
    // cloud_name:'dyidlkfvj',
    api_key:process.env.cloudinary_api_key,
	api_secret:process.env.cloudinary_api_secret,
    cloud_name:process.env.cloudinary_cloud_name,
    
	secure: true
  });
module.exports  = async (req,res,next) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    console.log(req.file);
    if (req.file && req.file.path){
        imagePath = req.file.path;
        
        const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        };

        try {
        // Upload the image
        // console.log("hello");
        const result = await cloudinary.uploader.upload(imagePath, options);
        // console.log(result);
        if (req.file && req.file.path) fs.unlinkSync(req.file.path);
        req.body.image = result.url
        req.file.path = result.url
        req.file.filename = result.url
		console.log(req.file,req.body);
        //   return result.public_id;
        
        } catch (error) {
        console.error(error);
        }
    }
    next();
};