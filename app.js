const express = require('express');
const fs = require('fs/promises');
const moment = require('moment');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

// const DB_HOST = "mongodb+srv://Andrii:JSsgxlYsvNWRDf8a@cluster0.0v5appb.mongodb.net/contacts_reader?retryWrites=true&w=majority"
const {DB_HOST} = process.env;
mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(3001);
  console.log('started at localhost 3001')
})
.catch(error => {
    console.log(error.message)
    process.exit(1)
});


const app = express();

app.use(cors());
app.use(express.json())

// const contactsRouter = require('./routes/api/contacts');
const { error } = require('console');

app.use( async (req, res, next) => {
    const {method, url} = req;
    const date = moment().format("DD-MM-YYYY_hh:mm:ss");
   await fs.appendFile('./public/server.log', `${method} ${url} ${date}`);
   next()
});

// app.use('/api/contacts', contactsRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found'
  })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "server error"} = err;
  res.status(status).json({message})
})

