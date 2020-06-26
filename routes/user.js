const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

router.get('/:id', userController.getUser);

router.delete('/:id', userController.deleteUser);

router.patch('/:id', userController.updateUser);

module.exports = router;