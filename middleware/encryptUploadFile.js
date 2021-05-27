const crypto = require("crypto");
const fs = require("fs");
const pathInit = require("path");

//Middleware for encrypt uploaded file
module.exports = async function encryptUploadFile(req, res, next) {
  try {
    const userID = req.user.userLoginSuccess;

    const filePath = pathInit.join(
      __dirname,
      "..",
      `/uploads/${userID}/17.05.flp-1622127328883.flp`
    );

    fs.readFile(filePath, (err, fileBufferData) => {
      // const ENC_KEY = Buffer.from(
      //   "bf3c199c2470cb477d907b1e0917c17bbf3c199c2470cb477d907b1e0917c17b",
      //   "hex"
      // ); // set random encryption key
      // const IV = Buffer.from("5183666c72eec9e45183666c72eec9e4", "hex"); // set random initialisation vector

      // const encrypt = (fileToEncrypt) => {
      //   let cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, IV);
      //   let encrypted = cipher.update(fileToEncrypt, "utf8", "base64");
      //   encrypted += cipher.final("base64");
      //   return encrypted;
      // };

      // const decrypt = (fileToDecrypt) => {
      //   let decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
      //   let decrypted = decipher.update(fileToDecrypt, "base64", "utf8");
      //   return decrypted + decipher.final("utf8");
      // };

      // const encrypted_key = encrypt(fileBufferData); 
      // // console.log(typeof encrypted_key);
      // const original_phrase = decrypt(encrypted_key);
      // // console.log(original_phrase);

    });

    next();
  } catch (e) {
    res.status(500).json({ message: "Неудалось зашифровать загруженный файл" });
    console.warn("Неудалось зашифровать загруженный файл: ", e.message);
  }
};
