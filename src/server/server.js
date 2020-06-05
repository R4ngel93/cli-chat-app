/* Set up */
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 5000;

const UsersRoutes = require('./routes/users.routes');
const serverSocket = require('./serverSocket');
require('./database/db-connection');

require('colors');

const app = express();
const server = require('http').Server(app);

/* Settings & middlewares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Socket.io */
serverSocket(server);

/* Routes */
app.use('/api/users', UsersRoutes);

/* Server */

server.listen(port, () => {
  console.log(`[Node.js] server on port [${port}] [\u2713]`.brightBlue);
});