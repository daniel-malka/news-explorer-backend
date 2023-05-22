const router = require('express').Router();
const NotFoundError = require('../errors/ConflictError');

module.exports = NotFoundError;

router.use((req, res, next) => {
  next(new NotFoundError(404, 'The requested resource was not found'));
});

module.exports = router;
