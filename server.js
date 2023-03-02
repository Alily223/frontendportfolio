const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const publicPath = path.join(__dirname, '/public');
const distPath = path.join(__dirname, '/dist');
const indexPath = path.join(publicPath, 'index.html');

app.use(express.static(publicPath));
app.use(express.static(distPath));

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});