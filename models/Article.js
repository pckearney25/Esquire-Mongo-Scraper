var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ArticleSchema object

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  // Links to articles must be unique to prevent multiple entry into the db.
  link: {
    type: String,
    unique: true,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  imgage: {
    type: String,
    required: true
  },

  newArticle: {
    type: Boolean,
    default: false,
    required: true
  },

  savedArticle: {
    type: Boolean,
    default: false,
    required: true
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
