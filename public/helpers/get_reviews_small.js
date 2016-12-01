module.exports = function(reviews){
  return `<a href=reviews/${reviews.review_id}><li>${reviews.title} ${reviews.rating}/5</li></a>`;
};
