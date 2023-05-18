const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchema = require('../models/users');
const ErrorHandler = require('../errors/Error');

const { JWT_SECRET = 'abrakadabra' } = process.env;

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  UserSchema.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ErrorHandler(409, 'a user with this email already exists'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      UserSchema.create({ email, name, password: hash })
        .then((user) => res.send({ user }))
        .catch((err) => {
          if (err.name === 'Validation Error') {
            next(
              new ErrorHandler(
                400,
                `${Object.values(err.errors)
                  .map((error) => error.message)
                  .join(', ')}`
              )
            );
          } else {
            next(new ErrorHandler(500, 'internal server error'));
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return UserSchema.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ user, token });
    })
    .catch(() => {
      next(new ErrorHandler(401, 'incorrect email or password'));
    });
};
const getUserInfo = (req, res, next) => {
  UserSchema.findById(req.user._id)
    .orFail(() => {
      next(new ErrorHandler(404, 'No user found with this Id'));
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ErrorHandler(400, err.message));
      } else {
        next(err);
      }
    });
};

module.exports = { createUser, login, getUserInfo };
