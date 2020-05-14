// Require mongoose module
const mongoose = require('mongoose');

// Require validator module
const validator = require('validator');

// Setup connection url
const connectionURL = process.env.DB_CONNECTION_URL;

// connect to the database
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
