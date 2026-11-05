import { fetchTasksFromAPI } from "./api.js";
import { saveTasks } from "./storage.js";
import {
  addTask,
  getTasks,
  completeTask,
  deleteTask
} from "./tasks.js";

// Add a new task
export function handleAdd(title) {
  if (!title) {
    console.log("Please provide a task title.");
    return;
  }

  const task = addTask(title);
  console.log(`Task added successfully: ${task.title}`);
}

// Display all tasks
export function handleList() {
  const tasks = getTasks();

  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }

  console.log("\nYour Tasks:\n");

  tasks.forEach(task => {
    const status = task.completed ? "✓" : "○";
    console.log(`${task.id} ${status} ${task.title}`);
  });
}

// Complete a task
export function handleComplete(id) {
  const task = completeTask(id);

  if (!task) {
    console.log("Task not found.");
    return;
  }

  console.log(`Task completed: ${task.title}`);
}

// Delete a task
export function handleDelete(id) {
  const deleted = deleteTask(id);

  if (!deleted) {
    console.log("Task not found.");
    return;
  }

  console.log("Task deleted successfully.");
}

// Display task statistics
export function handleStats() {
  const tasks = getTasks();

  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.length - completed;

  console.log("\nTask Statistics");
  console.log("----------------");
  console.log(`Total tasks: ${tasks.length}`);
  console.log(`Completed: ${completed}`);
  console.log(`Pending: ${pending}`);
}
// Import tasks from external API
export async function handleImport() {
  try {
    console.log("Fetching tasks from API...");

    const apiTasks = await fetchTasksFromAPI();
    const existingTasks = getTasks();

    const importedTasks = apiTasks.map(task => ({
      id: Date.now() + task.id,
      title: task.title,
      completed: task.completed,
      createdAt: new Date().toISOString()
    }));

    saveTasks([...existingTasks, ...importedTasks]);

    console.log(`${importedTasks.length} tasks imported successfully!`);

  } catch (error) {
    console.log("Error importing tasks:", error.message);
  }
}