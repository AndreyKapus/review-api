const express = require('express');
const cors = require('cors');

const contacts = require('../../models/contacts');
const HttpError = require('../../helpers/HttpError')

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const responce = await contacts.getAll();
        res.json(responce);
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
});

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const result = await contacts.getById(id);
        if(!result) {
            throw HttpError(404, "Not found")
            // const error = new Error("Not found");
            // error.status = 404;
            // throw error;
        }
        res.json(result)
    } catch(error) {
        const {status = 500, message = "Server error"} = error
        res.status(status).json({
            message,
        })
    }
})

module.exports = router;
