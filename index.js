// Node.js command line application
const inquirer = require('inquirer-promise');

// Classes
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const team = [];
// Take in manager's info
async function createTeam() {

    // Gets user prompts
    await createManager();
    console.log('first', team);
    // await createManager();
    await createManager();
    console.log('second', team);
    // team = createTeamMember(team);
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
            message: 'Please enter your email',
            name: 'email'
        },
        {
            type: 'input',
            message: 'Please enter your office phone number',
            name: 'phoneNum'
        } 
    ];


    await inquirer
        // Gets manager info and stores it into our team object
        .prompt(managerPrompts)
        .then((response) => {
            let employee = new Manager(response.name, response.empId, response.email, response.phoneNum);
            team.push(employee);
        })     
}

function createTeamMember(team) {
    console.log('b patient');
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


