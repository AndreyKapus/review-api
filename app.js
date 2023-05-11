const express = require('express');
const fs = require('fs/promises');
const moment = require('moment');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts')

const app = express();

app.use(cors());

app.use( async (req, res, next) => {
    const {method, url} = req;
    const date = moment().format("DD-MM-YYYY_hh:mm:ss");
   await fs.appendFile('./public/server.log', `${method} ${url} ${date}`);
   next()
});

app.use('/api/contacts', contactsRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found'
  })
})

app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});

