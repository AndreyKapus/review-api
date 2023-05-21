const express = require('express');
const cors = require('cors');
const ctrl = require('../../controllers/contacts');
const {isValidId, validateBody, authenticate} = require('../../meddlewares');
const {schemas} = require('../../models/contacts/contact');
// const authenticate = require('../../meddlewares/authenticate')

const router = express.Router()

router.get('/', authenticate, ctrl.getAll)

router.get('/:id', authenticate, isValidId, ctrl.getById)

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addContact)

router.put('/:id', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById)

router.delete('/:id', authenticate, isValidId, ctrl.deleteContact)

module.exports = router;
