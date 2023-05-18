const express = require('express');
const cors = require('cors');
const ctrl = require('../../controllers/contacts');
const {isValidId, validateBody} = require('../../meddlewares');
const {schemas} = require('../../models/contacts/contact')

const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:id', isValidId, ctrl.getById)

router.post("/", validateBody(schemas.addSchema), ctrl.addContact)

router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrl.updateById)

// router.delete('/:id', isValidId, ctrl.deleteContact)

module.exports = router;
