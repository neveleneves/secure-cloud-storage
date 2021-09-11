const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const config = require("config");

const StorageProfile = require("../models/StorageProfile");

//Middleware for encrypt uploaded file
module.exports = async function decryptUploadFile(req, res, next) {
  try {
    const fileName = req.params.file;
    const userID = req.user.userLoginSuccess;

    let encryptedFileDirName = fileName.split(".");
    encryptedFileDirName.pop();
    encryptedFileDirName = encryptedFileDirName.join(".");

    const encryptedFilePath = path.join(
      __dirname,
      "..",
      `/uploads` +
        `/${userID}` +
        `/${encryptedFileDirName}` +
        `/${encryptedFileDirName + ".enc"}`
    );
    if (!fs.existsSync(encryptedFilePath)) {
      return res
        .status(400)
        .json({ message: "Указан несуществующий файл или путь" });
    }

    const bufferEncryptFile = fs.readFileSync(encryptedFilePath);
    const algorithm = config.get("cryptoAlgorithm");
    const passwordEncrypt = config.get("cryptoFilePassword");

    let salt = config.get("cryptoSaltPassword") + encryptedFileDirName;
    salt = crypto.createHash("sha256").update(salt).digest("hex");

    const key = crypto.scryptSync(passwordEncrypt, salt, 32);

    const ivInit = Buffer.allocUnsafe(16, 0);
    const iv = crypto.createHash("md5").update(encryptedFileDirName).digest();
    iv.copy(ivInit);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(bufferEncryptFile),
      decipher.final(),
    ]);

    req.buffer = decrypted;

    next();
  } catch (e) {
    res.status(500).json({ message: "Неудалось зашифровать загруженный файл" });
    console.warn("Неудалось зашифровать загруженный файл: ", e.message);
  }
};
