const io = require('socket.io-client');
const inquirer = require('inquirer');
const isEmpty = require('is-empty');

require('colors');

module.exports = function (user) {

  const socket = io('http://192.168.0.7:5000');

  console.log(`\n\tWelcome  ${user} \n`)

  //Emit new user
  socket.emit('new user', user);

  //On user joined
  socket.on('user joined', data => {
    const { nickname, users } = data;

    console.log(`\n${nickname} has joined the chat`.brightGreen);
    console.log(`Users online: ${users}\n`.brightGreen);
  });

  //On user left
  socket.on('user left', data => {
    const { nickname, users } = data;
    console.log(`\n${nickname} has left the chat`.brightRed);
    console.log(`Users online: ${users}\n`.brightGreen);
  });

  readInput();

  //On new message from server
  socket.on('new msg', data => {
    const { nickname, message } = data;

    console.log(`\n${nickname.bold.brightWhite}: ${message}`)
  })

  //Read input 
  function readInput() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'input',
          message: '>',
          validate: value => !isEmpty(value) ? true : 'You must type something'
        }
      ])
      .then(answers => {
        //Send message to server
        const { input } = answers;
        socket.emit('new msg', input);
        readInput();
      })
      .catch(error => {
        console.error(error);
        process.exit();
      });
  }
}