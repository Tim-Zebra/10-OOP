// Node.js command line application
const inquirer = require('inquirer-promise');

// Classes
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const team = [];
let needTeamMembers = true;

// Creates all aspects of team
async function createTeam() {
    // Gets manager info
    // await createManager();

    // Adds team members
    await addTeamMembers();
    console.log(team);
}

// Adds team members
async function addTeamMembers() {
    // Prompt to add engineer or intern to team, if neither then loop cancels 
    while(needTeamMembers === true) {
        await inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Please select a type of team member to add:',
                    name: 'choice',
                    choices: ['Add Engineer','Add Intern','Stop building team']
                }
            ])
            .then((response) => {
                if (response.choice === 'Stop building team') {
                    console.log('stop');
                    needTeamMembers = false;
                } else if (response.choice === 'Add Engineer') {
                    // addEngineer();
                    console.log('engin')
                } else if (response.choice === 'Add Intern') {
                    addIntern();
                    console.log('intern')
                }
            })    
    }

}

async function createManager() {
    // Manager Prompts
    const managerPrompts = [
        {
            type: 'input',
            message: 'What is the manager\'s name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is your employee ID?',
            name: 'empId',
        },
        {
            type: 'input',
            message: 'Please enter your email:',
            name: 'email'
        },
        {
            type: 'input',
            message: 'Please enter your office phone number:',
            name: 'phoneNum'
        } 
    ];

    await inquirer
        // Gets manager info and stores it into our team array
        .prompt(managerPrompts)
        .then((response) => {
            let employee = new Manager(response.name, response.empId, response.email, response.phoneNum);
            team.push(employee);
        })     
}

async function addEngineer() {
    // Manager Prompts
    const engineerPrompts = [
        {
            type: 'input',
            message: 'What is the engineer\s name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is their employee ID?',
            name: 'empId',
        },
        {
            type: 'input',
            message: 'Please enter their email:',
            name: 'email'
        },
        {
            type: 'input',
            message: 'Please enter their GitHub username:',
            name: 'github'
        } 
    ];

    await inquirer
        // Gets manager info and stores it into our team array
        .prompt(engineerPrompts)
        .then((response) => {
            let employee = new Engineer(response.name, response.empId, response.email, response.github);
            team.push(employee);
        })     
}

async function addIntern() {

}




// Start application
function init() {
    createTeam();
}
init();



// Presented with a menu with the option to add an engineer or an inter, or finish building my 

// Takes info about employees - 
// Consider adding a validation to ensure user input is the proper format.
// Bonus: Add a delete function



// Prompt getting team member names and info (emails/github)
// If employee is an enginneer get: Name, ID, email, and github, username.
// If employee is an intern get: Name ID, email, and school
// After submitting an employee, I am taken back to the menu (to add/etc)
// After finished building, generate HTML file.


// Generate HTML file displaying a nicely formated team roster
// Webpage that displays summaries for each person. (Name, ID, Email, github/school)

// HTML functionality
// Click on an email address => default email program opens
// Click on github name => new tab for github repo



// Write a unit test for every part of your code
// Create a.test JS file for each js excluding index.js


