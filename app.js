const express = require('express');
const fs = require('fs/promises');
const moment = require('moment');
const logger = require("morgan");
const cors = require('cors');
require("dotenv").config();
const mongoose = require('mongoose');

const app = express();

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth')

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());



const { error } = require('console');

app.use( async (req, res, next) => {
    const {method, url} = req;
    const date = moment().format("DD-MM-YYYY_hh:mm:ss");
   await fs.appendFile('./public/server.log', `${method} ${url} ${date}`);
   next()
});

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

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

module.exports = app
