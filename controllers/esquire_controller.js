//For Routing and accessing the database.
var express = require("express");
var router = express.Router();
var db = require("../models");

//for scraping the esquire website.
var cheerio = require("cheerio");
var request = require("request");

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/saved", function(req, res) {
  res.render("saved");
});

module.exports = router;
