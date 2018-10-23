const express = require('express')
const exphbs = require('express-handlebars');
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rp-term2');

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String
});

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Great Review", movieTitle: "Batman II" },
//   { title: "Awesome Movie", movieTitle: "Titanic" },
//   { title: "Not Bad", movieTitle: "Halloween" }
// ]


// INDEX
// app.get('/', (req, res) => {
//   res.render('reviews-index', { reviews: reviews });
// })

// INDEX
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
