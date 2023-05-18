const {Schema, model} = require('mongoose');
const Joi = require('joi');
const handleStatusError = require('../../helpers/handleStatusError');

const dateRegexp = /^\d{2}.\d{2}.\d{4}$/;

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
        match: dateRegexp,
        require: true,
    },
    link: {
        type: String,
        require: true,
    },
}, {versionKey: false, timestamps: true});

contactSchema.post('save', handleStatusError);

const addSchema = Joi.object({
    name: Joi.string().required(),
    company: Joi.string().required(),
    date: Joi.string().pattern(dateRegexp).required(),
    link: Joi.string().required(),
  });

const schemas = {
    addSchema,
}

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    schemas,
}