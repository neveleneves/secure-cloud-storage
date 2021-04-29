const multer = require("multer");
const path = require('path')
const fs = require('fs')

const SAVE_DIR = "./uploads"; // for dev !!!

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let userID = req.user.userLoginSuccess;
    let path = `${SAVE_DIR}/${userID}`;

    if(!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    callback(null, path);
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
});

module.exports = {upload};
