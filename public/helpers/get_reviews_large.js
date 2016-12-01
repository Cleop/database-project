module.exports = function(userReviews){
  return `<a href=reviews/${userReviews.review_id}><li>${userReviews.title}   ${userReviews.rating}/5 <br>${userReviews.content}</li></a><button>Edit</button><button>Delete</button>`;
};
