const home = require('./home');
const reviews = require('./reviews');
const meta = require('./meta');
const helpful = require('./helpful');
// const { Pool } = require('pg');

module.exports = (app) => {
  app.use('/', home);
  app.use('/reviews/', reviews);
  app.use('/reviews/meta', meta);
  app.use('/reviews/:review_id', helpful);
  // app.use('/photos', photos)
};
