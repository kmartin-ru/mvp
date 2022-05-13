const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}

export const createView = () => {
  let element = null;
  let callback = {};

  const getTemplate = ({id, title, isDone}) => {
    return `
      <li class="tasks__item ${isDone ? 'tasks__item--complete' : ''}">
        <label for="${id}">
          ${title}
          <input id="${id}" type="checkbox" ${isDone ? 'checked' : ''}>
        </label>
      </li>
    `;
  };

  const removeElement = () => {
    const taskElement = getElement();

    taskElement.querySelector('input')
    .removeEventListener('click', callback.completeButtonClick);

    element = null;
    callback = {};
  }

  const getElement = (task) => {
    if (!element) {
      element = createElement(getTemplate(task));
    }

    return element;
  }

  const bindListeners = (completeButtonHandler) => {
    const taskElement = getElement();
    taskElement.querySelector('input')
    .addEventListener('click', completeButtonHandler);

    callback.completeButtonClick = completeButtonHandler;
  };

  return {
    removeElement,
    bindListeners,
    getElement,
  };
};
