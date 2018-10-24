const express = require('express')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const reviews = require('./controllers/reviews');
const comments = require('./controllers/comments');
const Review = require('./models/review');
const Comment = require('./models/comment');


app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

reviews(app)
comments(app)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('App listening on port 5000!')
  const db = process.env.MONGODB_URI || 'mongodb://localhost/rp-term2';
  mongoose.connect(db)
})

module.exports = app
