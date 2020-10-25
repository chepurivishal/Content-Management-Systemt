var express = require("express");
var app = express();
var mongoose = require("mongoose");
var config = require("./config.json");
var cors = require("cors");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose.connect(config.mongo);

var userAppListener = require("./REST API's/user.rest");
var blogApplistener = require("./REST API's/blog.rest");
var middleware = require("./middleware");

middleware(app);
userAppListener(app);
blogApplistener(app);

app.listen(config.port);
