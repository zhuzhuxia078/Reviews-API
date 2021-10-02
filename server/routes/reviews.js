const Router = require('express-promise-router');
const db = require('../db');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();
// export our router to be mounted by the parent application

module.exports = router;

router.get('/', async (req, res) => {
  const text = `SELECT
  reviews.review_id as review_id, reviews.rating,
  reviews.summary,
  reviews.recommend,
  reviews.body,
  reviews.date,
  reviews.reviewer_name,
  reviews.helpfulness,
  JSON_AGG(json_build_object('id', reviews_photos.id, 'url', reviews_photos.url)) as photos
  FROM reviews
  LEFT JOIN reviews_photos
  ON reviews.review_id = reviews_photos.review_id
  WHERE reviews.product_id = $1
  GROUP BY reviews.review_id
  ORDER BY date DESC`;
  // const text = 'SELECT * FROM reviews WHERE product_id=$1';
  const { product_id } = req.query;
  console.log('reviews get: ', req.query);
  console.log('[product_id]: ', [product_id]);
  const { rows } = await db.query(text, [product_id]);
  res.send(rows);
});
