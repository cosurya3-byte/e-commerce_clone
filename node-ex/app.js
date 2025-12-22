var http = require("http");

http
  .createServer(function (req, res) {
    res.write("Welcome Back Alien!!!");
  })
  .listen(8080);
