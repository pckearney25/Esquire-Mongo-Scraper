# Esquire-Scraper

A full-stack node web server application that utilizes a MongoDB database to keep track of articles scraped from the Esquire website https://www.esquire.com/.

## Overview

The application was designed to enable a user to view articles scraped from the Esquire website and to make notes.

When the user accesses the Home page, if they do not have any unread articles in the database, they are given a message that indicates that they have no unread articles. If they do have articles in the database those are automatically rendered on the page, along with an article count. Additional new articles can be obtained by clicking the "Scrape Esquire" button in the navbar, which triggers the scraping of the "Esquire" site, the loading of new (not duplicate) articles in the Mongodb database, and a re-rendering of the page, which is then reloaded on the client-side.

The displayed articles have an image, a title, a brief article description, and a link to the original article at Esquire. They are tracked using the "Save Article" and "Mark As Read" buttons associated with each article. While both buttons will mark an article as "not new" in the database, the "Save Article" button will mark it for further viewing on the "Saved Articles" page.

The "Saved Articles" page has a similar layout to the home page, but with a few added features. Upon loading, it also generates a hidden model for each article. The individual modals are triggered into view by clicking "Article Notes". Clicking "Unsave Article" will result in marking the article as "not saved" in the database, and its removal from the page after automatic re-rendering.

Functionally, on the modals themselves, one can enter a note that is associated with its parent article. The note is then incorporated into the modal and can be viewed by reopening the modal after and automatic page reload. The notes can also be deleted. The modals were tricky to code given the use of Express-Handlebars for page rendering and the incorporation of a form in each modal, which necessitated a unique id for many of the rows. This problem was solved by creating all modals in advance of page rendering and by incorporating a unique target-hash on each "Article Note" button and a corresponding target on each modal. Scoping also required the passing both the article_id and note-id forward, right down to the "Delete-Note" button.

## Installation

Upon downloading/cloning the application from this GitHub repository, a potential user will need to install the express, express-handlebars, body-parser, mongoose, cheerio, request packages outlined in the package.json file. The user will also need to have installed Mongodb on their machine if running locally. The Robo 3T app for monitoring the Mongodb database is helpful, if not required.

A deployed version app can be found on Heroku at:

## Authors

The Esquire-Scraper app presented here was coded by Patrick Kearney.

## Built With

* JavaScript and JQuery.
* Node.js for constructing the server.
* The Express, Express-Handlebars and Body-Parser packages for simplifying server and client-side interactions and page rendering.
* The Request and Cheerio packages for scraping website data.
* A Mongodb database for storing object data.
* The Mongoose package for simplifying interactions with the database.
* Bootstrap 4.1 was used to construct the html pages.
* Font Awesome was used to incorporate some "fun" in the html buttons.
* Google Fonts provided the "Molle" cursive script used to mimic the Esquire Magazine "Esquivel" font.

## License

This project is licensed under the MIT License.

## Acknowledgments

This application was constructed as part of the University of Kansas Full-Stack Web-Development Coding Bootcamp Program offered in conjunction with Trinity Educational Services. Thanks to these institutions for the initial project requirements and examples of code that provided helpful hints and blueprints for building the application. Much thanks to my spouse for his patience as I coded this over Memorial Day Weekend.
