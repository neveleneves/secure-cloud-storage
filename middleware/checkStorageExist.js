const StorageProfile = require("../models/StorageProfile");
const fs = require("fs");

//Middleware for check a user storage exist
module.exports = async function checkStorageExist(req, res, next) {
  try {
    const userID = req.user.userLoginSuccess;
    const SAVE_DIR = "./uploads"; // for dev !!!

    const storageExist = await StorageProfile.findOne({
      name: userID,
      parent_dir: userID,
      path: "/",
      type: "directory",
    });

    if (!storageExist) {
      const newStorage = new StorageProfile({
        name: userID,
        parent_dir: userID,
        path: "/",
        type: "directory",
      });
      await newStorage.save();
    }

    const path = `${SAVE_DIR}/${userID}`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    next();
  } catch (e) {
    res
      .status(500)
      .json({ message: "Неудалось проверить существование хранилища" });
    console.warn("Неудалось проверить существование хранилища: ", e.message);
  }
};
