const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Fetch tasks from an external API
export async function fetchTasksFromAPI() {
  const response = await fetch(`${API_URL}?_limit=5`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks from API");
  }

  const tasks = await response.json();

  return tasks;
}