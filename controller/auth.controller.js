module.exports = {
  login: (req, res) => {
    res.render("auth/login");
  },
  POSTlogin: (req, res) => {
    res.cookie("UserID", res.locals.user.id); /// chưa dang nhập bằng cookie được
    res.redirect("/users");
  }
};
