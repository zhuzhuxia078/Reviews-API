const home = require('./home');
const reviews = require('./reviews');
const meta = require('./meta');
const helpful = require('./helpful');
const report = require('./report');
// const { Pool } = require('pg');

module.exports = (app) => {
  app.use('/', home);
  app.use('/reviews/', reviews, helpful, report);
  app.use('/reviews/meta', meta);
  // app.use('/reviews/', helpful, report);
  // app.use('/photos', photos)
};
