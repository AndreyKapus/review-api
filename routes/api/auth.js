const express = require('express');

const {validateBody} = require('../../meddlewares');
const {schemas} = require('../../models/user/user');
const ctrl = require('../../controllers/auth')

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

module.exports = router;