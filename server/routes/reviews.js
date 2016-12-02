const getReviews = require('../database/queries/reviews');
const getUserReviews = require('../database/queries/user_reviews');
const createNewReview = require('../database/queries/insert_new_review');
const util = require('../util');

module.exports = [
  {
    method: 'GET',
    path: '/reviews',
    handler: (req, reply) => {
      if(!req.auth.isAuthenticated) { return reply('You must be logged in'); }
      getUserReviews((error, userReviews) => {
        if(error) console.log('error with getReviews endpoint', error);
        userReviews = util.filterByUser(userReviews, req.auth.credentials.user_id);
        reply.view('user_reviews', {reviews:userReviews});
      });
    }
  },
  {
    method:'POST',
    path: '/reviews',
    config: {
      handler: (req, reply) => {
        if(!req.auth.isAuthenticated) { return reply('You must be logged in'); }
        createNewReview.insertReviewContent(req.payload, (error,review_id) => {
          if(error) console.log("Error submitting user's new review content", error);
          createNewReview.insertIdContent(review_id, req.auth.credentials.user_id, req.payload.resource_id, error => {
            if(error) { console.log('Error'); }
            reply.redirect('/reviews');
          });
        });
      }
    }
  },
  {
    method:'GET',
    path: '/reviews/create',
    handler: (req, reply) => {
      if(!req.auth.isAuthenticated) { return reply('You must be logged in'); }
      reply.view('new-review-template', {resource_id: req.query.resource_id});
    }
  },
];
