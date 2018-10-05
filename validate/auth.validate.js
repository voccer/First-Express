var db = require("../db");
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
    if (user.password !== password) {
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
