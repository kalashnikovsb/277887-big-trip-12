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

export {getRandomInteger, getRandomArrayElement, getCorrectPreposition};
