import Abstract from "./view/Abstract.js";

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const getCorrectPreposition = (value) => {
  switch (value) {
    case `Check-in`:
    case `Sightseeing`:
    case `Restaurant`:
      return `${value} in`;
    default:
      return `${value} to`;
  }
};

const getNiceFormat = (number) => {
  if (number < 10) {
    number = `0${number}`;
  }
  return number;
};

const parseTimeToArray = (date) => {
  const year = date.getFullYear();

  // 9 вместо 10, потому что номер месяца 0-11, а не 1-12
  let month = date.getMonth();
  month = (month < 9) ? `0${month + 1}` : `${month + 1}`;

  let day = date.getDate();
  day = (day < 10) ? `0${day}` : `${day}`;

  let hours = date.getHours();
  hours = (hours < 10) ? `0${hours}` : `${hours}`;

  let minutes = date.getMinutes();
  minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;

  return [year, month, day, hours, minutes];
};

// Возможные позиции для вставки DOM-элемента
const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`,
};

// Отображение DOM-элемента
const render = (container, element, position) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (position) {
    case renderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }
  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }
  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }
  parent.replaceChild(newChild, oldChild);
};

// Создание DOM-элемента на основе шаблона
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {getRandomInteger, getRandomArrayElement, getCorrectPreposition, getNiceFormat, parseTimeToArray, renderPosition, render, createElement, replace};
