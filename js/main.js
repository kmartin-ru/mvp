import { createModel } from './models/task-model.js';
import { createView } from './views/task-view.js';

const tasksElement = document.querySelector('.tasks');
const taskTemplateElement = document.querySelector('#task-template').content;
const addTaskButtonElement = document.querySelector('.task-controls__add');
const clearTasksButtonElement = document.querySelector('.task-controls__clear');
const newTaskElement = document.querySelector('.task-controls__field');

const taskModel = createModel();

const addTaskButtonHandler = () => {
  const {value: newTaskTitle} = newTaskElement;

  if (newTaskTitle.trim() === '') { return; }

  taskModel.add(newTaskTitle);
  render(taskModel.getItems());
  newTaskElement.value = '';
  newTaskElement.focus();
};

const clearTasksButtonHandler = () => {
  taskModel.clear();
  render(taskModel.getItems());
};

const render = (tasks) => {
  const newFragment = document.createDocumentFragment();
  tasksElement.innerHTML = '';

  tasks.forEach((task) => {
    const newTaskView = createView();
    const newElement = newTaskView.getElement(task);

    newTaskView.bindListeners(({target}) => {
      taskModel.complete(target.id);
      newTaskView.removeElement();
      render(taskModel.getItems());
    });

    newFragment.appendChild(newElement);
  });

  tasksElement.appendChild(newFragment);
};

addTaskButtonElement.addEventListener('click', addTaskButtonHandler);
clearTasksButtonElement.addEventListener('click', clearTasksButtonHandler);

render(taskModel.getItems());
