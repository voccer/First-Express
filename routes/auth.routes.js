const express = require("express");
const passport = require("passport");
var AuthController = require("../controller/auth.controller");
var validate = require("../validate/auth.validate");
const routes = express.Router();

routes.get("/login", AuthController.login);
routes.post("/login", validate.POSTlogin, AuthController.POSTlogin);
//facebook login
// routes.get("/facebook", passport.authenticate("facebook"));
// routes.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     failureRedirect: "/login",
//     successRedirect: "/"
//   }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );
module.exports = routes;
