import { readTasks, saveTasks } from "./storage.js";

// Add a new task
export function addTask(title) {
  const tasks = readTasks();

  const newTask = {
    id: Date.now(),
    title: title,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  saveTasks(tasks);

  return newTask;
}

// Get all tasks
export function getTasks() {
  return readTasks();
}

// Complete a task
export function completeTask(id) {
  const tasks = readTasks();

  const task = tasks.find(task => task.id === Number(id));

  if (!task) {
    return null;
  }

  task.completed = true;
  saveTasks(tasks);

  return task;
}

// Delete a task
export function deleteTask(id) {
  const tasks = readTasks();

  const updatedTasks = tasks.filter(
    task => task.id !== Number(id)
  );

  if (updatedTasks.length === tasks.length) {
    return false;
  }

  saveTasks(updatedTasks);

  return true;
}