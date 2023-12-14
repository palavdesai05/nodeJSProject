const express = require('express');
const router = require('./routes/routes.js');
const bodyParser  = require('body-parser');
const app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('./database/connection');
const expressSession = require("express-session");

global.loggedIn = null;
global.loggedUserType = null;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use("*", (req, res, next) => {
  if (req.session) {
    loggedIn = req.session.userId;
    loggedUserType = req.session.userType;
  } else {
    loggedIn = req.session?.userId;
    loggedUserType = req.session?.userType;
  }
  next();
});
app.use(
  expressSession({
    secret: "Palav Desai",
  })
);

app.use(express.static ("public"));
app.set("view engine","ejs");

app.use('/',router);

app.listen(5000,() => {
    console.log("App is listening at port 5000!");
});
