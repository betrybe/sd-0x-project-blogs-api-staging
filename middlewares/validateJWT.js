const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { User } = require('../models');
require('dotenv').config();

const jwtSecret = '45425445454';

const validateJWT = rescue(async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ error: true, message: 'Token não encontrado', code: 'unauthorized' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userExists = await User.findByPk(decoded.id);

    if (!userExists) return next({ error: true, message: 'Usuário não encontrado', code: 'unauthorized' });

    const { dataValues: { password: _, ...userWithoutPassword } } = userExists;

    req.user = userWithoutPassword;
    return next();
  } catch (fail) {
    return next({ error: true, message: 'Token expirado ou inválido', code: 'unauthorized' });
  }
});

module.exports = validateJWT;
