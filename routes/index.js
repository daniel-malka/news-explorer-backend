const router = require('express').Router();
const { UserRouter } = require('./users');
const { ArticleRouter } = require('./article');
const nonRoute = require('./nonRoute');
const auth = require('../middlewars/auth');
const { createUser, login } = require('../controllers/users');
const {
  validateAuthentication,
  validateUserBody,
} = require('../middlewars/validation');

router.post('/signup', validateAuthentication, createUser);
router.post('/signin', validateUserBody, login);

router.use(auth);

router.use('/', UserRouter);
router.use('/', ArticleRouter);
router.use('*', nonRoute);

module.exports = { router };
