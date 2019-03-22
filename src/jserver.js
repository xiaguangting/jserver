const express = require("express");
const app = express();
var router = require("./control/router");
var sd = require("silly-datetime");
var morgan = require("morgan");
var fs = require("fs");
var path = require("path");
var settings = require("./settings");

var server = app.listen(settings.port, function () {
  console.log("Listen port " + settings.port + "\nQuit the server with CTRL-BREAK.");
});

// 全局捕捉异常
process.on("uncaughtException", function (err) {
  console.log(err);
  console.log(err.stack);
});

router(app);


// var accessLogStream = fs.createWriteStream(path.join(__dirname, "../log/jserver.log"), {flags: "a"});
// app.use(morgan("default", {stream: accessLogStream}));

// 通过req的hearers来获取客户端ip
// var getIp = function(req) {
//     var ip = req.headers["x-real-ip"] ||
//         req.headers["x-forwarded-for"] ||
//         req.socket.remoteAddress || "";
//     if (ip.split(",").length > 0) {
//         ip = ip.split(",")[0];
//     }
//     return ip;
// };
//
// app.use(function (req,resp,next) {
//     var host = server.address().address;
//     var port = server.address().port;
//     var current_time = sd.format(new Date(), "YYYY-MM-DD HH:mm");
//     console.log("[" + current_time + "]" + host + " " + port);
//     console.log(getIp(req));
// });
