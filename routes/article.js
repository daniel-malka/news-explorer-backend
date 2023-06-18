const router = require('express').Router();
const {
  validateArticleBody,
  validateObjectId,
} = require('../middlewars/validation');
const {
  unsaveArticle,
  getSavedArticles,
  saveArticle,
} = require('../controllers/articles');

router.get('/articles', getSavedArticles);
router.post('/articles', /*validateArticleBody, */ saveArticle);
router.delete('/articles/:articleId', /*validateObjectId,*/ unsaveArticle);

module.exports = { ArticleRouter: router };
