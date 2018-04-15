var fs = require("fs");
var formidable = require("formidable");

exports.upload = function(request, response) {
  console.log("Rozpoczynam obsługę żądania upload.");
  var form = new formidable.IncomingForm();
  form.parse(request, function(err, fields, files) {
    fileName = files.upload.name;
    fs.renameSync(files.upload.path, fileName);
    response.writeHead(200, { "Content-Type": "text/html" });

    fs.readFile("templates/upload.html", function(err, html) {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.write(html);
      response.end();
    });
  });
};
exports.welcome = function(request, response) {
  console.log("Rozpoczynam obsługę żądania welcome.");
  fs.readFile("templates/start.html", function(err, html) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.write(html);
    response.end();
  });
};

exports.css = function(request, response) {
  console.log("Rozpoczynam obsługę żądania css.");
  fs.readFile("css/main.css", function(err, file) {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(file);
    response.end();
  });
};

exports.uploadCss = function(request, response) {
  console.log("Rozpoczynam obsługę żądania css.");
  fs.readFile("css/upload.css", function(err, file) {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(file);
    response.end();
  });
};

exports.show = function(request, response) {
  fs.readFile(fileName, "binary", function(err, file) {
    response.writeHead(200, { "Content-Type": "image/png" });
    response.write(file, "binary");
    response.end();
  });
};

exports.error = function(request, response) {
  console.log("Nie wiem co robić.");
  response.write("404 :(");
  response.end();
};

exports.backgroundImage = function(request, response) {
  fs.readFile("templates/server.jpeg", function(error, file) {
    response.writeHead(200, { "Content-Type": "image/jpeg" });
    response.write(file);
    response.end();
  });
};
