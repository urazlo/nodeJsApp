const db = require('../models');
const createToken = require('../utils/createToken');
const hash = require('../utils/hash');
const validator = require('../utils/validator');

async function signIn(req, res) {
  try {
    let {
      login,
      password
    } = req.body;
    
    let user = await db.User.findOne({ login });

    if (!user) {
      return res.sendStatus(404);
    }

    if (hash(password) !== user.password) {
      return res.status(400).send('Wrong password');
    }

    user = user.toJSON();

    delete user.password;
    res.json({
      user,
      token: createToken({ id: user._id })
    })
  } catch (err) {
    console.log(err);

    console.error(err);
    res.sendStatus(500);
  }
};

 const signUp = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.sendStatus(400);
    }

    const { email, login } = req.body;

    const password = req.body.password.trim();

    if (!validator.password(password)) {
      return res.status(400).send('Invalid password');
    }

    let user = await db.User.create({ email, login, password: hash(password) });

    user = user.toJSON();

    delete user.password;

    res.json({
      user,
      token: createToken({ id: user._id })
    })
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

async function check(req, res) {
  try {

    const user = req.user.toJSON();

    delete user.password;

    res.json(user)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  signIn,
  signUp,
  check
};
