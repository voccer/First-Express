const express = require("express");
var db = require("../db");

//
var UserController = require("../controller/user.controller");
//
const routes = express.Router();

routes.get("/", UserController.listUser);
routes.get("/search", UserController.search);
//
routes.get("/create", (req, res) => {
  res.render("users/create");
});
routes.post("/create", UserController.create);
//
routes.get("/:id", UserController.viewUser); //dinamic param sử dụng toán tử ":"
//
module.exports = routes;
