const {Schema, model} = require('mongoose');

const contactSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    company: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
});

const Contact = model('contact', contactSchema);

module.exports = Contact;