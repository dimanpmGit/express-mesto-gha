const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  MESSAGE_400,
  MESSAGE_500,
} = require('./constants');

const errorReturn = (res, err) => {
  if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
    return res.status(BAD_REQUEST).send({ message: MESSAGE_400 });
  }
  return res.status(INTERNAL_SERVER_ERROR).send({ message: MESSAGE_500 });
};

module.exports = { errorReturn };
