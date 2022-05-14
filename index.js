// Node.js command line application
const inquirer = require('inquirer-promise');
const fs = require('fs');
const open = require('open');

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
    let main = $('#main');
    let mngSectEl = $('<section>');
    let empSectEl = $('<section>');
    let intSectEl = $('<section>');
    
    // Go through all the options in the array, and adds those to their respective section
    for (const value of team) {
        if (value.getRole() === 'Manager') {
            mngSectEl.append(generateCardEl(value)); 
        } else if (value.getRole() === 'Engineer') {
            empSectEl.append(generateCardEl(value));

        } else if (value.getRole() === 'Intern') {
            intSectEl.append(generateCardEl(value));
        }

        // Appents elements to main
        main.append(mngSectEl);
        main.append(empSectEl);
        main.append(intSectEl);

        // Boots up HTML page
    }


    // Append each of these sections to the main. Organized by Manager, Employee, and Intern
    // Add the card class to each of these elements inside the section
    // Display the sections as a block

}



// Add team member info to card, set in body of card
function generateCardEl(obj) {
    // Generates manager card, accounting for manager's unique properties
    if (obj.getRole() === 'Manager') {
        let cardEl = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${obj.name}e</h5>+
                <h6 class="card-subtitle mb-2 text-muted">Manager</h6>
                <p class="card-text">Employee ID: ${obj.id}</p>
                <a href="mailto:${obj.email}" class="card-text">Email: ${obj.email}</a>
                <a href="tel:${obj.officeNum}" class="card-text">Office Number: ${obj.officeNum}</a>
            </div>
        </div>`
    } 
    // Generates engineer card, accounting for engineer's unique properties
    else if (obj.getRole() === 'Engineer') {
        let cardEl = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${obj.name}e</h5>
                <h6 class="card-subtitle mb-2 text-muted">Engineer</h6>
                <p class="card-text">Employee ID: ${obj.id}</p>
                <a href="mailto:${obj.email}" class="card-text">Email: ${obj.email}</a>
                <a href="tel:${obj.github}" class="card-text">GitHub: ${obj.officeNum}</a>
            </div>
        </div>`
    } 
    // Generates intern card, accounting for intern's unique properties
    else if (obj.getRole() === 'Intern') {
        let cardEl = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${obj.name}e</h5>
                <h6 class="card-subtitle mb-2 text-muted">Intern</h6>
                <p class="card-text">Employee ID: ${obj.id}</p>
                <a href="mailto:${obj.email}" class="card-text">Email: ${obj.email}</a>
                <a href="tel:${obj.school}" class="card-text">School: ${obj.school}</a>
            </div>
        </div>`
    }

    return cardEl;
}

// Start application
function init() {
    // createTeam();

 

  
// Opens the file immediately into desktop
open('C:/Users/mog_f/Desktop/bootcampfolder/Repository GetHub/Homework/10-Homework_OOP/generatedHTMLs/index.html');

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