const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;

router.put('/:review_id/report', async (req, res) => {
  // default hepfulness
  const text = `UPDATE reviews
  SET reported = true
  WHERE review_id = $1`;
  const { review_id } = req.params;
  console.log('req.params: ', req.params);
  const result = await db.query(text, [review_id]);
  res.status(201).send(`mark ${review_id} as report`);
});
