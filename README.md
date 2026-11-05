# Task Manager CLI

A command-line task manager built with Node.js. Add, list, complete and delete tasks from your terminal, and import sample tasks from an API. Tasks are saved in a JSON file, so they are still there the next time you run the tool.

## Requirements

- Node.js 18.3 or newer (check with `node -v`)

## Installation

```bash
git clone https://github.com/belise17/task-manager-cli.git
cd task-manager-cli
npm install
npm link
```

`npm link` makes the `taskcli` command available in any folder on your computer.

To remove it later:

```bash
npm unlink -g task-manager-cli
```

## Commands

| Command | What it does |
|---|---|
| `taskcli add "Learn Node.js"` | Add a new task |
| `taskcli list` | Show all tasks in a table |
| `taskcli complete 1` | Mark task 1 as done |
| `taskcli delete 1` | Delete task 1 |
| `taskcli stats` | Show total, completed and pending tasks |
| `taskcli import` | Import 5 sample tasks from the JSONPlaceholder API (skips tasks you already have) |
| `taskcli --help` or `taskcli -h` | Show help |
| `taskcli --version` or `taskcli -v` | Show the version |

## Example

```bash
taskcli add "Revise semver"
taskcli list
taskcli complete 1
taskcli stats
```

## Exit codes

| Code | Meaning |
|---|---|
| `0` | The command worked |
| `1` | Something went wrong (missing title, task not found, unknown command or option, API failure) |

## Built with

- `node:util` `parseArgs` for reading commands and options
- `node:fs` for saving tasks to `data/tasks.json`
- `fetch` for calling the JSONPlaceholder API
- [chalk](https://www.npmjs.com/package/chalk) for coloured output
- [ora](https://www.npmjs.com/package/ora) for the loading spinner
- [cli-table3](https://www.npmjs.com/package/cli-table3) for the task table

## Authors

Belise and Olga