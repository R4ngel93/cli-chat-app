const inquirer = require('inquirer');

const loginUser = require('./functions/logInUser');
const registerUser = require('./functions/registerUser');

require('colors');

function main() {

  /* Add new user */
  console.log('\n\tWelcome to Chat CLI App\n'.bold.brightWhite)
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: [
          'Sign Up',
          'Login',
          new inquirer.Separator(),
          'Exit'
        ]
      }
    ])
    .then(answers => {
      const { menu } = answers;

      switch (menu) {
        case 'Sign Up':
          registerUser();
          break;
        case 'Login':
          loginUser();
          break;
        case 'Exit':
          console.log('\nSaliendo...');
          process.exit();
          break;
        default:
          process.exit();
          break;
      }
    })
    .catch(error => console.error(error))
};

/* Call main function */
main();

module.exports = main;