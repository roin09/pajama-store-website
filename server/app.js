var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fs = require("fs");

var userRouter = require("./routes/user");
const mongoose = require("mongoose");
require("dotenv").config();

var app = express();
const port = process.env.PORT || 4000;
app.listen(port);

// 동적요청에 대한 응답을 보낼때 etag 를 생성하지 않도록
app.set("etag", false);

// 정적요청에 대한 응답을 보낼때 etag 생성을 하지 않도록

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conected"))
  .catch((err) => {
    console.log(err);
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
var cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("/react", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
  res.end();
});
const options = { etag: false };
app.use(
  "/react",
  express.static(path.join(__dirname, "../client/public"), options)
);
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/main.html"));
});
app.use("/", express.static(path.join(__dirname, "public"), options));

app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
