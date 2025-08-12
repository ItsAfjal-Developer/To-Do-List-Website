// 🌙 Dark Mode Toggle
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

// ➕ Add Task with Due Date
function addTask() {
  const input = document.getElementById("taskInput");
  const dateInput = document.getElementById("dueDateInput");
  const taskText = input.value.trim();
  const dueDate = dateInput.value;

  if (!taskText) return;

  const li = document.createElement("li");
  li.setAttribute("data-status", "active");

  const dueInfo = getDueInfo(dueDate);

  li.innerHTML = `
    <label class="checkbox">
      <input type="checkbox" onchange="toggleComplete(this)">
      <span class="checkmark"></span>
      <span class="task-text">${taskText}</span>
    </label>
    ${
      dueDate
        ? `<div class="due-info ${dueInfo.class}">${dueInfo.text}</div>`
        : ""
    }
    <button class="delete-btn" onclick="this.parentElement.remove()">✖</button>
  `;

  document.getElementById("taskList").appendChild(li);
  input.value = "";
  dateInput.value = "";
}

// ✅ Get Due Date Text and Style Class
function getDueInfo(dueDate) {
  if (!dueDate) return { text: "", class: "" };

  const today = new Date();
  const due = new Date(dueDate + "T00:00:00");
  const diffTime = due - today;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { text: "❗ Overdue", class: "overdue" };
  if (diffDays === 0) return { text: "📅 Due Today", class: "due-today" };
  if (diffDays === 1) return { text: "⏳ Due Tomorrow", class: "due-later" };

  return { text: `📅 Due in ${diffDays} days`, class: "due-later" };
}

// ✅ Toggle Task Completed
function toggleComplete(checkbox) {
  const task = checkbox.closest("li");
  const text = task.querySelector(".task-text");
  text.classList.toggle("done");
  task.setAttribute("data-status", checkbox.checked ? "completed" : "active");
}

// ✅ Filter Tasks
function filterTasks(type) {
  const tasks = document.querySelectorAll("#taskList li");
  tasks.forEach((task) => {
    const status = task.getAttribute("data-status");
    task.style.display = type === "all" || status === type ? "flex" : "none";
  });

  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelector(`.filter-btn[onclick*="${type}"]`)
    .classList.add("active");
}
