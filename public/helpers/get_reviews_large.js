module.exports = function(userReview){
  return `<a class="style-a" href=resources/${userReview.resource_id}><li class="style-link link-hover divider">${userReview.title}   ${userReview.rating}/5 <br>${userReview.content}</li></a><button class="btn">Edit</button><button class="btn">Delete</button>`;
};
