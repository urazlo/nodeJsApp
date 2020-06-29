const db = require('../models');
const hash = require('../utils/hash');
const config = require('../config/defaultConfig.json');

async function getUsers(req, res) {
  try {
    const users = await db.User.find({});

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
    const user = await db.User.findOne({ _id: id });

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  }
  catch (err) {
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

    password = hash(password, config.hashKey);
    const newUser = await db.User.create({ email, login, password });
    res.json(newUser);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const { login } = req.body;
    await db.User.findByIdAndDelete(id);
    res.send("User: " + login + " was deleted.");
  }
  catch (err) {
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
    password = hash(password, config.hashKey );
    const newUser = { email, login, password };
    const updatedUser = await db.User.findOneAndUpdate({ _id: id }, newUser);

    if (!updatedUser) {
      return res.sendStatus(404);
    }

    res.json(updatedUser);
  }
  catch (err) {
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
