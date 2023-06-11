const router = require('express').Router();
const {
  validateArticleBody,
  validateObjectId,
} = require('../middlewars/validation');
const {
  postArticle,
  deleteArticle,
  getUserArticles,
} = require('../controllers/articles');

router.get('/', getUserArticles);
router.post('/articles', validateArticleBody, postArticle);
router.delete('/:articleId', validateObjectId, deleteArticle);

module.exports = { ArticleRouter: router };
