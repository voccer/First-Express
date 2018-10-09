module.exports = {
  login: (req, res) => {
    res.render("auth/login");
  },
  POSTlogin: (req, res, next) => {
    res.cookie("UserID", res.locals.user.id, { signed: true }); /// chưa dang nhập bằng cookie được
    res.redirect("/");
    // next();
  }
};
