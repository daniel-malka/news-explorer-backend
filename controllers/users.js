const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchema = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET } = require('../utils/config');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  UserSchema.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictError('a user with this email already exists'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      UserSchema.create({ email, name, password: hash })
        .then((user) => res.send({ user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(
              new BadRequestError(
                `${Object.values(err.errors)
                  .map((error) => error.message)
                  .join(', ')}`,
              ),
            );
          } else {
            next(err);
          }
        });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return UserSchema.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ user, token });
    })
    .catch(() => Promise.reject(new UnauthorizedError('incorrect email or password')));
};

const getUserInfo = (req, res, next) => {
  UserSchema.findById(req.user._id)
    .orFail(() => {
      next(new NotFoundError('No user found with this Id'));
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports = { createUser, login, getUserInfo };
