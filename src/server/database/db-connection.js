/* Set up */
//require('dotenv').config();
const mongoose = require('mongoose');

/* Database connection */
const db = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(db => console.log('[MongoDB] database is online... [\u2713]'.brightBlue))
  .catch(error => console.warn(error.red));

/* Exports */
module.exports = db;