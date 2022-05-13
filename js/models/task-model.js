import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';

export const createModel = () => {
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

  const add = (title) => tasks.push({
    id: nanoid(),
    title,
    isDone: false,
  });

  const clear = () => tasks = [];

  const complete = (id) => {
    const existTask = tasks.find((task) => task.id === id);
    existTask.isDone = !existTask.isDone;
  };

  const getItems = () => tasks;

  return {
    add,
    clear,
    complete,
    getItems
  };
};
