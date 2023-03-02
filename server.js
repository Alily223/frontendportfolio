const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const indexPath = path.join(__dirname, '/public/index.html');

app.use(express.static(path.join(__dirname,'src', 'public')));

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});