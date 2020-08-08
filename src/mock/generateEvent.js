import {getRandomInteger, getRandomArrayElement} from "../utils.js";
import {
  DESCRIPTIONS,
  EVENT_TYPES,
  CITIES,
  ADDITIONAL_OPTIONS,
  MIN_NUMBER_OPTIONS,
  MAX_NUMBER_OPTIONS,
  MIN_NUMBER_PHOTOS,
  MAX_NUMBER_PHOTOS,
  MIN_PRICE,
  MAX_PRICE,
} from "../const.js";

const generateAdditionalOptions = () => {
  const optionsCount = getRandomInteger(MIN_NUMBER_OPTIONS, MAX_NUMBER_OPTIONS);
  const optionsList = {};
  for (let i = 0; i < optionsCount; i++) {
    const randomOption = getRandomArrayElement(ADDITIONAL_OPTIONS);
    const randomPrice = getRandomInteger(MIN_PRICE, MAX_PRICE);
    optionsList[randomOption] = randomPrice;
  }
  return optionsList;
};

const generateDestinationPhotos = () => {
  const photosCount = getRandomInteger(MIN_NUMBER_PHOTOS, MAX_NUMBER_PHOTOS);
  const photosList = {};
  for (let i = 0; i < photosCount; i++) {
    photosList[i] = `http://picsum.photos/248/152?r=${Math.random()}`;
  }
  return photosList;
};

const generateTime = () => {
  // Функция для добавления нуля вначале если число меньше 10
  const getNiceFormat = (number) => {
    if (number < 10) {
      number = `0${number}`;
    }
    return number;
  };

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
    additionalOptions: generateAdditionalOptions(),
    time: generateTime(),
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
  };
};
