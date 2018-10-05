var express = require("express");
const routes = express.Router();

var shortid = require("shortid");
var db = require("../db");
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
  create: (req, res) => {
    req.body.id = shortid.generate();
    db.get("users")
      .push(req.body)
      .write();
    // cach 2:   {id: shortid.generate(),
    //            name: req.param("name"),
    //            email: req.param("email")}

    res.redirect("/users");
  },
  viewUser: (req, res) => {
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
