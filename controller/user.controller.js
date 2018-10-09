var express = require("express");
const routes = express.Router();
var md5 = require("md5");
var shortid = require("shortid");
var db = require("../config/db");
//
var bodyParser = require("body-parser");
// support parsing of application/json type post data
routes.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
routes.use(bodyParser.urlencoded({ extended: true }));
//
module.exports = {
  listUser: (req, res) => {
    res.render("users/index", {
      users: db.get("users").value()
    });
  },
  search: (req, res) => {
    var users = db.get("users").value();
    var _name = req.query._name;
    var mathchUsers = users.filter(user => {
      return user.name.toLowerCase().indexOf(_name.toLowerCase()) != -1;
    });
    res.render("users/index", {
      users: mathchUsers
    });
  },
  GETcreate: (req, res) => {
    res.render("users/create");
  },
  POSTcreate: (req, res) => {
    req.body.id = shortid.generate();
    req.body.password = md5(req.body.password);
    db.get("users")
      .push(req.body)
      .write();
    res.redirect("/users");
  },
  getUser: (req, res) => {
    var id = req.params.id;
    var user = db
      .get("users")
      .find({ id: id })
      .value();
    res.render("users/view", {
      user: user
    });
  }
};
