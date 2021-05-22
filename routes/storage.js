const { Router } = require("express");
const pathInit = require("path");
const archiver = require("archiver");
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
  "/download/file/:file(*)",
  [checkAuthStatus, checkStorageExist, checkFileExist],
  async (req, res) => {
    try {
      const fileName = req.params.file;
      const userID = req.user.userLoginSuccess;

      const filePath = pathInit.join(
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
  "/delete/file/:file(*)",
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

      const filePath = pathInit.join(
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

//Route for create a new directory on server
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

      res.status(201).json({ message: "Директория успешно создана" });
    } catch (e) {
      res.status(500).json({ message: "Не удалось создать директорию" });
      console.warn("Не удалось создать директорию: ", e.message);
    }
  }
);

//Route for download directory from server by path
router.get(
  "/download/dir/:path(*)",
  [checkAuthStatus, checkStorageExist, checkDirExist],
  async (req, res) => {
    try {
      const { path } = req.params;
      const userID = req.user.userLoginSuccess;

      const relatedFiles = await StorageProfile.find({
        parent_dir: userID,
        type: { $in: ["media", "document"] },
        path: { $regex: path, $options: "m" },
      });
      if (!relatedFiles.length) {
        return res
          .status(204)
          .json({ message: `Файлы в данной директории - отсутствуют` });
      }

      const filesPath = pathInit.join(__dirname, "..", `/uploads/${userID}`);
      const archiveName = path.split("/").pop();
      const newFilePath = filesPath + `/${archiveName}.zip`;

      if (fs.existsSync(newFilePath)) {
        fs.unlinkSync(newFilePath, (err) => {
          if (err) {
            return res
              .status(400)
              .json({ message: "Не удалось удалить выбранный файл" });
          }
        });
      }

      const output = fs.createWriteStream(newFilePath);

      const archive = archiver("zip", {
        zlib: { level: 9 },
      });

      archive.on("warning", (err) => {
        if (err.code === "ENOENT") {
          console.warn(err.message);
        } else {
          throw err;
        }
      });

      archive.on("error", (err) => {
        throw err;
      });

      archive.pipe(output);

      relatedFiles.forEach((fileFromDB) => {
        let fileToArchive = filesPath + `/${fileFromDB.unique_name}`;
        archive.append(fs.createReadStream(fileToArchive), {
          name: `${fileFromDB.unique_name}`,
        });
      });

      output.on("close", () => {
        const archivePath = pathInit.join(
          __dirname,
          "..",
          `/uploads/${userID}/${archiveName}.zip`
        );
        res.download(archivePath);
      });

      await archive.finalize();
    } catch (e) {
      res
        .status(500)
        .json({ message: "Не удалось загрузить директорию с хранилища" });
      console.warn("Не удалось загрузить директорию с хранилища: ", e.message);
    }
  }
);

//Route for delete dir from server by path
router.delete(
  "/delete/dir/:path(*)",
  [checkAuthStatus, checkStorageExist, checkDirExist],
  async (req, res) => {
    try {
      const { path } = req.params;
      const userID = req.user.userLoginSuccess;

      const relatedFiles = await StorageProfile.find({
        parent_dir: userID,
        type: { $in: ["media", "document", "directory"] },
        path: { $regex: path, $options: "m" },
      });
      // if (!relatedFiles.length) {
      //   return res
      //     .status(204)
      //     .json({ message: `Файлы в данной директории - отсутствуют` });
      // }

      const filesPath = pathInit.join(__dirname, "..", `/uploads/${userID}`);

      for (let docFromDB of relatedFiles) {
        if (docFromDB.type === "directory") {
          console.log()
          const deletedDirectory = await StorageProfile.deleteOne({
            name: docFromDB.name,
            parent_dir: docFromDB.parent_dir,
            path: docFromDB.path,
          });
          if (!deletedDirectory) {
            return res
              .status(400)
              .json({ message: "Не удалось удалить директорию с хранилища" });
          }
        } else if (
          docFromDB.type === "media" ||
          docFromDB.type === "document"
        ) {
          const fileToRemovePath = filesPath + `/${docFromDB.unique_name}`;

          if (fs.existsSync(fileToRemovePath)) {
            fs.unlinkSync(fileToRemovePath, (err) => {
              if (err) {
                return res
                  .status(400)
                  .json({ message: "Не удалось удалить выбранный файл" });
              }
            });

            const deletedFile = await StorageProfile.deleteOne({
              unique_name: docFromDB.unique_name,
              parent_dir: docFromDB.parent_dir,
              path: docFromDB.path,
            });
            if (!deletedFile) {
              return res
                .status(400)
                .json({ message: "Не удалось удалить выбранный файл" });
            }
          }
        }
      }

      const mainDirectoryName = path.split("/").pop();
      const mainDirectoryPath = path.replace(`/${mainDirectoryName}`, "");

      console.log(mainDirectoryName)
      console.log(mainDirectoryPath)
      const deletedDirectory = await StorageProfile.deleteOne({
        unique_name: mainDirectoryName,
        parent_dir: userID,
        path: mainDirectoryPath,
      });
      if (!deletedDirectory) {
        return res
          .status(400)
          .json({ message: "Не удалось удалить выбранный файл" });
      }

      res.status(200).json({ message: "Директория успешно удалена" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Не удалось удалить директорию с хранилища" });
      console.warn("Не удалось удалить директорию с хранилища: ", e.message);
    }
  }
);
module.exports = router;
