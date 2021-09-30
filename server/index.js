const express = require('express');

const app = express();

const port = process.env.PORT || 2000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.log('test');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
