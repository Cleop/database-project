const db_conn = require('../db_connection');

const getAll = cb => {
  db_conn.query(
    "SELECT res.resource_id, res.title, res.url, res.img, res.intro,\
      json_agg(json_build_object(\
        'content', reviews.content,\
        'reviewID', reviews.review_id,\
        'rating', reviews.rating,\
        'title', reviews.title,\
        'email', users.email\
      ))\
    FROM resources AS res\
    LEFT JOIN user_reviews\
    ON res.resource_id=user_reviews.resource_id\
    LEFT JOIN reviews\
    ON reviews.review_id=user_reviews.review_id\
    LEFT JOIN users ON users.user_id=user_reviews.user_id\
    GROUP BY res.resource_id, res.title, res.url, res.img, res.intro;",
    (error, result) => {
      if (error) return cb(error);
      return cb(null, result.rows);
    });
};

const getById = (id, cb) => {
  db_conn.query(
    "SELECT res.resource_id, res.title, res.url, res.img, res.intro,\
      json_agg(json_build_object(\
        'content', reviews.content,\
        'reviewID', reviews.review_id,\
        'rating', reviews.rating,\
        'title', reviews.title,\
        'email', users.email\
      ))\
    FROM resources AS res\
    LEFT JOIN user_reviews\
    ON res.resource_id=user_reviews.resource_id\
    LEFT JOIN reviews\
    ON reviews.review_id=user_reviews.review_id\
    LEFT JOIN users ON users.user_id=user_reviews.user_id\
    WHERE res.resource_id = $1\
    GROUP BY res.resource_id, res.title, res.url, res.img, res.intro;",
    [id], (error, result) => {
      if (error) return cb(error);
      return cb(null, result.rows);
    });
};

const getAllReviewed = cb => {
  db_conn.query(
    "SELECT res.resource_id, res.title, res.url, res.img, res.intro,\
      json_agg(json_build_object(\
        'content', reviews.content,\
        'reviewID', reviews.review_id,\
        'rating', reviews.rating,\
        'title', reviews.title,\
        'email', users.email\
      ))\
    FROM resources AS res\
    INNER JOIN user_reviews\
    ON res.resource_id=user_reviews.resource_id\
    INNER JOIN reviews\
    ON reviews.review_id=user_reviews.review_id\
    INNER JOIN users ON users.user_id=user_reviews.user_id\
    GROUP BY res.resource_id, res.title, res.url, res.img, res.intro;",
    (error, result) => {
      if (error) return cb(error);
      return cb(null, result.rows);
    });
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getAllReviewed: getAllReviewed
};
