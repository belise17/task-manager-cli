#!/usr/bin/env node

import { parseArgs } from "node:util";

import {
  handleAdd,
  handleList,
  handleComplete,
  handleDelete,
  handleStats,
  handleImport
} from "../src/commands.js";

// Read command-line arguments
const { values, positionals } = parseArgs({
  options: {
    help: {
      type: "boolean",
      short: "h"
    },
    version: {
      type: "boolean",
      short: "v"
    }
  },
  allowPositionals: true
});

// Show help information
if (values.help) {
  console.log(`
Task Manager CLI

Usage:
  taskcli <command> [options]

Commands:
  add <title>       Add a new task
  list              Display all tasks
  complete <id>     Complete a task
  delete <id>       Delete a task
  stats             Display task statistics
  import            Import tasks from API

Options:
  -h, --help        Show help
  -v, --version     Show version
  `);

  process.exit(0);
}

// Show application version
if (values.version) {
  console.log("Task Manager CLI v1.0.0");
  process.exit(0);
}

// Get command and arguments
const command = positionals[0];
const argument = positionals.slice(1);

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
    console.log("Unknown command. Use --help to see available commands.");
}