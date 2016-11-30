module.exports = function(userReviews){
  console.log(userReviews.title);
  return `<a href=reviews/${userReviews.review_id}><li>${userReviews.title} ${userReviews.rating}/5 ${userReviews.content}</li></a>`;
};
