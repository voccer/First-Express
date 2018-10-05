module.exports = {
  POSTcreate: (req, res, next) => {
    let Err = [];
    if (!req.body.name) {
      Err.push("Name is required!!");
    }
    if (!req.body.email) {
      Err.push("Email is required!!");
    }
    if (!req.body.password) {
      Err.push("Password is required!!");
    } else if (req.body.password.length < 5) {
      Err.push("Password is too weak!!");
    }

    if (Err.length > 0) {
      res.render("users/create", {
        Err: Err,
        Value: req.body
      });
      return;
    }
    next();
  }
};
