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

const getCurrentDateTimeString = () => {
  const time = new Date();
  const date = getNiceFormat(time.getDate());
  const month = getNiceFormat(time.getMonth() + 1);
  const year = String(time.getFullYear()).slice(2);
  const hours = getNiceFormat(time.getHours());
  const minutes = getNiceFormat(time.getMinutes());
  return `${date}/${month}/${year} ${hours}:${minutes}`;
};

export {getRandomInteger, getRandomArrayElement, getCorrectPreposition, getNiceFormat, getCurrentDateTimeString};
