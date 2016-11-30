const login = require('./database/queries/login');
const getReviews = require('../reviews');
const getUserReviews = require('../user_reviews')

let user_id;
module.exports = [
  {
    method: 'GET',
    path: '/login',
    handler: (req, reply) => {
      reply.view('login');
    }
  },
  {
    method: 'POST',
    path: '/login',
    config: {
      handler: (req, reply) => {
        login([req.payload.email, req.payload.password], (error, result) => {
          if (error) {
            return reply(error).statusCode(400);
          }
          if (result.length === 0) {
            return reply('User not found.');
          }
          req.cookieAuth.set(result[0]);
          user_id = result[0].user_id;
          console.log(user_id);
          reply.view('user_reviews', result[0]);
        });
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      reply.view('index', {user_id:user_id});
    }
  },
  {
    method: 'GET',
    path: '/reviews/recent',
    handler: (req, reply) => {
      getReviews((error, reviews) => {
        if (error) console.log('error with getReviews endpoint', error);
        reviews = buildReviewDescription(reviews);
        reply.view('index', {reviews:reviews});
      });
    },
  },
  {
    method: 'GET',
    path: '/reviews',
    handler: (req, reply) => {
      var params = req.query;
      console.log(params);
      console.log(user_id);
      getUserReviews((error, userReviews) => {
        if (error) console.log('error with getReviews endpoint', error);
        userReviews = filterByUser(userReviews)
        reply.view('user_reviews',
        {reviews:userReviews});
      });
    }
  },
  {
    method:'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: '../public'
      }
    }
  }
];
function buildReviewDescription(reviews){
  return reviews.slice(-3);
};

function filterByUser(reviews){
  return reviews.filter(function(review){if (review.user_id === user_id){return review}})
}
