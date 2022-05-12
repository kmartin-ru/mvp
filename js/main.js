import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';

const tasksElement = document.querySelector('.tasks');
const taskTemplateElement = document.querySelector('#task-template').content;
const addTaskButtonElement = document.querySelector('.task-controls__add');
const clearTasksButtonElement = document.querySelector('.task-controls__clear');
const taskFieldElement = document.querySelector('.task-controls__field');

let tasks = [
  {
    id: nanoid(),
    title: 'Chris Heria. Не делайте этого перед тренировкой',
    isDone: false,
  },
  {
    id: nanoid(),
    title: 'Анчартед: На картах не значится (2022)',
    isDone: true,
  },
];

const addNewTask = (title) => tasks.push({
  id: nanoid(),
  title,
  isDone: false,
});

const clearTasks = () => tasks = [];

const completeTask = (id) => {
  const existTask = tasks.find((task) => task.id === id);
  existTask.isDone = !existTask.isDone;
};

const render = () => {
  const newFragment = document.createDocumentFragment();
  tasksElement.innerHTML = '';

  tasks.forEach(({id, title, isDone}) => {
    const newTask = taskTemplateElement.cloneNode(true);

    if (isDone) { newTask.querySelector('li').classList.add('tasks__item--complete'); }

    const labelElement = newTask.querySelector('label');
    labelElement.textContent = title;
    labelElement.htmlFor = id;

    const inputElement = newTask.querySelector('input');
    inputElement.id = id;
    inputElement.checked = isDone;

    inputElement.addEventListener('change', ({target}) => {
      completeTask(target.id);
      render();
    });

    newFragment.appendChild(newTask);
  });

  tasksElement.appendChild(newFragment);
};

const addTaskButtonHandler = () => {
  const {value: newTaskTitle} = taskFieldElement;

  if (newTaskTitle.trim() === '') { return; }

  addNewTask(newTaskTitle);
  render();
  taskFieldElement.value = '';
  taskFieldElement.focus();
};

const clearTasksButtonHandler = () => {
  clearTasks();
  render();
};

addTaskButtonElement.addEventListener('click', addTaskButtonHandler);
clearTasksButtonElement.addEventListener('click', clearTasksButtonHandler);

render();
