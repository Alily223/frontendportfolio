const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the 'index.html' file for all requests
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});