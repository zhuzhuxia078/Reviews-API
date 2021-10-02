const home = require('./home');
const reviews = require('./reviews');
const meta = require('./meta');
// const { Pool } = require('pg');

module.exports = (app) => {
  app.use('/', home);
  app.use('/reviews/', reviews);
  app.use('/reviews/meta', meta);
  // app.use('/photos', photos)
};
