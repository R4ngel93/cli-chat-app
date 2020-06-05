const inquirer = require('inquirer');
const isEmpty = require('is-empty');
const axios = require('axios');

require('colors');

module.exports = function () {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'nickname',
        message: 'Enter your nickname',
        validate: value => !isEmpty(value) ? true : 'Nickname must not be empty'
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter a password',
        mask: '*',
        validate: value => !isEmpty(value) && value.length >= 6 ? true : 'Password must be at least 6 characters'
      }

    ])
    .then(answers => {
      const obj = {
        nickname: answers.nickname,
        password: answers.password
      }

      axios.post('http://192.168.0.7:5000/api/users/signup', obj)
        .then(res => {
          console.log('API log: ', res.data.message.green);
        })
        .catch(error => {
          console.error('API log: ', error.response.data.message.red)
          process.exit()
        })
        .then(() => {
          inquirer
            .prompt([
              {
                type: 'confirm',
                name: 'return',
                message: 'Do you want to exit?',
                default: true,
              }
            ])
            .then(answers => {
              const main = require('../client');
              answers.return ? process.exit() : main()
            })
            .catch(error => {
              console.error(error)
              process.exit()
            });
        })
    })
    .catch(error => {
      console.error(error)
      process.exit()
    });

}