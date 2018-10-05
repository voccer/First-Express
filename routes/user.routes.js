const express = require("express");
//
var UserController = require("../controller/user.controller");
//
var validate = require("../validate/user.validate");
//
var authMiddleware = require("../middlewares/auth.middleware");
//
const routes = express.Router();
//
routes.get("/", authMiddleware.requiredAuth, UserController.listUser);
routes.get("/search", UserController.search);
routes.get("/create", UserController.GETcreate);
routes.post("/create", validate.POSTcreate, UserController.POSTcreate);
routes.get("/:id", UserController.getUser); //dinamic param sử dụng toán tử ":"
module.exports = routes;
