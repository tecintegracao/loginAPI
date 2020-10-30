const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const User = require('../models/user');

const router = express.Router();

function tokenGenerator(params = {}) {
  return jwt.sign(params, authConfig.secret, { expiresIn: 86400 });
}

router.post('/cadastrar', async (req, res) => {
  try {
    const { email } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: 'Usuário já cadastrado!' });
    }

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ user, token: tokenGenerator({ id: user.id }) });
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Desculpe, não foi possível efetuar o cadastro.' });
  }
});

router.post('/autenticar', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(400).send({ error: 'Usuário não encontrado.' });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: 'Senha incorreta.' });

  user.password = undefined;

  res.send({ user, token: tokenGenerator({ id: user.id }) });
});

module.exports = (app) => app.use('/auth', router);
