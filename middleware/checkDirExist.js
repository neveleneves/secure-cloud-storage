const StorageProfile = require("../models/StorageProfile");

//Middleware for check a directory exist
module.exports = async function checkDirExist(req, res, next) {
  try {
    const fullPath = req.params.path;
    if (!fullPath) {
      return res.status(400).json({ message: "Путь до директории - неверный" });
    }
    const userID = req.user.userLoginSuccess;

    const dirLocation = fullPath.replace("root", userID).split("/");
    const dirToCheck = dirLocation[dirLocation.length - 1];
    dirLocation.pop();

    const pathToDirectory = dirLocation.join("/");

    const directoryExist = await StorageProfile.findOne({
      name: dirToCheck,
      path: `/${pathToDirectory}`,
      type: "directory",
    });
    if (!directoryExist) {
      return res
        .status(400)
        .json({ message: "Такой директории - не существует" });
    }

    if (!pathToDirectory) req.params.path = `/${dirToCheck}`;
    else req.params.path = `/${pathToDirectory}/${dirToCheck}`;
    
    next();
  } catch (e) {
    res
      .status(500)
      .json({ message: "Неудалось проверить существование директории" });
    console.warn("Неудалось проверить существование директории: ", e.message);
  }
};
