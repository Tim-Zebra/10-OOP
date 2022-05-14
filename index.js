// Node.js command line application
const inquirer = require('inquirer-promise');
const fs = require('fs');

// Classes
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

let team = [];
let needTeamMembers = true;

// Creates all aspects of team
async function createTeam() {
    // Gets manager info
    await createManager();

    // Adds team members
    await addTeamMembers();

    // Future Dev: Delete Option

    // Starts HTML Generation
    generatreHTML();
}

// Adds team members
async function addTeamMembers() {
    // Prompt to add engineer or intern to team, if neither then loop cancels 
    while(needTeamMembers === true) {
        let choice = '';
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
                choice = response.choice;
            })   
            
        if (choice === 'Stop building team') {
            needTeamMembers = false;
        } else if (choice === 'Add Engineer') {
            await addEngineer();
        } else if (choice === 'Add Intern') {
            await addIntern();
        }
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
            message: 'What is the engineer\'s name?',
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
    const internPrompts = [
        {
            type: 'input',
            message: 'What is the intern\'s name?',
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
            message: 'Please enter the name of their school:',
            name: 'school'
        } 
    ];

    await inquirer
        // Gets manager info and stores it into our team array
        .prompt(internPrompts)
        .then((response) => {
            let employee = new Intern(response.name, response.empId, response.email, response.school);
            team.push(employee);
        })     
}

// Processes obtained data 
function generatreHTML() {
    // HTML Elements
    // let main = $('#main');
    // let mngSectEl = $('<section>');
    // let empSectEl = $('<section>');
    // let intSectEl = $('<section>');
    
    // Go through all the options in the array, and adds those to their respective section
    for (const value of team) {
        // Finds the role and appends to the desired section
        if (value.getRole() === 'Manager') {
            // Add title, set as header of card
            mngSectEl = generateHTMLEl(value); 
            // Add attributes, set in body of card


        } else if (value.getRole() === 'Engineer') {
            // Add title, set as header of card

            // Add attributes, set in body of card

        } else if (value.getRole() === 'Intern') {
            // Add title, set as header of card

            // Add attributes, set in body of card

        }
    }


    // Append each of these sections to the main. Organized by Manager, Employee, and Intern
    // Add the card class to each of these elements inside the section
    // Display the sections as a block


}
// Start application
function init() {
    createTeam();

}
init();

// HTML functionality
// Click on an email address => default email program opens
// Click on github name => new tab for github repo

// // Save data locally from input
// function saveData () {
//     // Stores new data into the object
//     fs.writeFile("teamData.json", JSON.stringify(team), (err) =>
//     err ? console.error(err) : console.log('Success!'));
// }

// // loads local data if present
// function loadData () {
//     // Stores new data into the object
//     let teamData = [];
//     fs.readFile("teamData.json", 'utf8', (err,data) => {
//         if (!err) {
//             teamData=JSON.parse(data);
//             team = teamData;
//             generatreHTML()
//         }
//     });
// }