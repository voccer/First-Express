var db = require("../config/db");

module.exports = {
  requiredAuth: (req, res, next) => {
    if (!req.signedCookies.UserID) {
      res.redirect("/auth/login");
      return;
    }
    var user = db
      .get("users")
      .find({ id: req.signedCookies.UserID })
      .value();
    if (!user) {
      res.redirect("/auth/login");
      return;
    }
    next();
  }
};
