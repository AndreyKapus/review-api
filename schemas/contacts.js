const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string().required(),
    company: Joi.string().required(),
    date: Joi.string().required(),
    link: Joi.string().required(),
  });

  module.exports = {
    addSchema
  }