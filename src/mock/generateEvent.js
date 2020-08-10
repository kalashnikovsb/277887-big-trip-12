import {getRandomInteger, getRandomArrayElement} from "../utils.js";
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
  const timeEnd = new Date(timeStart.getTime() + (90 * 60 * 1000));

  return {
    eventType: getRandomArrayElement(EVENT_TYPES),
    destination: getRandomArrayElement(CITIES),
    destinationInfo: getRandomArrayElement(DESCRIPTIONS),
    destinationPhotos: generateDestinationPhotos(),
    additionalOptions: generateAdditionalOptions(ADDITIONAL_OPTIONS),
    timeStart,
    timeEnd,
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
  };
};
