const resources = require('../database/queries/resources');
const util = require('../util');

module.exports = [
  {
    method: 'GET',
    path: '/resources',
    handler: (req, reply) => {
      const onlyReviewed = (req.query.reviewed === 'true');
      return resources.getAll(onlyReviewed, util.fetchReviewsAndReply(req, reply, onlyReviewed));
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
