import {getRandomInteger, getRandomArrayElement} from "../utils/common.js";
import {
  DESCRIPTIONS,
  EVENT_TYPES,
  CITIES,
  ADDITIONAL_OPTIONS,
  MIN_NUMBER_PHOTOS,
  MAX_NUMBER_PHOTOS,
  MIN_PRICE,
  MAX_PRICE,
} from "../const.js";

// Date.now() и Math.random() - плохие решения для генерации id
// в "продуктовом" коде, а для моков самое то.
// Для "продуктового" кода используйте что-то понадежнее,
// вроде nanoid - https://github.com/ai/nanoid
const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);


const generateAdditionalOptions = (optionsArray) => {
  // Беру случайную опцию
  const optionsCount = getRandomInteger(0, optionsArray.length - 1);
  // Создаю уникальный набор
  const optionsList = new Set();
  for (let i = 0; i < optionsCount; i++) {
    const randomOption = getRandomArrayElement(optionsArray);
    optionsList.add(randomOption);
  }
  // Возвращаю массив полученный из набора уникальных опций
  return Array.from(optionsList);
};


const generateDestinationPhotos = () => {
  const photosCount = getRandomInteger(MIN_NUMBER_PHOTOS, MAX_NUMBER_PHOTOS);
  const photosList = [];
  for (let i = 0; i < photosCount; i++) {
    photosList[i] = `http://picsum.photos/248/152?r=${Math.random()}`;
  }
  return photosList;
};


const generateTime = () => {
  const randomTime = new Date();
  randomTime.setFullYear(2020);
  randomTime.setMonth(7);
  randomTime.setDate(getRandomInteger(1, 10));
  randomTime.setHours(getRandomInteger(0, 23));
  randomTime.setMinutes(getRandomInteger(0, 59));
  return randomTime;
};


export const generateEvent = () => {
  const timeStart = generateTime();
  // Прибавляю рандомное количество времени от 1 часа до 10 часов
  const timeEnd = new Date(timeStart.getTime() + getRandomInteger(3600000, 36000000));

  return {
    id: generateId(),
    eventType: getRandomArrayElement(EVENT_TYPES),
    destination: getRandomArrayElement(CITIES),
    destinationInfo: getRandomArrayElement(DESCRIPTIONS),
    destinationPhotos: generateDestinationPhotos(),
    additionalOptions: generateAdditionalOptions(ADDITIONAL_OPTIONS),
    timeStart,
    timeEnd,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    favorite: Boolean(getRandomInteger(0, 1)),
  };
};
