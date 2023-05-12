const express = require('express');
const cors = require('cors');

const contacts = require('../../models/contacts');
// const { getAll } = require('../../models/contacts');

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

module.exports = router;
