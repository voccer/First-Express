const express = require("express");
var AuthController = require("../controller/auth.controller");
var validate = require("../validate/auth.validate");
const routes = express.Router();

routes.get("/login", AuthController.login);
routes.post("/login", validate.POSTlogin, AuthController.POSTlogin);
module.exports = routes;
