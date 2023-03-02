const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});