const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { router } = require('./routes');
const { requestLogger, errorLogger } = require('./middlewars/logger');
const { requestsLmiter } = require('./middlewars/secureLimit');

const { PORT, MONGO_URL, NODE_ENV } = require('./utils/config');

const isProduction = NODE_ENV !== 'production';
const port = isProduction ? PORT : 3001;

const app = express();
mongoose.connect(MONGO_URL);

app.use(requestLogger);
app.use(cors());
app.options('*', cors());
app.use(helmet());
// app.use(requestsLmiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
  next();
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
