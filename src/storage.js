import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "../data/tasks.json");

// Read tasks from JSON file
export function readTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Save tasks to JSON file
export function saveTasks(tasks) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(tasks, null, 2),
    "utf-8"
  );
}