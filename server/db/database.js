const { Pool } = require('pg');

const pool = new Pool({
  user: 'zhuqinyu',
  host: 'localhost',
  database: 'review_service',
  password: '',
  port: 5432,
});

// pool.query('SELECT NOW()', (err, res) => {
//   console.log('test pool.query');
//   console.log('err: ', err);
//   console.log('res: ', res);
//   pool.end();
// });

// const client = new Client({
//   user: 'zhuqinyu',
//   host: 'localhost',
//   database: 'review_service',
//   password: '',
//   port: 5432,
// });

// client.connect();
// client.query('SELECT NOW()', (err, res) => {
//   console.log('test client.query');
//   console.log('err: ', err);
//   console.log('res: ', res);
//   client.end();
// });

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getReview = 'SELECT * FROM reviews LIMIT 10';
const getPhoto = 'SELECT * FROM reviews_photos LIMIT 10';
const getValue = 'SELECT * FROM characteristic_reviews LIMIT 10';
const getChara = 'SELECT * FROM characteristics LIMIT 10';

pool
  .connect()
  .then((client) => {
    return client
      .query(getReview)
      .then((res) => {
        client.release()
        console.log(res.rows)
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  });

  pool
  .connect()
  .then((client) => {
    return client
      .query(getPhoto)
      .then((res) => {
        client.release()
        console.log(res.rows)
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  });

  pool
  .connect()
  .then((client) => {
    return client
      .query(getChara)
      .then((res) => {
        client.release()
        console.log(res.rows)
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  });

  pool
  .connect()
  .then((client) => {
    return client
      .query(getValue)
      .then((res) => {
        client.release()
        console.log(res.rows)
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  });
// async function getReview() {
//   console.log('test in db');
//   // const review = 'SELECT * FROM reviews LIMIT 5';
//   return (
//     client
//       .query(review)
//       .then((res) => { console.log('res: ', res.rows); })
//       .catch((e) => console.error(e.stack))
//   );
// }



module.exports = { getReview };
