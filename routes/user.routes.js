const express = require("express");
var db = require("../db");
var shortid = require("shortid");
//
//
const routes = express.Router();
//
var bodyParser = require("body-parser");
// support parsing of application/json type post data
routes.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
routes.use(bodyParser.urlencoded({ extended: true }));

routes.get("/", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
});
routes.get("/search", (req, res) => {
  var users = db.get("users").value();
  var _name = req.query._name.toLowerCase();
  var mathchUsers = users.filter(user => {
    var userName = user.name.toLowerCase();
    return userName.indexOf(_name) != -1;
    // return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
  });
  res.render("users/index", {
    users: mathchUsers
  });
});
//
routes.get("/create", (req, res) => {
  res.render("users/create");
});
routes.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  // cach 2:   {id: shortid.generate(),
  //            name: req.param("name"),
  //            email: req.param("email")}

  res.redirect("/");
});
//
routes.get("/:id", (req, res) => {
  //dinamic param sử dụng toán tử ":"
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/view", {
    user: user
  });
});
//

module.exports = routes;
