const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;

router.put('/helpful', async (req, res) => {
  const text = 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = $1';
  const review_id = req.params;
  console.log('req.params: ', req.params);
  const result = await db.query(text, [review_id]);
  res.status(200).send(result);
});
