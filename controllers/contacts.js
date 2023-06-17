const HttpError = require('../helpers/HttpError');
const { ctrlWrapper } = require('../helpers');
const {Contact} = require('../models/contacts/contact')

  const getAll = async (req, res) => {
        const {_id: owner} = req.user;
        const {page = 1, limit = 20} = req.query;
        const skip = (page - 1) * limit;
        const responce = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate('contacts');
        res.json({
            responce,
            Contact
        });
};

const getById = async (req, res) => {
        const {id} = req.params;
        const result = await Contact.findById(id);
        if(!result) {
            throw HttpError(404, "Not found")
        }
        res.json(result)
};

const addContact = async (req, res) => {
        const {_id: owner} = req.user
        const result = await Contact.create({...req.body, owner});
        res.status(201).json(result)
};

const updateById = async (req, res) => {
        const {id} = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
        if(!result) {
            throw HttpError(404, "Not found")
        };
        res.json(result)
};

const deleteContact = async (req, res) => {
        const {id} = req.params;
        const result = await Contact.findByIdAndRemove(id);
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