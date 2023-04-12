const fs = require("fs");

const path = require("path");



const folders = ['images','logs','images/admins','images/employee','images/firstImage','images/members','images/superAdmins','images/books']



folders.forEach(folder => {

    // console.log(path.join(__dirname, '..', folder));

    if (!fs.existsSync(path.join(__dirname, '..', folder))) {

        fs.mkdirSync(path.join(__dirname, '..', folder));

        //.gitignore

        fs.appendFileSync(path.join(__dirname, '..', folder, '.gitignore'), '/*');

    }

});

