const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
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

// Функция сортировки событий по времени
const eventsSortByTime = (first, second) => {
  const firstTime = first.timeStart;
  const secondValue = second.timeStart;
  return firstTime - secondValue;
};

// Функция получения массива у которого каждый ключ это день в виде строки,
// а значение это массив событий этого дня
const getObjectDatesList = (arrayOfEvents) => {
  let dates = {};
  arrayOfEvents.forEach((item) => {
    const [year, month, day] = parseTimeToArray(item.timeStart);
    const key = `${year}-${month}-${day}`;
    dates[key] = [];
  });
  Object.keys(dates).map((key) => {
    dates[key] = arrayOfEvents.filter((item) => {
      const [year, month, day] = parseTimeToArray(item.timeStart);
      return (key === `${year}-${month}-${day}`);
    });
  });
  return dates;
};

export {getCorrectPreposition, getNiceFormat, parseTimeToArray, createElement, eventsSortByTime, getObjectDatesList};
