const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");

//

//
var bodyParser = require("body-parser");
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//
app.use(cookieParser("sajflasdjfasfsskd"));
//
//
const port = 3000;
//
app.set("view engine", "ejs");
app.set("views", "./views");
//Try cập các file static cung cấp cho địa chi tuyệt đối vd: /images/anh.png
app.use(express.static("public"));
//
//
app.get("/", (req, res) => {
  res.render("index");
});
//connect rountes
var userRoute = require("./routes/user.routes");
var authRoute = require("./routes/auth.routes");
app.use("/users", userRoute);
app.use("/auth", authRoute);
//
app.listen(port, () => {
  console.log("Listen in  port " + port);
});
