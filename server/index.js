const express = require('express');
const db = require('./db/database.js');

const app = express();

const port = process.env.PORT || 2000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
