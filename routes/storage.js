const { Router } = require("express");
const path = require("path");
const fs = require("fs");

const { upload } = require("../middleware/uploadSigleFile");
const checkAuthStatus = require("../middleware/checkAuthStatus");
const checkStorageExist = require("../middleware/checkStorageExist");
const checkFileExist = require("../middleware/checkFileExist");

const StorageProfile = require("../models/StorageProfile");
const checkDirExist = require("../middleware/checkDirExist");

const router = Router();

//Current prefix /api/storage

//Route for upload file to storage
router.post(
  "/upload/:path(*)",
  [checkAuthStatus, checkStorageExist, upload.single("file"), checkDirExist],
  async (req, res) => {
    try {
      const { path } = req.params;
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
        unique_name: file.filename,
        parent_dir: userID,
        size: (file.size / 1024 / 1024).toFixed(2),
        path,
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
router.get(
  "/load/:path(*)",
  [checkAuthStatus, checkStorageExist, checkDirExist],
  async (req, res) => {
    try {
      const { path } = req.params;
      const userID = req.user.userLoginSuccess;
      if (!userID) {
        return res
          .status(400)
          .json({ message: "Идентификатор пользователя - отсутствует" });
      }

      const userStorage = await StorageProfile.find({
        parent_dir: userID,
        path,
      });
      if (!userStorage) {
        return res
          .status(400)
          .json({ message: "Файлы хранилища - не найдены" });
      }

      res.status(200).json(userStorage);
    } catch (e) {
      res
        .status(500)
        .json({ message: "Не удалось получить данные текущего хранилища" });
      console.warn(
        "Не удалось получить данные текущего хранилища: ",
        e.message
      );
    }
  }
);

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
        unique_name: fileName,
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

router.post(
  "/create_dir/:path(*)",
  [checkAuthStatus, checkStorageExist, checkDirExist],
  async (req, res) => {
    try {
      const { path } = req.params;
      const dirName = req.body.createNameDir;
      if (!dirName) {
        return res
          .status(400)
          .json({ message: `Невозможно создать директорию с таким именем` });
      }

      const userID = req.user.userLoginSuccess;
      const dirToCreate = await StorageProfile.find({
        name: dirName,
        parent_dir: userID,
        type: "directory",
        path,
      });
      if (dirToCreate.length) {
        return res
          .status(400)
          .json({ message: `Директория с таким именем уже существует` });
      }

      const newDirectory = new StorageProfile({
        name: dirName,
        unique_name: dirName,
        parent_dir: userID,
        type: "directory",
        path,
        // size: (file.size / 1024 / 1024).toFixed(2),
      });
      await newDirectory.save();

      res.status(200).json({ message: "Директория успешно создана" });
    } catch (e) {
      res.status(500).json({ message: "Не удалось создать директорию" });
      console.warn("Не удалось создать директорию: ", e.message);
    }
  }
);

module.exports = router;
