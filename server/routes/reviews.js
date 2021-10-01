const Router = require('express-promise-router');
const db = require('../db');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();
// export our router to be mounted by the parent application

module.exports = router;

router.get('/', async (req, res) => {
  const { product_id } = req.query;
  console.log('reviews get: ', req.query);
  console.log('[product_id]: ', [product_id]);
  const { rows } = await db.query('SELECT * FROM reviews WHERE product_id=$1', [product_id]);
  res.send(rows);
  // res.send('Reviews');
});
