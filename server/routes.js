const getReviews = require('../reviews');

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
    handler: (req, reply) => {

    }
  },
  {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      reply('Hi Ewelina!!');
    }
  },
  {
    method: 'GET',
    path: '/reviews/recent',
    handler: (req, reply) => {
      getReviews((error, reviews) => {
        if (error) console.log('error with getReviews endpoint', error);
        console.log(reviews);
        reply.view('index', reviews);
      });
    },
  },
];
