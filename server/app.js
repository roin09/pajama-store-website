var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyparser = require("body-parser");
var logger = require("morgan");
var fs = require("fs");
var cors = require("cors");
const redis = require("./utils/redis");
var userRouter = require("./routes/user");
var authRouter = require("./routes/auth");
var adminRouter = require("./routes/admin");
var favicon = require("serve-favicon");
var CWebp = require("cwebp");
const mongoose = require("mongoose");
require("dotenv").config();
// const redis = require("redis");
// require("dotenv").config();

// (async () => {
//   const client = redis.createClient();

//   client.on("error", (err) => console.log("Redis Client Error", err));

//   await client.connect();

//   await client.set("key", "value");
//   console.log("Redis Connected!");
//   const value = await client.get("key");
//   console.log(value);
// })();

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
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000",PORT]
    credentials: true, // 모든 출처 허용 옵션. true 를 써도 된다.
  })
);

app.use(cookieParser());

const options = { maxAge: "1d", immutable: true };
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use(favicon(path.join(__dirname, "../client/build", "favicon.ico")));
// app.get("/react", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/public/index.html"));
//   res.end();
// });

// app.use(
//   "/react",
//   express.static(path.join(__dirname, "../client/public"), options)
// );

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"), options);
});
app.use(express.static(path.join(__dirname, "../client/build"), options));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// catch 404 and forward to error handler
app.use("*", function (req, res) {
  express.static(path.join(__dirname, "../client/build"), options);
});
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
