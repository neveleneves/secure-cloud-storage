const jwt = require("jsonwebtoken");
const config = require("config");

//Middleware for check a user authorized
module.exports = function checkAuthStatus(req, res, next) {
  const tokenCookie = req.cookies.token;

  if (!tokenCookie) {
    return res.status(401).json({ message: "Пользователь не авторизирован" });
  }

  jwt.verify(tokenCookie, config.get("JWTsecret"), (err, user) => {
    if (err) {
      if (req.session) {
        req.session.destroy();
      }
      res.clearCookie("token");
      res.clearCookie("sid");

      res.cookie("token", {}, { maxAge: -1 });
      res.cookie("sid", {}, { maxAge: -1 });

      return res.status(401).json({ message: "Недействительный JWT" });
    }

    req.user = user;
    next();
  });
};
