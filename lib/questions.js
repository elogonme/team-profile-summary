const inquirer = require('inquirer');

module.exports = questions = {
    role: [
        
            {
                type: 'list',
                message: 'Which role Employee would you like to add or finish?',
                name: 'role',
                choices: [
                {
                    name: 'Manager',
                    value: 'manager'
                },
                {
                    name: 'Engineer',
                    value: 'engineer'
                },
                {
                    name: 'Intern',
                    value: 'intern'
                },
                {
                    name: 'Finish => Generate Webpage',
                    value: 'generate'
                }],
            }
        ],
    employee: [
        {   
            
            type: 'input',
            name: 'name',
            message: `Please enter Employee's Name: `,
            validate: function (answer) {
                if (!answer) {
                  return 'You must enter name!.';
                }
                return true;
              },
        }, 
        {
            type: 'input',
            name: 'id',
            message: `Please enter Employee's ID: `,
            // Check if ID is entered and equals a Number
            validate: function requireNumber(value) {
                if (/\d/.test(value)) {
                  return true;
                }
                return 'Employee ID must be a Number!';
            },
        }, 
        {
            type: 'input',
            name: 'email',
            message: `Please enter Employee's email: `,
            // Check if email is entered in correct format
            validate: function (value) {
                var pass = value.match(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
                if (pass) {
                  return true;
                }
          
                return 'Please enter a valid email!';
              },
        }, 
    ],
    manager: [
        {
            type: 'input',
            name: 'officeNumber',
            message: `What is Manager's Office Number? `,
            validate: function requireNumber(value) {
                if (/\d/.test(value)) {
                  return true;
                }
                return 'Ofice Number must be a Number!';
            },
        }, 
    ],
    engineer: [
        {
            type: 'input',
            name: 'github',
            message: `What is Engineers's GitHub Profile username? `,
            validate: function (answer) {
                if (!answer) {
                  return 'You must enter GitHub Profile username!';
                }
                return true;
              },
        }, 
    ],
    intern: [
        {
            type: 'input',
            name: 'school',
            message: `What is Intern's School name? `,
            validate: function (answer) {
                if (!answer) {
                  return 'You must enter School name!';
                }
                return true;
              },
        }, 
    ],
}
