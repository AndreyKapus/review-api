const express = require('express');
const cors = require('cors');

const contacts = require('../../models/contacts/contacts');
const { getAll } = require('../../models/contacts');

const router = express.Router()

router.get('/', async (req, res) => {
    const responce = await getAll()
    responce.json(contacts);
});

module.exports = router;
