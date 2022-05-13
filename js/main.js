import { createModel } from './models/task-model.js';
import { createPresenter } from './presenters/task-pre.js';

const tasksElement = document.querySelector('.tasks');
const newTaskElement = document.querySelector('.task-controls__field');
const addTaskElement = document.querySelector('.task-controls__add');
const clearTasksElement = document.querySelector('.task-controls__clear');

const taskModel = createModel();
const taskPresenter = createPresenter(tasksElement, taskModel);

const addTaskButtonHandler = () => {
  const {value: newTaskTitle} = newTaskElement;
  newTaskElement.value = '';
  newTaskElement.focus();

  taskPresenter.addTask(newTaskTitle);
};

const clearTasksButtonHandler = () => {
  taskPresenter.clearTasks();
};

addTaskElement.addEventListener('click', addTaskButtonHandler);
clearTasksElement.addEventListener('click', clearTasksButtonHandler);

taskPresenter.render();
