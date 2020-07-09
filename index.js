const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Project title:"
    },
    {
      type: "input",
      name: "description",
      message: "Project description:"
    },
    {
      type: "input",
      name: "installation",
      message: "Installation instructions:"
    },
    {
      type: "input",
      name: "usage",
      message: "Usage information:"
    },
    {
      type: "input",
      name: "contributing",
      message: "Contribution guidelines:"
    },
    {
      type: "input",
      name: "tests",
      message: "Test instructions:"
    },
    {
      type: "input",
      name: "github",
      message: "GitHub username:"
    },
    {
      type: "input",
      name: "email",
      message: "Email address:"
    },
    {
      type: "list",
      message: "License:",
      name: "license",
      choices: [
        "license1",
        "license2",
        "license3"
      ]
    }
  ]);
}

function generateREADME(responses) {
  return `# ${responses.title}  

## Description  
${responses.description}  

## Table of Contents  
- [Installation](#installation)  
- [Usage](#usage)  
- [License](#license)  
- [Contributing](#contributing)  
- [Tests](#tests)  
- [Questions](#questions) 

## Installation  
${responses.installation}  

## Usage  
${responses.usage}  

## License  
${responses.license}  

## Contributing  
${responses.contributing}  

## Tests  
${responses.tests}  

## Questions  
GitHub: www.github.com/${responses.github}  
Email: ${responses.email}

`;
}

async function init() {
  console.log("Test")
  try {
    const responses = await promptUser();

    const readme = generateREADME(responses);

    await writeFileAsync("genReadme.md", readme);

    console.log("Successfully wrote to genReadme.md");
  } catch(err) {
    console.log(err);
  }
}

init();
