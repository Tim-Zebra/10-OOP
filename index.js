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
async function generatreHTML() {
    // filenames
    let fileName = "";
    let filePath = 'C:/Users/mog_f/Desktop/bootcampfolder/Repository GetHub/Homework/10-Homework_OOP/generatedHTMLs/'

    // Adds first section of HTML file
    let htmlData = generateHTMLHead();

    // HTML Elements
    let main = $('<main>');
    let mngSectEl = $('<section>');
    let empSectEl = $('<section>');
    let intSectEl = $('<section>');
    
    // Go through all the options in the array, and adds those to their respective section
    for (const value of team) {
        if (value.getRole() === 'Manager') {
            mngSectEl.append(generateCardEl(value)); 
            fileName = value.name + 'sTeam.html'
        } else if (value.getRole() === 'Engineer') {
            empSectEl.append(generateCardEl(value));

        } else if (value.getRole() === 'Intern') {
            intSectEl.append(generateCardEl(value));
        }
    }
        // Appents elements to main
        main.append(mngSectEl);
        main.append(empSectEl);
        main.append(intSectEl);

        console.log('This happened', main);
        // Adds center section to HTML file
        htmlData = addAsHTMLComponent(htmlData, main);

        // Adds last section to HTML file
        htmlData = addAsHTMLComponent(htmlData, generateHTMLBottom());

    // Creates HTML Page
    await writeToFile(fileName, filePath, htmlData,);

    // Boots up HTML page
    openHTMLFile(filePath+fileName);
}

// Generates the top portion of the HMTL
function generateHTMLHead() {
    return `
    <!DOCTYPE html>
    <html lang="en-us">

        <head>       
            
            <meta charset="UTF-8" />

            <!-- Tab Heading -->
            <link rel="icon" type="image/x-icon" href="./assets/images/favicons/team.ico" id="favicon"> 
            <title>Team Builder Application</title>

            <!-- CSS scripts: Bootstrap, custom-->
            <link rel="stylesheet" href="./assets/css/bootstrap.min.css">
            <link rel="stylesheet" href="./assets/css/style.css">
        </head>

        <body>
            <header>
                <h1>Manager Team Dashboard</h1>
            </header>`;
}

// Generates the bottom portion of the HTML.
function generateHTMLBottom() {
    return `
            <!-- JS scripts: JQ, Popper.js, Bootstrap.js, custom -->
            <script src="./assets/js/jquery.js"></script>
            <script src="./assets/js/popper.js"></script>
            <script src="./assets/js/bootstrap.bundle.min.js"></script>
        </body>
    
    </html>`
}

// Acts as an '.append'
function addAsHTMLComponent(currentData, newData){
    return `${currentData}
    
    ${newData}`
}

// Add team member info to card, set in body of card
function generateCardEl(obj) {
    let cardEl = '';
    // Generates manager card, accounting for manager's unique properties
    if (obj.getRole() === 'Manager') {
        cardEl = `
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
        cardEl = `
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
        cardEl = `
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

// Opens completed HTML file from generatedHTMLs Folder
function openHTMLFile(string) {
    open(string);
}

// Creates file and writes to generatedHTMLs folder
async function writeToFile (fileName, filePath, data) {
    fs.writeFileSync(`${filePath}${fileName}`, data, (err) =>
    err ? console.error(err) : console.log('Success!'));
}

// Starts application
function init() {
    createTeam();
}
init();