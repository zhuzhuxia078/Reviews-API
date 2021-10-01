

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



// module.exports = pool;
