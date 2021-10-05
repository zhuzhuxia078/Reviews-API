const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;

// router.get('/', async (req, res) => {
//   const text = `SELECT
//   products.product_id,
//   reviews.rating,
//   reviews.recommend,
//   COUNT(*)
//   FROM products
//   INNER JOIN reviews
//   ON products.product_id = reviews.product_id
//   WHERE products.product_id = $1
//   GROUP BY products.product_id, reviews.rating, reviews.recommend
//   ORDER BY products.product_id, reviews.rating`;
//   const { product_id } = req.query;
//   console.log('reviews get: ', req.query);
//   console.log('[product_id]: ', [product_id]);
//   const { rows } = await db.query(text, [product_id]);
//   res.send(rows);
// });

router.get('/', async (req, res) => {
  const { product_id } = req.query;
  console.log('reviews get: ', req.query);
  console.log('[product_id]: ', [product_id]);
  const ratings = `SELECT json_build_array(rating, COUNT(rating)) AS ratings
  FROM reviews
  WHERE product_id = $1 AND reported = false
  GROUP BY rating
  ORDER BY rating;`;
  const recommended = `SELECT json_build_array(recommend, COUNT(recommend)) AS recommended
  FROM reviews
  WHERE product_id = $1 AND reported = false
  GROUP BY recommend
  ORDER BY recommend;`;
  const characteristics = `SELECT json_build_array(c.name, json_build_object('id', c.id, 'value', AVG(cr.value))) AS characteristics FROM characteristics c
  INNER JOIN characteristic_reviews cr
  ON c.id = cr.characteristics_id
  AND c.product_id = $1
  JOIN reviews r
  ON r.review_id = cr.review_id
  AND r.reported = false
  GROUP BY c.name, c.id
  ORDER BY c.id;`;
  const resRatings = await db.query(ratings, [product_id]);
  const resRecommended = await db.query(recommended, [product_id]);
  const resChatacteristics = await db.query(characteristics, [product_id]);
  let result = {
    product_id,
    ratings: {},
    recommended: {},
    characteristics: {},
  };
  for (let i = 0; i < resRatings.rows.length; i += 1) {
    result.ratings[resRatings.rows[i].ratings[0]] = resRatings.rows[i].ratings[1];
  }
  for (let i = 0; i < resRecommended.rows.length; i += 1) {
    result.recommended[resRecommended.rows[i].recommended[0]] = resRecommended.rows[i].recommended[1];
  }
  for (let i = 0; i < resChatacteristics.rows.length; i += 1) {
    result.characteristics[resChatacteristics.rows[i].characteristics[0]] = resChatacteristics.rows[i].characteristics[1];
  }
  res.status(200).send(result);
})