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

export {getRandomInteger, getRandomArrayElement, getCorrectPreposition, getNiceFormat, parseTimeToArray};
