const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const timelineContent = document.getElementById('timelineContent');
const themeToggle = document.querySelector('.theme-toggle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <h3>${task.title} (${task.priority})</h3>
            <p>${task.description}</p>
            <p>Due: ${new Date(task.due).toLocaleString()}</p>
            <p>Duration: ${task.duration} hrs</p>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskDiv);
    });
    renderTimeline();
}

function renderTimeline() {
    timelineContent.innerHTML = '';
    tasks.forEach(task => {
        const barWrapper = document.createElement('div');
        barWrapper.className = 'timeline-bar';

        const label = document.createElement('div');
        label.className = 'timeline-label';
        label.title = task.title; // show full title on hover
        label.textContent = task.title;

        const progress = document.createElement('div');
        progress.className = 'timeline-progress';
        progress.style.width = (task.duration * 50) + 'px';
        progress.textContent = task.duration + 'h';

        barWrapper.appendChild(label);
        barWrapper.appendChild(progress);
        timelineContent.appendChild(barWrapper);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const due = document.getElementById('due').value;
    const duration = document.getElementById('duration').value;
    const reminder = document.getElementById('reminder').value;
    const priority = document.getElementById('priority').value;

    const newTask = { title, description, due, duration, reminder, priority };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskForm.reset();
});

function setTheme(theme) {
    if(theme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    if(document.body.classList.contains('dark')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

renderTasks();