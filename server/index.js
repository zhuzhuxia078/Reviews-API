const express = require('express');
const { Pool } = require('pg');



const app = express();

const port = process.env.PORT || 2000;

const pool = new Pool({
  user: 'zhuqinyu',
  host: 'localhost',
  database: 'review_service',
  password: '',
  port: 5432,
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getReview = 'SELECT * FROM reviews LIMIT 10';
const getPhoto = 'SELECT * FROM reviews_photos LIMIT 10';
const getValue = 'SELECT * FROM characteristic_reviews LIMIT 10';
const getChara = 'SELECT * FROM characteristics LIMIT 10';


app.get('/reviews', (req, res) => {
  const getReview = 'SELECT * FROM reviews LIMIT 10';
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
})


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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});