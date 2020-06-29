const express = require('express');
const controller = require('../controllers/auth');
const isAuth = require('../middlewhares/isAuth');
const router = express.Router();

router.post('/sign-in', controller.signIn);

router.post('/sign-up', controller.signUp);

router.get('/check', isAuth, controller.check);

module.exports = router;
