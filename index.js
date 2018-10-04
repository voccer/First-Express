const express = require("express");
const app = express();
//
var bodyParser = require("body-parser");
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//
const port = 3000;
//
app.set("view engine", "ejs");
app.set("views", "./views");
//
//sẽ đổi thành ejs sau này
//
var users = [
  { id: 1, name: "Ty" },
  { id: 2, name: "Suu" },
  { id: 3, name: "Dan" },
  { id: 4, name: "Mao" }
];
//
app.get("/", (req, res) => {
  res.render("index", {
    name: "AAA"
  });
});
app.get("/users", (req, res) => {
  res.render("users/index", {
    users: users
  });
});
app.get("/users/search", (req, res) => {
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
app.get("/users/create", (req, res) => {
  res.render("users/create");
});
app.post("/users/create", (req, res) => {
  users.push(req.body); // lưu lại tất cả những gì đang được nhập trong create page
  res.redirect("/users");
});
//
app.listen(port, () => {
  console.log("Listen in  port " + port);
});
