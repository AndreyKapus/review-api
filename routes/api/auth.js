const express = require('express');

const {validateBody, authenticate} = require('../../meddlewares');
const {schemas} = require('../../models/user/user');
const ctrl = require('../../controllers/auth')

const router = express.Router();

// - Signup -
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationCode', ctrl.verifyEmail);

router.post('/verify', ctrl.resendVerifyEmail)

// - Login -
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout)

module.exports = router;