const inquirer = require('inquirer');

module.exports = questions = {
    type: [
            {
                type: 'list',
                message: 'Which role Employee would you like to add or finish?',
                name: 'role',
                choices: [
                {
                    name: 'Manager',
                },
                {
                    name: 'Engineer',
                },
                {
                    name: 'Interm',
                },
                {
                    name: 'Finish - generate',
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
        }, 
        {
            type: 'input',
            name: 'email',
            message: `Please enter Employee's email: `,
        }, 
    ],
    manager: [
        {
            type: 'input',
            name: 'officeNumber',
            message: `What is Manager's Office Number? `,
        }, 
    ],
    engineer: [
        {
            type: 'input',
            name: 'github',
            message: `What is Engineers's GitHub Profile username? `,
        }, 
    ],
    intern: [
        {
            type: 'input',
            name: 'school',
            message: `What is Intern's school name? `,
        }, 
    ],
}
