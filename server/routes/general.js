// const resources = require('../database/queries/resources');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      reply.redirect('/resources');
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
