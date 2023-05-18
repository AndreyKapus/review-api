const { string } = require('joi');
const {Schema, model} = require('mongoose');

const contactSchema = new Schema({
    name: string,
    company: string,
    date: string,
    link: string,
});

const Contact = model('contact', contactSchema);

module.exports = Contact;