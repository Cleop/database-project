module.exports = function(userReview){
  return `<div class="divider"><p><strong>Title: </strong>${userReview.title}</p><p><strong>Rating: </strong>${userReview.rating}/5</p><p><strong>Review: </strong><br>${userReview.content}</p><br><a class="btn btn-go style-a" href=resources/${userReview.resource_id}>Go to resource</a><button class="btn ">Edit</button><button class="btn">Delete</button></div>`;
};
