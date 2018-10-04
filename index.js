const express = require("express");
const app = express();
//
var bodyParser = require("body-parser");
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write();
//

var shortid = require("shortid");

//

const port = 3000;
//
app.set("view engine", "ejs");
app.set("views", "./views");
//
//sẽ đổi thành ejs sau này
//
// var users = [
//   { id: 1, name: "Ty" },
//   { id: 2, name: "Suu" },
//   { id: 3, name: "Dan" },
//   { id: 4, name: "Mao" }
// ];
//
app.get("/", (req, res) => {
  res.render("index", {
    name: "Ta Cao Canh"
  });
});
app.get("/users", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
});
app.get("/users/search", (req, res) => {
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
app.get("/users/create", (req, res) => {
  res.render("users/create");
});
app.post("/users/create", (req, res) => {
  db.get("users")
    .push({
      id: shortid.generate(),
      name: req.param("name"),
      email: req.param("email")
    })
    //cách 2:
    //req.body.id=id;
    // .push(req.body)
    .write();
  // users.push(req.body); // lưu lại tất cả những gì đang được nhập trong create page
  res.redirect("/users");
});
//
app.get("/users/:id", (req, res) => {
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
app.listen(port, () => {
  console.log("Listen in  port " + port);
});
