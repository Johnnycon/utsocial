const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const router = require('./router');

const app = express();

app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === 'production') {
  const staticFiles = express.static(path.join(__dirname, '/../client/build'));
  app.use(staticFiles);
  // app.use(express.static(path.join(__dirname, '../client/build')));
}

// MongodDb connection
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://localhost/universocial');
}

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

router(app);

module.exports = app;
