import {getRandomInteger, getRandomArrayElement, getNiceFormat} from "../utils.js";
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
  const optionsCount = getRandomInteger(0, optionsArray.length - 1);
  const optionsList = {};
  for (let i = 0; i < optionsCount; i++) {
    const randomOption = getRandomArrayElement(optionsArray);
    optionsList[randomOption[0]] = randomOption[1];
  }
  return optionsList;
};

const generateDestinationPhotos = () => {
  const photosCount = getRandomInteger(MIN_NUMBER_PHOTOS, MAX_NUMBER_PHOTOS);
  const photosList = {};
  for (let i = 0; i < photosCount; i++) {
    photosList[`${i}`] = `http://picsum.photos/248/152?r=${Math.random()}`;
  }
  return photosList;
};

const generateTime = () => {
  // Полтора часа
  let milliseconds = 1000 * 60 * 90;
  let randomTime = new Date();

  randomTime.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));
  let startTime = `${getNiceFormat(randomTime.getHours())}:${getNiceFormat(randomTime.getMinutes())}`;
  randomTime = new Date(randomTime.getTime() + milliseconds);
  let endTime = `${getNiceFormat(randomTime.getHours())}:${getNiceFormat(randomTime.getMinutes())}`;

  let time = {};
  // Подстрока с датой без часов, минут
  time.date = randomTime.toISOString().slice(0, 10);
  time.start = startTime;
  time.end = endTime;
  return time;
};

export const generateEvent = () => {
  return {
    eventType: getRandomArrayElement(EVENT_TYPES),
    destination: getRandomArrayElement(CITIES),
    destinationInfo: getRandomArrayElement(DESCRIPTIONS),
    destinationPhotos: generateDestinationPhotos(),
    additionalOptions: generateAdditionalOptions(ADDITIONAL_OPTIONS),
    time: generateTime(),
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
  };
};
