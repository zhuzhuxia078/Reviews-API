const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;

router.get('/', async (req, res) => {
  const text = `SELECT
  products.product_id,
  reviews.rating,
  reviews.recommend,
  COUNT(*)
  FROM products
  INNER JOIN reviews
  ON products.product_id = reviews.product_id
  WHERE products.product_id = $1
  GROUP BY products.product_id, reviews.rating, reviews.recommend
  ORDER BY products.product_id, reviews.rating`;
  const { product_id } = req.query;
  console.log('reviews get: ', req.query);
  console.log('[product_id]: ', [product_id]);
  const { rows } = await db.query(text, [product_id]);
  res.send(rows);
});
