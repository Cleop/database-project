const reviews = require('../database/queries/reviews');

module.exports = [
  {
    method: 'GET',
    path: '/reviews',
    handler: (req, reply) => {
      if(!req.auth.isAuthenticated) { return reply('You must be logged in'); }
      reviews.getAllByUserId(req.auth.credentials.user_id, (error, userReviews) => {
        if(error) return reply(error).statusCode(400);
        reply.view('user_reviews', {reviews: userReviews});
      });
    }
  },
  {
    method:'POST',
    path: '/reviews',
    config: {
      handler: (req, reply) => {
        if(!req.auth.isAuthenticated) { return reply('You must be logged in'); }
        reviews.insert(req.payload, req.auth.credentials.user_id, error => {
          if(error) return reply(error).statusCode(400);
          reply.redirect('/reviews');
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
  }
];
