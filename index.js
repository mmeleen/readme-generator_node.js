const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "location",
      message: "Where are you from?"
    },
    {
      type: "input",
      name: "hobby",
      message: "What is your favorite hobby?"
    },
    {
      type: "input",
      name: "food",
      message: "What is your favorite food?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    }
  ]);
}

function generateREADME(answers) {
  return `
# Testing README Write`;
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
