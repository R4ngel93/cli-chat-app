module.exports = function (server) {
  const io = require('socket.io')(server);

  let users = 0;

  /* Connection */
  io.on('connection', socket => {
    console.log('[Socket.io] new client connection [\u2713]'.green);

    //On new user
    socket.on('new user', user => {
      socket.nickname = user;
      users++;

      socket.broadcast.emit('user joined', {
        nickname: socket.nickname,
        users
      });
    });

    //On new message
    socket.on('new msg', message => {
      socket.broadcast.emit('new msg', {
        nickname: socket.nickname,
        message
      });
    });


    /* Disconnect */
    socket.on('disconnect', () => {
      console.warn('[Socket.io] client disconnected [x]'.red);
      users--;

      socket.broadcast.emit('user left', {
        nickname: socket.nickname,
        users
      });
    });

  });

}
