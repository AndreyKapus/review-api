const { string } = require('joi');
const {Schema, model} = require('mongoose');

const contactSchema = new Schema({
    name: String,
    company: String,
    date: String,
    link: String,
});

const Contact = model('contact', contactSchema);

module.exports = Contact;