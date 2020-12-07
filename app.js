
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const questions = require ('./lib/questions');
const chalk = require('chalk'); // chalk npm package to output colored text into console

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = []; // Array to keep all employees as info is collected

const askForTeamInfo = async () => {
    // Ask what type of employee want to add to team
    return await inquirer.prompt(questions.role)
    .then(type => {
        
        if (type.role !== 'generate') { // if generate option selected then call render function
            // if not then ask empplyee based questions
            askEmployeeInfo(type);
        } else {
            console.log(chalk.yellow(`Generating Team's Web page ...`));
            const html = render(team);
            saveFile(html);
        }
        
    });
}

// Function to ask more questions based on employee type
const askEmployeeInfo = async (type) => {
    console.log(chalk.yellow('-').repeat(60))
    return await inquirer.prompt(questions.employee)
    .then(employeeInfo => {
        inquirer.prompt(questions[type.role])
        .then(roleAnswer => {
            let allAnswers = {...employeeInfo, ...roleAnswer};
            console.log('\n');
            const { name, id, email, officeNumber, github, school} = allAnswers;
            switch (type.role) {
                case 'manager':
                    team.push(new Manager(name, id, email, officeNumber));
                    askForTeamInfo();
                    break;
                case 'engineer':
                    team.push(new Engineer(name, id, email, github));
                    askForTeamInfo();
                    break;
                case 'intern':
                    team.push(new Intern(name, id, email, school));
                    askForTeamInfo();
                    break;
            }
            return allAnswers;
        })
    })
}


// Function to save generated html file to hard drive
const saveFile = (html) => {
    // Check if output directory exist and create if it is not.
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, html, (err) => 
        err ? console.error(chalk.red(err)) : console.log(chalk.green('Successfully saved team.html to output directory!'))
    );
}

// Start application
console.log(chalk.cyan('\n=== Welcome to ') + chalk.cyan.bold('Team Profile Summary ') + chalk.cyan('page generator! ===\n'));
askForTeamInfo();
