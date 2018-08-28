<<<<<<< HEAD
<<<<<<< HEAD
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
// app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoScraper");

// Routes
// app.get("/articles", function (req, res) {
//   db.Article.find({})
//     .then(function (dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.render("index", { articles: dbArticle });
//       // res.json(dbArticle);
//     })
//     .catch(function (err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });


// })
// A GET route for scraping the echoJS website
app.get("/", function (req, res) {
  // First, we grab the body of the html with request
  axios.get("https://www.theonion.com/").then(function (response) {

    var $ = cheerio.load(response.data);
    // console.log(response.data)

    // An empty array to save the data that we'll scrape
    var results = [];

    $("article").each(function (i, element) {
      // console.log($(element).children();
      var link = $("article header h1 a").attr("href")
      // var link = $(element).children().attr("href");
      var title = $(element).children().text();
      // var picture = $(".img-wrapper picture img")["\"" + i + "\""].currentSrc

      // // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        title: title,
        link: link,
        // picture: picture
      });
    });
    // db.Article.create(results)
    //   .then(function (dbArticle) {
    //     // View the added result in the console
    //     // console.log(dbArticle);
    //   })
    //   .catch(function (err) {
    //     // If an error occurred, send it to the client
    //     return res.json(err);
    //   });
    // res.send(results);
    res.render("index", { articles: results });
  });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
      res.send(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function (dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function (dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function (dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.post("/save-article", function (req, res) {
  // Create a new note and pass the req.body to the entry
  db.Article.create(req.body)
    .then(function (dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      // return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function (dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      // res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
=======
>>>>>>> parent of 4347a8d... final-need to host
=======
>>>>>>> parent of 4347a8d... final-need to host
