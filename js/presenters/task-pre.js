import {createView} from '../views/task-view.js';

export const createPresenter = (element, model) => {
  const render = () => {
    const newFragment = document.createDocumentFragment();
    element.innerHTML = '';

    model.getItems().forEach((task) => {
      const newTaskView = createView();
      const newElement = newTaskView.getElement(task);

      newTaskView.bindListeners(({target}) => {
        model.complete(target.id);
        newTaskView.removeElement();
        render();
      });

      newFragment.appendChild(newElement);
    });

    element.appendChild(newFragment);
  };

  const addTask = (title) => {
    if (title.trim() === '') {
      return;
    }

    model.add(title);
    render();
  };

  const clearTasks = () => {
    model.clear();
    render();
  };

  return {
    addTask,
    render,
    clearTasks,
  };
};
