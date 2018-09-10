
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs  = require('express-handlebars')
var request = require("request");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = 3000;
var app = express();

app.use(logger("dev"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')




console.log("if you like Hockey, you will love this scraper");
mongoose.connect("mongodb://localhost/news_db")
app.get("/scrape", function(req, res) {

    request("https://www.nhl.com/", function(error, response, html) {

  
     var $ = cheerio.load(html);

    var results = [];
    $("h4.headline-link").each(function(i, element) {
    var title = $(element).text();
    var link = $(element).parent().attr("href");
    results.push({
      title: title,
      link: link
    });
  
  
});
    console.log(results);
    res.json(results)
});
    
   
 });

 app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
})



