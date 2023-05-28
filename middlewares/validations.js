/* eslint-disable import/no-extraneous-dependencies */
const { celebrate, Joi } = require('celebrate');
const { URL_PATTERN } = require('../utils/constants');

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_PATTERN),
  }).unknown(true),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
});

const getCurrentUserValidation = celebrate({
  body: Joi.object({
    token: Joi.string().required().regex(/abc\d{3}/)
  }).unknown(true),
});

module.exports = {
  signupValidation,
  signinValidation,
  getCurrentUserValidation,
};
