const login = require('./database/queries/login');
const resources = require('./database/queries/resources');
const getReviews = require('../reviews');
const getUserReviews = require('../user_reviews');
const createNewReview = require('./database/queries/insert_new_review');
const util = require('./util');


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
          if (error) return reply(error).statusCode(400);
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
      reply.redirect('/resources');
    }
  },
  {
    method: 'GET',
    path: '/resources',
    handler: (req, reply) => {
      if(req.query.reviewed){
        return resources.getAllReviewed(util.fetchReviewsAndReply(req, reply, true));
      }
      resources.getAll(util.fetchReviewsAndReply(req, reply, false));
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

