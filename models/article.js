const validator = require("validator");
const urlRegex = require("../utils/regex");
const ErrorHandler = require("../errors/Error");
const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema({
  title: { type: String, required: [true, "article title is required"] },
  keyword: { type: String, required: [true, "keyword is required"] },
  text: { type: String, required: [true, "text is required"] },
  date: { type: String, required: [true, "date is required"] },
  source: { type: String, required: [true, "source page name is required"] },
  owner: {
    type: String,
    requires: [true, "id of owner i required"],
    select: false,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.match(urlRegex),
      message: "invalid url for the image soure",
    },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.match(urlRegex),
      message: "invalid url",
    },
  },
});

ArticleSchema.statics.findUserByCredentials = function (_id) {
  if (!_id) {
    new ErrorHandler(401, "there are no articles savd by this user");
  }
  return this.find({ _id });
};

module.exports = model("article", ArticleSchema);
