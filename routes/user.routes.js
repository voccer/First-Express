const express = require("express");
var db = require("../db");

//
var UserController = require("../controller/user.controller");
//
const routes = express.Router();

routes.get("/", UserController.listUser);
routes.get("/search", UserController.search);
routes.get("/create", UserController.GETcreate);
routes.post("/create", UserController.POSTcreate);
routes.get("/:id", UserController.getUser); //dinamic param sử dụng toán tử ":"
module.exports = routes;
