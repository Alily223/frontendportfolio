const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

console.log('triggering app.use(cors)')

app.use(cors());

console.log('triggering app.use /dist')

app.use(express.static(path.join(__dirname, '/dist')));

console.log('triggering applisten port')

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});