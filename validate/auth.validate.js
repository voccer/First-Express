var db = require("../config/db");
var md5 = require("md5");
module.exports = {
  POSTlogin: (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var user = db
      .get("users")
      .find({ email: email })
      .value();
    if (!user) {
      res.render("auth/login", {
        errors: ["User does not existed!!!"],
        Value: req.body
      });
      return;
    }
    var hashReq = md5(password);
    if (user.password !== hashReq) {
      res.render("auth/login", {
        errors: [" The password uncorrect!!!"],
        Value: req.body
      });
      return;
    }
    res.locals.user = user;
    next();
  }
};
