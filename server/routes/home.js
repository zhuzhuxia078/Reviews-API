const Router = require('express-promise-router');

const router = new Router();
// export our router to be mounted by the parent application

module.exports = router;

router.get('/', async (req, res) => {
  console.log('test home');
  res.send('Hello World');
});
