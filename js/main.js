import { createModel } from './models/task-model.js';

const tasksElement = document.querySelector('.tasks');
const taskTemplateElement = document.querySelector('#task-template').content;
const addTaskButtonElement = document.querySelector('.task-controls__add');
const clearTasksButtonElement = document.querySelector('.task-controls__clear');
const taskFieldElement = document.querySelector('.task-controls__field');

const taskModel = createModel();

const render = (tasks) => {
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
      taskModel.complete(target.id);
      render(taskModel.getItems());
    });

    newFragment.appendChild(newTask);
  });

  tasksElement.appendChild(newFragment);
};

const addTaskButtonHandler = () => {
  const {value: newTaskTitle} = taskFieldElement;

  if (newTaskTitle.trim() === '') { return; }

  taskModel.add(newTaskTitle);
  render(taskModel.getItems());
  taskFieldElement.value = '';
  taskFieldElement.focus();
};

const clearTasksButtonHandler = () => {
  taskModel.clear();
  render(taskModel.getItems());
};

addTaskButtonElement.addEventListener('click', addTaskButtonHandler);
clearTasksButtonElement.addEventListener('click', clearTasksButtonHandler);

render(taskModel.getItems());
