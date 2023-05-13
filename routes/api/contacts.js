const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const contacts = require('../../models/contacts');
const HttpError = require('../../helpers/HttpError');

const addSchema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required()
  })

const router = express.Router()

router.get('/', async (req, res, next) => {
    try{
        const responce = await contacts.getAll();
        res.json(responce);
    } catch (error) {
        next(error)
        // res.status(500).json({
        //     message: "server error"
        // })
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const result = await contacts.getById(id);
        if(!result) {
            throw HttpError(404, "Not found")
        }
        res.json(result)
    } catch(error) {
        next(error)
        // const {status = 500, message = "Server error"} = error
        // res.status(status).json({
        //     message,
        // })
    }
});

router.post("/", async (req, res, next) => {
    try{
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message)
        }
        const result = await contacts.add(req.body);
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
});

router.put('/:id', async (req, res, next) => {
    try{
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
        } catch(error) {
            next(error)
        }
})

module.exports = router;
