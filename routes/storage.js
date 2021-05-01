const { Router } = require("express");
const { upload } = require("../middleware/uploadSigleFile");
const checkAuthStatus = require("../middleware/checkAuthStatus");
const checkStorageExist = require("../middleware/checkStorageExist");

const StorageProfile = require("../models/StorageProfile");

const router = Router();

//Current prefix /api/storage

//Route for upload file to storage
router.post(
  "/upload",
  [checkAuthStatus, checkStorageExist, upload.single("file")],
  async (req, res) => {
    try {
      const { file } = req;

      if (!file) {
        return res.status(400).json({ message: "Файл не был загружен" });
      }

      const userID = req.user.userLoginSuccess;
      if (!userID) {
        return res.status(400).json({ message: "Идентификатор не найден" });
      }

      const PARENT_PATH = `./uploads/${userID}`;

      let currentDir = file.destination.replace(PARENT_PATH, ``);
      if (!currentDir) currentDir = `/`;

      const newFile = new StorageProfile({
        name: file.originalname,
        parent_dir: userID,
        path: currentDir,
        type: "file",
      });
      await newFile.save();

      res.send(file);
    } catch (e) {
      res.status(500).json({ message: "Не удалось загрузить файл" });
      console.warn("Не удалось загрузить файл: ", e.message);
    }
  }
);

//Route for load user-storage
router.get(
  "/load", 
  [checkAuthStatus, checkStorageExist], 
  async (req, res) => {
  try {
    const userID = req.user.userLoginSuccess;
    if (!userID) {
      return res.status(400).json({ message: "Идентификатор не найден" });
    }

    const userStorage = await StorageProfile.find({
      parent_dir: userID,
    });
    if (!userStorage) {
      return res.status(400).json({ message: "Файлы хранилища - не найдены" });
    }

    res.status(200).json(userStorage);
  } catch (e) {
    res.status(500).json({ message: "Не удалось получить данные текущего хранилища" });
    console.warn("Не удалось получить данные текущего хранилища: ", e.message);
  }
});

module.exports = router;
