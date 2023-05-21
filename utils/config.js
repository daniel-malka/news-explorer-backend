const {
  JWT_SECRET = 'kulululu',
  PORT = 3001,
  MONGO_URL = 'mongodb://localhost:27017/news-explorer',
} = process.env;

module.exports = { JWT_SECRET, PORT, MONGO_URL };
