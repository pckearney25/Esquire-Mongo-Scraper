//For Routing and accessing the database.
var express = require("express");
var router = express.Router();
var db = require("../models");

//for scraping the esquire website.
var cheerio = require("cheerio");
var request = require("request");

router.get("/", function(req, res) {
  //Check for unread articles with most recent first.....
  db.Article.find({ oldArticle: false })
    .sort({ _id: -1 })
    .then(function(dbArticle) {
      if (dbArticle) {
        console.log(dbArticle);
        //...package them up as a handlebars object
        var hbsObject = {
          articles: dbArticle,
          message: "Unread articles: " + dbArticle.length + "."
        };
      } else {
        var hbsObject = {
          articles: dbArticle,
          message: "No unread articles. Scrape Esquire to check for more."
        };
      }
      //....and return them to the "index" view.
      return res.render("index", hbsObject);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      console.log(err);
    });
});

router.get("/saved", function(req, res) {
  //Check for saved articles with most recent first.....
  db.Article.find({ savedArticle: true })
    .sort({ _id: -1 })
    .then(function(dbArticle) {
      if (dbArticle) {
        console.log(dbArticle);
        //...package them up as a handlebars object
        var hbsObject = {
          articles: dbArticle,
          message: "Saved articles: " + dbArticle.length + "."
        };
      } else {
        var hbsObject = {
          articles: dbArticle,
          message: "No saved articles. Go 'Home' and scrape some up!."
        };
      }
      //....and return them to the "index" view.
      return res.render("saved", hbsObject);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      console.log(err);
    });
});

router.get("/scrapes", function(req, res) {
  //Step 1. execute the cheerio search
  // and populate database with unique results.
  // Make request to grab the HTML from `Esquires` website.
  request("https://www.esquire.com", function(error, response, html) {
    // Load the HTML into cheerio
    var $ = cheerio.load(html);

    // Make an empty array for saving our scraped info
    var result = {};

    // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
    $("div.full-item").each(function(i, element) {
      result.title = $(element)
        .find("div.full-item-content")
        .find("a.full-item-title")
        .text()
        .replace("\n\t", "")
        .replace("\n", "");

      result.link =
        "https://www.esquire.com" +
        $(element)
          .find("div.full-item-content")
          .find("a.full-item-title")
          .attr("href");

      result.description = $(element)
        .find("div.full-item-content")
        .find("div.full-item-dek")
        .find("p")
        .text();

      result.image = $(element)
        .find("a.full-item-image")
        .find("img")
        .attr("data-src")
        .split("?")[0];

      result.oldArticle = false;
      result.savedArticle = false;

      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          console.log(err);
        });
    });
  });
  res.redirect("/");
});

router.post("/update_as_saved/:id", function(req, res) {
  db.Article.update(
    {
      _id: req.params.id
    },
    {
      // Set the title, note and modified parameters
      // sent in the req body.
      $set: {
        oldArticle: true,
        savedArticle: true
      }
    },
    function(error, edited) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

router.post("/update_as_read/:id", function(req, res) {
  db.Article.update(
    {
      _id: req.params.id
    },
    {
      // Set the title, note and modified parameters
      // sent in the req body.
      $set: {
        oldArticle: true
      }
    },
    function(error, edited) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

router.post("/unsave_article/:id", function(req, res) {
  db.Article.update(
    {
      _id: req.params.id
    },
    {
      // Set the title, note and modified parameters
      // sent in the req body.
      $set: {
        savedArticle: false
      }
    },
    function(error, edited) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

// Creates a new note, associates with proper article, returns article info.
router.post("/create_associate_note/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { notes: dbNote._id } },
        { new: true }
      );
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

module.exports = router;
