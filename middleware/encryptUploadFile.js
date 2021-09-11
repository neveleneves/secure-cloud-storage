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

    const algorithm = config.get("cryptoAlgorithm");
    const passwordEncrypt = config.get("cryptoFilePassword");

    let salt = config.get("cryptoSaltPassword") + encryptedFileDirName;
    salt = crypto.createHash("sha256").update(salt).digest("hex");

    const key = crypto.scryptSync(passwordEncrypt, salt, 32);

    const ivInit = Buffer.allocUnsafe(16, 0);
    const iv = crypto.createHash("md5").update(encryptedFileDirName).digest();
    iv.copy(ivInit);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

    fs.writeFileSync(encryptedFilePath, encrypted);

    req.file.uniqueName =
      encryptedFileDirName + path.extname(file.originalname);

    next();
  } catch (e) {
    res.status(500).json({ message: "Неудалось зашифровать загруженный файл" });
    console.warn("Неудалось зашифровать загруженный файл: ", e.message);
  }
};
