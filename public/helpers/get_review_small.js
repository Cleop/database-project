module.exports = function(review){
  return `<a href=resources/${review.resource_id}><li>${review.title} ${review.rating}/5</li></a>`;
};
