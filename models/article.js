const { Schema, model } = require('mongoose');
const urlRegex = require('../utils/regex');
const ErrorHandler = require('../errors/Error');

const ArticleSchema = new Schema(
  {
    title: { type: String, required: [true, 'article title is required'] },
    keyword: { type: String, required: [true, 'keyword is required'] },
    text: { type: String, required: [true, 'text is required'] },
    date: { type: String, required: [true, 'date is required'] },
    source: { type: String, required: [true, 'source page name is required'] },
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.match(urlRegex),
        message: 'invalid url for the image soure',
      },
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.match(urlRegex),
        message: 'invalid url',
      },
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model('article', ArticleSchema);
