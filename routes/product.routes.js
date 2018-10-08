const express = require("express");
//
var ProductController = require("../controller/product.controller");
//
// var validate = require("../validate/product.validate");
//
const routes = express.Router();
//
routes.get("/", ProductController.listProduct);
routes.get("/search", ProductController.searchPro);
routes.get("/create", ProductController.GETcreatePro);
routes.post("/create", ProductController.POSTcreatePro);
routes.get("/:id", ProductController.getProduct); //dinamic param sử dụng toán tử ":"
module.exports = routes;
