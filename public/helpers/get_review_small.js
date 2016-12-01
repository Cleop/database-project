module.exports = function(review){
  return `<a class="style-a" href=resources/${review.resource_id}><li>${review.title} ${review.rating}/5</li></a>`;
};
