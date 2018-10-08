var express = require("express");
const routes = express.Router();
var shortid = require("shortid");
var db = require("../db");
//
var bodyParser = require("body-parser");
routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));
//
module.exports = {
  listProduct: (req, res) => {
    res.render("product/index", {
      product: db.get("product").value()
    });
  },
  searchPro: (req, res) => {
    var product = db.get("product").value();
    var searchPro = req.query.searchPro;
    var matchPro = product.filter(product => {
      return (
        product.namePro.toLowerCase().indexOf(searchPro.toLowerCase()) != -1 ||
        product.classification.toLowerCase().indexOf(searchPro.toLowerCase()) !=
          -1
      );
    });
    res.render("product/index", {
      product: matchPro
    });
  },
  GETcreatePro: (req, res) => {
    res.render("product/create");
  },
  POSTcreatePro: (req, res) => {
    req.body.id = shortid.generate();
    db.get("product")
      .push(req.body)
      .write();
    res.redirect("/product");
  },
  getProduct: (req, res) => {
    var id = req.params.id;
    var product = db
      .get("product")
      .find({ id: id })
      .value();
    res.render("product/view", {
      product: product
    });
  }
};
