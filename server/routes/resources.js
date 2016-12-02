const resources = require('../database/queries/resources');
const util = require('../util');

module.exports = [
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
  }
];
