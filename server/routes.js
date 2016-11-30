const login = require('./database/queries/login');
const resources = require('./database/queries/resources');
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
          reply.redirect('reviews');
        });
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      resources.getAll((error, result) => {
        if(error) return reply(error).statusCode(400);
        if(result.length === 0) {
          return reply('No resources found');
        }
        reply.view('index', {
          resources: result
        });
      });
    }
  },
  {
    method: 'GET',
    path: '/resources/{id}',
    handler: (req, reply) => {
      resources.getById(req.params.id, (error, result) => {
        if(error) return reply(error).statusCode(400);
        if(result.length === 0) {
          return reply('No resources found');
        }
        reply.view('resource-large', result[0]);
      });
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
    config: {
      auth: {
        mode: 'optional',
        strategy: 'base'
      },
      handler: (req, reply) => {
        getUserReviews((error, userReviews) => {
          if (error) console.log('error with getReviews endpoint', error);
          if (req.auth.isAuthenticated) {
            userReviews = filterByUser(userReviews);
            reply.view('user_reviews', {user_id: req.auth.credentials.user_id, reviews:userReviews});
          } else {
            reply.view('user_reviews',{user_id: 'You must be login to see the content'});
          }
        });
      }
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
