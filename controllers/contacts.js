const Joi = require('joi');
const contacts = require('../models/contacts');
const HttpError = require('../helpers/HttpError');
const { ctrlWrapper } = require('../helpers');

const addSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required()
  });

  const getAll = async (req, res) => {
        const responce = await contacts.getAll();
        res.json(responce);
};

const getById = async (req, res) => {
        const {id} = req.params;
        const result = await contacts.getById(id);
        if(!result) {
            throw HttpError(404, "Not found")
        }
        res.json(result)
};

const addContact = async (req, res) => {
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message)
        }
        const result = await contacts.add(req.body);
        res.status(201).json(result)
};

const updateById = async (req, res) => {
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message)
        };
        const {id} = req.params;
        const result = await contacts.updateById(id, req.body);
        if(!result) {
            throw HttpError(404, "Not found")
        };
        res.json(result)
};

const deleteContact = async (req, res) => {
        const {id} = req.params;
        const result = await contacts.deleteById(id);
        if(!result) {
            throw HttpError(404, "Not found")
        };
        res.json({
            message: "delete success"
        })
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    updateById: ctrlWrapper(updateById),
    deleteContact: ctrlWrapper(deleteContact)
}