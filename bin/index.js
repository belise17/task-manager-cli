#!/usr/bin/env node

import { parseArgs } from "node:util";
import chalk from "chalk";

import {
  handleAdd,
  handleList,
  handleComplete,
  handleDelete,
  handleStats,
  handleImport
} from "../src/commands.js";

function showHelp() {
  console.log(`
${chalk.bold("Task Manager CLI")}

${chalk.bold("Usage:")}
  taskcli <command> [options]

${chalk.bold("Commands:")}
  add <title>       Add a new task
  list              Display all tasks
  complete <id>     Complete a task
  delete <id>       Delete a task
  stats             Display task statistics
  import            Import tasks from API

${chalk.bold("Options:")}
  -h, --help        Show help
  -v, --version     Show version
`);
}

// Read command-line arguments; show a friendly error for unknown options
let parsed;
try {
  parsed = parseArgs({
    options: {
      help: { type: "boolean", short: "h" },
      version: { type: "boolean", short: "v" }
    },
    allowPositionals: true
  });
} catch (error) {
  console.log(chalk.red("Error:"), error.message.split(".")[0] + ".");
  console.log(chalk.dim("Hint: run taskcli --help"));
  process.exit(1);
}

const { values, positionals } = parsed;
const command = positionals[0];
const argument = positionals.slice(1);

// Show application version
if (values.version) {
  console.log("Task Manager CLI v1.0.0");
  process.exit(0);
}

// Show help when asked, or when no command is given
if (values.help || !command) {
  showHelp();
  process.exit(0);
}

// Execute selected command
switch (command) {
  case "add":
    handleAdd(argument.join(" "));
    break;

  case "list":
    handleList();
    break;

  case "complete":
    handleComplete(argument[0]);
    break;

  case "delete":
    handleDelete(argument[0]);
    break;

  case "stats":
    handleStats();
    break;

  case "import":
    await handleImport();
    break;

  default:
    console.log(chalk.red("Error:"), `Unknown command "${command}".`);
    console.log(chalk.dim("Hint: run taskcli --help"));
    process.exit(1);
}