const Comment = require('../models/comment')

function comments (app) {

    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            res.redirect(`/reviews/${comment.reviewId}`);
          }).catch((err) => {
            console.log(err.message);
          });
      })

      app.delete('/reviews/comments/:id', function (req, res) {
          console.log("Successfully deleted comment")
          Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/reviews/${comment.reviewId}`);
          }).catch((err) => {
            console.log(err.message);
          })
        })

}

module.exports = comments
