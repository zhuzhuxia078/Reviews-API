const Router = require('express-promise-router');
const bodyParser = require('body-parser');
const db = require('../db');

const jsonParser = bodyParser.json();
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
  res.status(200).send(rows);
});

router.post('/', jsonParser, async (req, res) => {
  console.log('test post: ', req.body);
  const {
    product_id, summary, body, name, email, rating, recommend
  } = req.body;
  // const date = new Date().toISOString();
  // console.log('date: (want bigint)', date);
  const qparam = [rating, recommend, body, name, product_id, email, summary];
  const text = `INSERT INTO reviews (rating, recommend, body, reviewer_name, product_id, reviewer_email, summary, reported)
  VALUES ($1, $2, $3, $4, $5, $6, $7, false)`;
  const result = await db.query(text, qparam);
  res.status(201).send(result);
});
