const db = require('../models');
const hash = require('../utils/hash');
const validator = require('../utils/validator');
const errorHandler = require('../utils/errorHandler');

async function getUsers(req, res) {
  try {
    const users = await db.User.find({}, { "password": 0 });

    if (!users) {
      return res.sendStatus(404);
    }

    res.json(users);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

async function getUser(req, res) {
  try {
    const { id } = req.params;

    const user = await db.User.findOne({ _id: id }, { "password": 0 });

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  }
  catch (err) {
    const message = errorHandler(err);

    if (message) {
      return res.status(400).send(message);
    }

    console.error(err);
    res.sendStatus(500);
  }
};

async function createUser(req, res) {
  try {
    let {
      email,
      login,
      password
    } = req.body;

    if (!validator.password(password)) {
      return res.status(400).send('Invalid password');
    }

    let newUser = await db.User.create({ email, login, password: hash(password) });

    newUser = newUser.toJSON();

    delete newUser.password;

    res.json(newUser);
  }
  catch (err) {
    const message = errorHandler(err);

    if (message) {
      return res.status(400).send(message);
    }

    console.error(err);
    res.sendStatus(500);
  }
};

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    await db.User.findByIdAndDelete(id);

    return res.status(204).send('Not found');
  }
  catch (err) {
    const message = errorHandler(err);

    if (message) {
      return res.status(400).send(message);
    }

    console.error(err);
    res.sendStatus(500);
  }
};

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    let {
      email,
      login,
      password
    } = req.body;
    
    let newUser = {};

    if (!password) {
      newUser = { email, login };
    } else {
      newUser = { email, login, password: hash(password) };

      if (!validator.password(password)) {
        return res.status(400).send('Invalid password');
      }
    }
    
    let updatedUser = await db.User.findOneAndUpdate({ _id: id }, newUser);

    if (!updatedUser) {
      return res.sendStatus(404);
    }

    updatedUser = updatedUser.toJSON();

    delete updatedUser.password;

    res.json(updatedUser);
  }
  catch (err) {
    const message = errorHandler(err);

    if (message) {
      return res.status(400).send(message);
    }

    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
};
