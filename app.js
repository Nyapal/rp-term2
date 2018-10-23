const express = require('express')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/rp-term2');

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const Review = mongoose.model('Review', {
  title: String,
  rating: Number,
  description: String,
  movieTitle: String
});

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Great Review", movieTitle: "Batman II" },
//   { title: "Awesome Movie", movieTitle: "Titanic" },
//   { title: "Not Bad", movieTitle: "Halloween" }
// ]

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

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

// CREATE
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      console.log(review)
      res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
    }).catch((err) => {
      console.log(err.message)
    })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
      res.render('reviews-show', { review: review })
    }).catch((err) => {
      console.log(err.message);
    })
});

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
