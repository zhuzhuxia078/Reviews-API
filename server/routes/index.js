const home = require('./home');
const reviews = require('./reviews');
// const { Pool } = require('pg');

module.exports = (app) => {
  app.use('/', home);
  app.use('/reviews', reviews);
  // app.use('/photos', photos)
};
// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });

// const getReview = 'SELECT * FROM reviews LIMIT 10';
// const getPhoto = 'SELECT * FROM reviews_photos LIMIT 10';
// const getValue = 'SELECT * FROM characteristic_reviews LIMIT 10';
// const getChara = 'SELECT * FROM characteristics LIMIT 10';

// app.get('/reviews', (req, res) => {
//   const getReview = 'SELECT * FROM reviews LIMIT 10';
//   pool
//     .connect()
//     .then((client) => {
//       return client
//         .query(getReview)
//         .then((res) => {
//           client.release()
//           console.log(res.rows)
//         })
//         .catch(err => {
//           client.release()
//           console.log(err.stack)
//         })
//   });
// });

// pool
// .connect()
// .then((client) => {
//   return client
//     .query(getChara)
//     .then((res) => {
//       client.release()
//       console.log(res.rows)
//     })
//     .catch(err => {
//       client.release()
//       console.log(err.stack)
//     })
// });

// pool
// .connect()
// .then((client) => {
//   return client
//     .query(getPhoto)
//     .then((res) => {
//       client.release()
//       console.log(res.rows)
//     })
//     .catch(err => {
//       client.release()
//       console.log(err.stack)
//     })
// })

// pool
// .connect()
// .then((client) => {
//   return client
//     .query(getValue)
//     .then((res) => {
//       client.release()
//       console.log(res.rows)
//     })
//     .catch(err => {
//       client.release()
//       console.log(err.stack)
//     })
// });
