const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

app.use(express.static(distPath));

app.all('/favicon.ico', (req, res) => res.status(204));

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});