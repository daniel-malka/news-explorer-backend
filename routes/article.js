const router = require("express").Router();

const {
  postArticle,
  deleteArticle,
  getUserArticles,
} = require("../controllers/articles");

router.get("/", getUserArticles);
router.post("/", postArticle);
router.delete("/:articleId", deleteArticle);

module.exports = { ArticleRouter: router };
