const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check`, `Sightseeing`, `Restaurant`];
const CITIES = [`Moscow`, `Saint Petersburg`, `Krasnoyarsk`, `Yekaterinburg`, `Khabarovsk`, `Omsk`, `Irkutsk`, `Krasnodar`];
const ADDITIONAL_OPTIONS = [`Order Uber`, `Add luggage`, `Rent a car`, `Switch to comfort`, `Add breakfast`, `Book tickets`, `Lunch in city`];
const MIN_NUMBER_OPTIONS = 0;
const MAX_NUMBER_OPTIONS = 5;
const MIN_NUMBER_PHOTOS = 0;
const MAX_NUMBER_PHOTOS = 10;
const MIN_PRICE = 10;
const MAX_PRICE = 100;

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

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
  const getNiceFormat = (number) => {
    if (number < 10) {
      number = `0${number}`;
    }
    return number;
  };

  let milliseconds = 1000 * 60 * 90; // Полтора часа
  let randomTime = new Date();

  randomTime.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));
  let startTime = `${getNiceFormat(randomTime.getHours())}:${getNiceFormat(randomTime.getMinutes())}`;
  randomTime = new Date(randomTime.getTime() + milliseconds);
  let endTime = `${getNiceFormat(randomTime.getHours())}:${getNiceFormat(randomTime.getMinutes())}`;

  let time = {};
  time.start = startTime;
  time.end = endTime;
  return time;
};

export const generateEventItem = () => {
  return {
    routePointType: getRandomArrayElement(EVENT_TYPES),
    destination: getRandomArrayElement(CITIES),
    destinationInfo: getRandomArrayElement(DESCRIPTIONS),
    destinationPhotos: generateDestinationPhotos(),
    additionalOptions: generateAdditionalOptions(),
    time: generateTime(),
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
  };
};
