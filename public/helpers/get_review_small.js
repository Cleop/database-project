module.exports = function(review){
  return `<a class="style-a" href=resources/${review.resource_id}><li class="style-link">${review.title} ${review.rating}/5</li></a>`;
};
