const express = require('express');
const app = express();
const fs = require('fs/promises');
const moment = require('moment');

const contacts = require('./contacts');

app.use( async (req, res, next) => {
    const {method, url} = req;
    const date = moment().format("DD-MM-YYYY_hh:mm:ss");
   await fs.appendFile('./public/server.log', `${method} ${url} ${date}`);
   next()
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/contacts', (req, res) => {
    res.json(contacts);
})

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});

