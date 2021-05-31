const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const config = require("config");

//Middleware for encrypt uploaded file
module.exports = async function encryptUploadFile(req, res, next) {
  try {
    const userID = req.user.userLoginSuccess;

    const { file } = req;
    const { buffer } = file;
    if (!buffer || !file) {
      return res.status(404).json({ message: "Загруженный файл не найден" });
    }

    const algorithm = "aes-256-cbc";
    const passwordEncrypt = config.get("encryptFilePassword");

    const key = crypto.scryptSync(passwordEncrypt, "salt", 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

    const fileName = file.originalname.split(".");
    fileName.pop();

    const encryptedFileDirName = fileName.join(".") + "-" + Date.now();
    const encryptedFileDirPath = path.join(
      __dirname,
      "..",
      `/uploads/${userID}/${encryptedFileDirName}`
    );
    if (fs.existsSync(encryptedFileDirPath)) {
      return res.status(400).json({ message: "Такой файл уже существует" });
    }
    fs.mkdirSync(encryptedFileDirPath);

    const encryptedFileName = encryptedFileDirName + ".enc";
    const encryptedFilePath = path.join(
      encryptedFileDirPath + `/${encryptedFileName}`
    );
    fs.writeFileSync(encryptedFilePath, encrypted);

    req.file.uniqueName =
      encryptedFileDirName + path.extname(file.originalname);

    next();
  } catch (e) {
    res.status(500).json({ message: "Неудалось зашифровать загруженный файл" });
    console.warn("Неудалось зашифровать загруженный файл: ", e.message);
  }
};
