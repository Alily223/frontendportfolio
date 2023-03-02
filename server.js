const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const indexPath = path.join(__dirname, '/dist/index.html');

app.use(express.static('public'));

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(express.static(__dirname + '/dist/'));

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});