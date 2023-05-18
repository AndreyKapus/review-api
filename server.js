const mongoose = require('mongoose');
const app = require("./app")
// require('dotenv').config()

// const DB_HOST = "mongodb+srv://Andrii:JSsgxlYsvNWRDf8a@cluster0.0v5appb.mongodb.net/contacts_reader?retryWrites=true&w=majority"
const {DB_HOST, PORT = 3001} = process.env;
mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(PORT);
  console.log('started at localhost 3001')
})
.catch(error => {
    console.log(error.message)
    process.exit(1)
});