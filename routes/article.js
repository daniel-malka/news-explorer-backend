const router = require('express').Router();
const {
  validateArticleBody,
  validateObjectId,
} = require('../middlewars/validation');
const {
  deleteArticle,
  getSavedArticles,
  saveArticle,
} = require('../controllers/articles');

router.get('/articles', getSavedArticles);
router.post('/articles', /*validateArticleBody, */ saveArticle);
router.delete('/:articleId', validateObjectId, deleteArticle);

module.exports = { ArticleRouter: router };
