const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '18.188.217.138',
  database: 'postgres',
  password: '',
  port: 5432,
});

/* This is the local database */

// const pool = new Pool({
//   user: 'zhuqinyu',
//   host: 'localhost',
//   database: 'review_service',
//   password: '',
//   port: 5432,
// });

/* upward is the locat database */

// // Get photos
// const getPhotos = (reviewIDs) => {
//   let photosPromise = [];
//   for (let i = 0; i < reviewIDs.length; i += 1) {
//     const text = `SELECT id, url FROM reviews_photos WHERE review_id = ${reviewIDs[i]}`;
//     photosPromise.push(
//       pool
//         .query(text)
//         .then((photos) => {
//           if (photos.rows.length === 0) {
//             return null;
//           }
//           return photos.rows;
//         })
//         .catch((err) => console.log(err))
//     );
//   }
//   return Promise.all(photosPromise).then(photos => {
//     return photos;
//   })
// }

// // Get reviews
// const getReview = (params) => {
//   const page = params.page;
//   const count = params.count;
//   const productID = params.product_id;
//   const reviewIDsArr = [];
//   const query = `SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness FROM reviews WHERE product = ${productID}`;

//   const productReview = {
//     product: productID,
//     page: page,
//     count: count
//   };

//   return pool
//     .query(query)
//     .then(reviews => {
//       productReview.results = reviews.rows;
//       for (let i = 0; i < reviews.rows.length; i++) {
//         reviewIDsArr.push(reviews.rows[i].review_id);
//       }

//       return getPhotos(reviewIDsArr)
//         .then(photos => {
//           for (let i = 0; i < productReview.results.length; i++) {
//             productReview.results[i].photos = photos[i];
//           }
//           return productReview;
//         })
//         .catch(err => console.error(err));
// }

module.exports = {
  query: (text, params) => pool.query(text, params),
};
