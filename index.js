const http = require("http");
var fs = require("fs");
const url = require("url");
let productTemplate = fs
  .readFileSync("templates/template_product.html")
  .toString();
let cardTemplate = fs.readFileSync("templates/template_card.html").toString();
let overviewTemplate = fs
  .readFileSync("templates/template_overview.html")
  .toString();
let rawData = fs.readFileSync("data.json");
let Jsondata = JSON.parse(rawData);
const server = http.createServer(function(req, res) {
  var path = req.url;
  var id = url.parse(path, true).query.id;
  var path = url.parse(path, true).pathname;

  if (path == "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    var reader = fs.createReadStream("data.json");
    reader.pipe(res);
  } else if (path == "/products") {
    var replace = require("./replace.js");
    res.writeHead(200, { "content-type": "text/html" });
    res.end(replace(productTemplate, id));
  } else if (path == "/" || path == "/overview") {
    var articleCode = "";
    for (var i = 0; i < Jsondata.length; i++) {
      var replace = require("./replace.js");
      var eachArticle = replace(cardTemplate, i);
      articleCode += eachArticle;
    }
    var output = overviewTemplate.replace(/{%PRODUCT_CARDS%}/g, articleCode);
    res.writeHead(200, { "content-type": "text/html" });
    res.end(output);
  } else {
    res.writeHead(404);
    res.end("PAGE NOT FOUND 404");
  }
});
var port = process.env.PORT || 80;
server.listen(port);
console.log("Server has started at: " + port);
