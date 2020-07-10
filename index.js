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
        "ISC",
        "Apache 2.0",
        "GNU GPLv3",
        "MIT"
      ]
    }
  ]);
}

// function to generate README content from responses
function generateREADME(responses) {
  var badgeLink;
  if (responses.license === "ISC") {
    badgeLink = "![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)";
  } else if (responses.license === "Apache 2.0") {
    badgeLink = "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)";
  } else if (responses.license === "GNU GPLv3") {
    badgeLink = "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)";
  } else {
    badgeLink = "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
  }

  return `# ${responses.title}  

## Description  
${responses.description}  

${badgeLink}   

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
This application is covered under the ${responses.license} license.  

## Contributing  
${responses.contributing}  

## Tests  
${responses.tests}  

## Questions  
For additional information, please send me an email or visit my GitHub profile.
GitHub: www.github.com/${responses.github}  
Email: ${responses.email}

`;
}

// prompt user, pass responses to generate function, write to generated readme file
async function init() {
  try {
    const responses = await promptUser();

    const readme = generateREADME(responses);

    await writeFileAsync("genReadme.md", readme);

    console.log("genReadme.md created");
  } catch(err) {
    console.log(err);
  }
}

init();
