module.exports = function(userReview){
  return `<a class="style-a" href=resources/${userReview.resource_id}><li>${userReview.title}   ${userReview.rating}/5 <br>${userReview.content}</li></a><button>Edit</button><button>Delete</button>`;
};
