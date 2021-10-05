const express = require('express');

const mountRoutes = require('./routes');

const port = process.env.PORT || 2000;

const app = express();

// app.use(express.json());

mountRoutes(app);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
