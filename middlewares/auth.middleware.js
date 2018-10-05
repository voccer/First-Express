var db = require("../db");

module.exports = {
  requiredAuth: (req, res, next) => {
    console.log(req.cookies.UserID + "auth middle");

    if (!req.cookies.UserID) {
      res.redirect("auth/login");
      return;
    }
    var user = db
      .get("users")
      .find({ id: req.cookies.UserID })
      .value();
    if (!user) {
      res.redirect("auth/login");
      return;
    }
    next();
  }
};
