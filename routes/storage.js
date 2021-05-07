const { Router } = require("express");
const path = require("path");
const fs = require("fs");

const { upload } = require("../middleware/uploadSigleFile");
const checkAuthStatus = require("../middleware/checkAuthStatus");
const checkStorageExist = require("../middleware/checkStorageExist");
const checkFileExist = require("../middleware/checkFileExist");

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
        return res
          .status(400)
          .json({ message: "Идентификатор пользователя - отсутствует" });
      }

      const PARENT_PATH = `./uploads/${userID}`;

      let currentDir = file.destination.replace(PARENT_PATH, ``);
      if (!currentDir) currentDir = `/`;

      let type = file.mimetype.split("/")[0];
      if (type === "application" || type === "text") {
        type = "document";
      } else if (type === "video" || "image" || "audio") {
        type = "media";
      }

      const newFile = new StorageProfile({
        name: file.originalname,
        parent_dir: userID,
        path: currentDir,
        size: (file.size / 1024 / 1024).toFixed(2),
        type,
      });
      await newFile.save();

      res.status(200).json({ message: "Файл успешно отправлен в хранилище" });
    } catch (e) {
      res.status(500).json({ message: "Не удалось загрузить файл" });
      console.warn("Не удалось загрузить файл: ", e.message);
    }
  }
);

//Route for load user-storage
router.get("/load", [checkAuthStatus, checkStorageExist], async (req, res) => {
  try {
    const userID = req.user.userLoginSuccess;
    if (!userID) {
      return res
        .status(400)
        .json({ message: "Идентификатор пользователя - отсутствует" });
    }

    const userStorage = await StorageProfile.find({
      parent_dir: userID,
    });
    if (!userStorage) {
      return res.status(400).json({ message: "Файлы хранилища - не найдены" });
    }

    res.status(200).json(userStorage);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Не удалось получить данные текущего хранилища" });
    console.warn("Не удалось получить данные текущего хранилища: ", e.message);
  }
});

//Route for download file from server by id
router.get(
  "/download/:file(*)",
  [checkAuthStatus, checkStorageExist, checkFileExist],
  async (req, res) => {
    try {
      const fileName = req.params.file;
      const userID = req.user.userLoginSuccess;

      const filePath = path.join(
        __dirname,
        "..",
        `/uploads/${userID}/${fileName}`
      );

      res.download(filePath);
    } catch (e) {
      res
        .status(500)
        .json({ message: "Не удалось загрузить файл с хранилища" });
      console.warn("Не удалось загрузить файл с хранилища: ", e.message);
    }
  }
);

//Route for delete file from server by id
router.delete(
  "/delete/:file(*)",
  [checkAuthStatus, checkStorageExist, checkFileExist],
  async (req, res) => {
    try {
      const fileName = req.params.file;
      const userID = req.user.userLoginSuccess;

      const deletedFile = await StorageProfile.findOneAndDelete({
        parent_dir: userID,
        name: fileName,
      });
      if (!deletedFile) {
        return res
          .status(400)
          .json({ message: "Не удалось удалить выбранный файл" });
      }

      const filePath = path.join(
        __dirname,
        "..",
        `/uploads/${userID}/${fileName}`
      );

      fs.unlink(filePath, (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Не удалось удалить выбранный файл" });
        }
        res.status(200).json({ message: "Файл успешно удалён с хранилища" });
      });
    } catch (e) {
      res.status(500).json({ message: "Не удалось удалить файл с хранилища" });
      console.warn("Не удалось удалить файл с хранилища: ", e.message);
    }
  }
);

//Route for delete directory from server by id
// router.delete(
//   "/delete/:file(*)",
//   [checkAuthStatus, checkStorageExist, checkFileExist],
//   async (req, res) => {
//     try {
//       const fileName = req.params.file
//       const userID = req.user.userLoginSuccess;

//       const file = path.join(__dirname, '..', `/uploads/${userID}/${fileName}`);

//     } catch (e) {
//       res.status(500).json({ message: "Не удалось удалить файл с хранилища" });
//       console.warn("Не удалось удалить файл с хранилища: ", e.message);
//     }
//   }
// );

module.exports = router;
