const multer = require("multer");
// const pathInit = require("path");
// const fs = require("fs");

// const SAVE_DIR = "./uploads"; // for dev !!!

const storage = multer.memoryStorage({

});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 },
});

module.exports = { upload };
