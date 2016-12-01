module.exports = function(reviews){
  return `<a href=resources/${reviews.resource_id}><li>${reviews.title} ${reviews.rating}/5</li></a>`;
};
