const Router = require('express-promise-router');
const bodyParser = require('body-parser');
const db = require('../db');

const jsonParser = bodyParser.json();
const router = new Router();

module.exports = router;

router.put('/:review_id/helpful', jsonParser, async (req, res) => {
  const text = `UPDATE reviews
  SET helpfulness = CASE
  WHEN helpfulness IS NULL THEN 0
  ELSE helpfulness + 1
  END
  WHERE review_id = $1`;
  const { review_id } = req.params;
  console.log('req.params: ', req.params);
  console.log('req.body: ', req.body);
  const result = await db.query(text, [review_id]);
  res.status(201).send(`mark ${review_id} as helpful`);
});
