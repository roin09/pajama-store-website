// const express = require("express");
// var fs = require("fs");
// const path = require("path");
// const app = express();
// const React = require("react");
// const reactDomServer = require("react-dom/server");
// const routers = require("../client/src/router");
// const reactRouter = require("react-router");
// let { match, RouterContext } = reactRouter;

// module.exports = function (app) {
//   app.get("*", (req, res) => {
//     fs.readFile(
//      path.resolve("../client/public/index.html"),
//     "utf8", (err, redirect, props) => {
//       const appHtml = reactDomServer.renderToString(
//         <RouterContext {...props} />
//       );
//       res.send(renderPage(appHtml));
//     });
//   });
// };
