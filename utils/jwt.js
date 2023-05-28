/* eslint-disable eol-last */
/* eslint-disable arrow-body-style */
/* eslint-disable import/newline-after-import */
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'donottrytogetthissupersecretsecret';

const getJwtToken = (id) => {
  console.log(id);
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

module.exports = {
  getJwtToken,
};