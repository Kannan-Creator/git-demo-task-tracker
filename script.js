// Grab references to the elements we need
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// Keeps track of how many tasks currently exist
let totalTasks = 0;

// Updates the "Total Tasks: X" header to match the current count
function updateTaskCount() {
  taskCount.textContent = `Total Tasks: ${totalTasks}`;
}

// Creates and appends a new task <li> to the list
function addTask() {
  const taskText = taskInput.value;

  // BUG 1 (Logic Error): There is no check here for an empty/blank
  // input value, so clicking "Add Task" with an empty field will
  // still add a blank list item. This should be fixed by validating
  // taskText (e.g. checking taskText.trim() !== '') before proceeding.

  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => deleteTask(li));

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  totalTasks++;
  updateTaskCount();

  // Clear the input field for the next task
  taskInput.value = '';
}

// Removes a task from the list
function deleteTask(li) {
  taskList.removeChild(li);
  totalTasks--;

  // BUG 2 (UI Bug): updateTaskCount() is never called here, so the
  // "Total Tasks: X" header does not refresh after a task is deleted.
  // The fix is to call updateTaskCount(); on the line above/below.
}

// Add task when the button is clicked
addTaskBtn.addEventListener('click', addTask);

// Add task when the Enter key is pressed inside the input field
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
