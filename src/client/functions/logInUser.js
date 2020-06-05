const inquirer = require('inquirer');
const isEmpty = require('is-empty');
const axios = require('axios');

const clientSocket = require('./clientSocket');

require('colors');

module.exports = async function () {

  let users = [];
  /* Get users list */
  await axios.get('http://192.168.0.7:5000/api/users/')
    .then(res => {
      res.data.map(user => users.push(user.nickname));
    })
    .catch(error => {
      console.error('API log: ', error);
      process.exit();
    })

  /* Get name and password */
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'user',
        message: 'Select your name from the list',
        choices: users,
      }
    ])
    .then(answers => {
      const { user } = answers;
      inquirer
        .prompt([
          {
            type: 'password',
            name: 'password',
            message: 'Enter password',
            mask: '*',
            validate: value => !isEmpty(value) ? true : 'Password must not be empty'
          }
        ])
        /* POST data */
        .then(answers => {
          const { password } = answers;

          const obj = {
            nickname: user,
            password: password
          }

          axios.post('http://192.168.0.7:5000/api/users/login', obj)
            .then(res => {
              console.log('API log: ', res.data.message.green);
              clientSocket(user);
            })
            .catch(error => {
              console.error('API log: ', error.response.data.message.red)
              process.exit();
            })
        })
        .catch(error => {
          console.error(error);
          process.exit();
        })
    })
    .catch(error => {
      console.error(error);
      process.exit();
    });
}