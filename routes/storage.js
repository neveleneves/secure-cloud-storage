const { Router } = require("express");
const { upload } = require("../middleware/uploadSigleFile");
const checkAuthStatus = require('../middleware/checkAuthStatus');

const router = Router();

//Current prefix /api/storage

router.post("/upload", [checkAuthStatus, upload.single("file")], (req, res) => {
  try {
      const {file} = req
      if (!file) {
        res.status(400).json({message: 'Файл не был загружен'})
      } 
      res.send(file)
  } catch (err) {
    res.status(500).json({message: 'Не удалось загрузить файл'})
    console.warn("Не удалось загрузить файл: ", e.message);
  }
});

module.exports = router;
