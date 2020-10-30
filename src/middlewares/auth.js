const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'Token não fornecido.' });

  const parts = authHeader.split(' ');

  if (!parts.lengh === 2)
    return res.status(401).send({ error: 'Token incorreto.' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token em formato incorreto.' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido.' });

    req.userId = decoded.id;

    return next();
  });
};
