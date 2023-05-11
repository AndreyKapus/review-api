const express = require('express');
const app = express();

const contacts = require('./contacts')

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});

app.get('/contacts', (req, res) => {
    res.json(contacts);
})