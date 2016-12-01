const login = require('./database/queries/login');
const resources = require('./database/queries/resources');
const getReviews = require('../reviews');
const getUserReviews = require('../user_reviews');
const createNewReview = require('./database/queries/insert_new_review');

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
    path: '/logout',
    handler: (req, reply) => {
      req.cookieAuth.clear();
      return reply.redirect('/');
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      resources.getAll((error, resourcesRows) => {
        if(error) return reply(error).statusCode(400);
        if(resourcesRows.length === 0) {
          return reply('No resources found');
        }
        getReviews((error, reviews) => {
          if(error) console.log('error with getReviews endpoint', error);
          reviews = buildReviewDescription(reviews);
          reply.view('index', {
            resources: resourcesRows,
            isFiltered: false,
            reviews: reviews
          });
        });

      });
    }
  },
  {
    method: 'GET',
    path: '/resources', // /resources?reviewed=true
    handler: (req, reply) => {
      if(!req.query.reviewed){
        return reply.redirect('/');
      }
      resources.getAllReviewed((error, rows) => {
        if(error) return reply(error).statusCode(400);
        if(rows.length === 0) {
          return reply('No resources found');
        }
        reply.view('index', {
          resources: rows,
          isFiltered: true
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
    path: '/reviews',
    handler: (req, reply) => {
      getUserReviews((error, userReviews) => {
        if(error) console.log('error with getReviews endpoint', error);
        if(!req.auth.isAuthenticated) { return reply('You must be logged in'); }
        userReviews = filterByUser(userReviews, req.auth.credentials.user_id);
        reply.view('user_reviews', {user_id: req.auth.credentials.user_id, user_name:req.auth.credentials.firstname, reviews:userReviews});
      });
    }
  },
  {
    method:'POST',
    path: '/reviews',
    config: {
      handler: (req, reply) => {
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
}

function filterByUser(reviews, user_id){
  return reviews.filter(function(review) {return review.user_id === user_id;});
}
