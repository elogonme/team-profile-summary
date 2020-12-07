
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const questions = require ('./lib/questions')

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
            console.log('Generating Team Web page ...');
            const html = render(team);
            saveFile(html);
        }
        
    });
}

// Function to ask more questions based on employee type
const askEmployeeInfo = async (type) => {
    return await inquirer.prompt(questions.employee)
    .then(employeeInfo => {
        inquirer.prompt(questions[type.role])
        .then(roleAnswer => {
            let allAnswers = {...employeeInfo, ...roleAnswer};
            console.log(allAnswers);
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

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

const saveFile = (html) => {
    // Check if output directory exist and create if it is not.
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, html, (err) => 
        err ? console.error(err) : console.log('Successfully saved team.html to output directory!')
    );
}

askForTeamInfo();
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

