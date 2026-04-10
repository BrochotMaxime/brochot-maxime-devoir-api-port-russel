const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Port Russell API en cours de construction');
});

module.exports = app;