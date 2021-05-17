const StorageProfile = require("../models/StorageProfile");
const path = require("path");
const fs = require("fs");

//Middleware for check a file exist
module.exports = async function checkFileExist(req, res, next) {
  try {
    const fileName = req.params.file;
    if (!fileName) {
      return res
        .status(400)
        .json({ message: "Индификатор файла - отсутствует" });
    }

    const userID = req.user.userLoginSuccess;
    if (!userID) {
      return res
        .status(400)
        .json({ message: "Идентификатор пользователя - отсутствует" });
    }

    const fileToAction = await StorageProfile.findOne({
      parent_dir: userID,
      unique_name: fileName,
    });
    if (!fileToAction) {
      return res.status(400).json({ message: "Выбранный файл - отсутствует" });
    }

    const file = path.join(__dirname, "..", `/uploads/${userID}/${fileName}`);
    if (!fs.existsSync(file)) {
      await StorageProfile.findOneAndDelete({
        parent_dir: userID,
        unique_name: fileName,
      });

      return res
        .status(400)
        .json({ message: "Указан несуществующий файл или путь" });
    }
    next();
  } catch (e) {
    res
      .status(500)
      .json({ message: "Неудалось проверить существование файла" });
    console.warn("Неудалось проверить существование файла: ", e.message);
  }
};
