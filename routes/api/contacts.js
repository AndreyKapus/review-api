const express = require('express');
const cors = require('cors');

const contacts = require('../../models/contacts/contacts');

const router = express.Router()

router.get('/', (req, res) => {
    res.json(contacts);
});

module.exports = router;
