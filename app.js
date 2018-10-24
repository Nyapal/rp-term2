const express = require('express')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const reviews = require('./controllers/reviews');
const Review = require('./models/review')
mongoose.connect('mongodb://localhost/rp-term2');

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

reviews(app)

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Great Review", movieTitle: "Batman II" },
//   { title: "Awesome Movie", movieTitle: "Titanic" },
//   { title: "Not Bad", movieTitle: "Halloween" }
// ]


app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

module.exports = app
