const express = require('express');
const cors = require('cors');
const ctrl = require('../../controllers/contacts');
const {validateBody} = require('../../meddlewares');
const schemas = require('../../schemas/contacts')

const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:id', ctrl.getById)

router.post("/", validateBody(schemas.addSchema), ctrl.addContact)

router.put('/:id', validateBody(schemas.addSchema), ctrl.updateById)

router.delete('/:id', ctrl.deleteContact)

module.exports = router;
