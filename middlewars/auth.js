const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');

  const payload = jwt.verify(token, JWT_SECRET);

  if (!payload) {
    next(
      new UnauthorizedError(
        'Authorization is required, you first need to login.',
      ),
    );
  }
  req.user = payload;
  return next();
};

module.exports = auth;
