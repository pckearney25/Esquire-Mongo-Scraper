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

  image: {
    type: String,
    required: true
  },

  oldArticle: {
    type: Boolean,
    default: true
  },

  savedArticle: {
    type: Boolean,
    default: false
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
