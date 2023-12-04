const http = require("http");

http
  .createServer(function(req, res) {
    res.end();
  })
  .listen(8077, "0.0.0.0");
