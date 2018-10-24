const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
  title: String,
  rating: Number,
  description: String,
  movieTitle: String
});

module.exports = Review
