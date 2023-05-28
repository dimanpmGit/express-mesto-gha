/* eslint-disable comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const { celebrate, Joi } = require('celebrate');
const { URL_PATTERN, ID_PATTERN } = require('../utils/constants');

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

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URL_PATTERN),
  }).unknown(true),
});

const userIdValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(ID_PATTERN),
  }).unknown(true),
});

module.exports = {
  signupValidation,
  signinValidation,
  updateProfileValidation,
  updateAvatarValidation,
  userIdValidation,
};
