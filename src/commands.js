import chalk from "chalk";
import ora from "ora";
import Table from "cli-table3";
import { fetchTasksFromAPI } from "./api.js";
import { saveTasks } from "./storage.js";
import {
  addTask,
  getTasks,
  completeTask,
  deleteTask,
  getNextId
} from "./tasks.js";

// Print a red error with a dim hint, then stop with exit code 1
function fail(message, hint) {
  console.log(chalk.red("Error:"), message);
  if (hint) {
    console.log(chalk.dim("Hint: " + hint));
  }
  process.exit(1);
}

// Add a new task
export function handleAdd(title) {
  if (!title) {
    fail("Please provide a task title.", 'taskcli add "Learn Node.js"');
  }

  const task = addTask(title);
  console.log(chalk.green("Task added:"), task.title, chalk.dim(`(id ${task.id})`));
}

// Display all tasks in a table
export function handleList() {
  const tasks = getTasks();

  if (tasks.length === 0) {
    console.log(chalk.dim('No tasks yet. Try: taskcli add "Learn Node.js"'));
    return;
  }

  const table = new Table({
    head: [chalk.bold("ID"), chalk.bold("Status"), chalk.bold("Title")]
  });

  tasks.forEach(task => {
    const status = task.completed ? chalk.green("✓ done") : chalk.yellow("○ pending");
    table.push([task.id, status, task.title]);
  });

  console.log(table.toString());
}

// Complete a task
export function handleComplete(id) {
  if (!id) {
    fail("Please provide a task id.", "taskcli complete 1");
  }

  const task = completeTask(id);

  if (!task) {
    fail(`Task ${id} not found.`, "run taskcli list to see the ids");
  }

  console.log(chalk.green("Task completed:"), task.title);
}

// Delete a task
export function handleDelete(id) {
  if (!id) {
    fail("Please provide a task id.", "taskcli delete 1");
  }

  const deleted = deleteTask(id);

  if (!deleted) {
    fail(`Task ${id} not found.`, "run taskcli list to see the ids");
  }

  console.log(chalk.green("Task deleted."));
}

// Display task statistics
export function handleStats() {
  const tasks = getTasks();

  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.length - completed;

  console.log(chalk.bold("\nTask Statistics"));
  console.log("----------------");
  console.log(`Total tasks: ${tasks.length}`);
  console.log(`Completed:   ${chalk.green(completed)}`);
  console.log(`Pending:     ${chalk.yellow(pending)}`);
}

// Import tasks from external API, skipping titles we already have
export async function handleImport() {
  const spinner = ora("Fetching tasks from API...").start();

  try {
    const apiTasks = await fetchTasksFromAPI();
    const existingTasks = getTasks();
    const existingTitles = existingTasks.map(task => task.title);

    let nextId = getNextId(existingTasks);
    const newTasks = apiTasks
      .filter(task => !existingTitles.includes(task.title))
      .map(task => ({
        id: nextId++,
        title: task.title,
        completed: task.completed,
        createdAt: new Date().toISOString()
      }));

    saveTasks([...existingTasks, ...newTasks]);

    const skipped = apiTasks.length - newTasks.length;
        spinner.succeed(chalk.green(`${newTasks.length} tasks imported.`) +
      (skipped ? chalk.dim(` (${skipped} already existed)`) : ""));
  } catch (error) {
    spinner.fail(chalk.red("Import failed: " + error.message));
    console.log(chalk.dim("Hint: check your internet connection and try again"));
    process.exit(1);
  }
}