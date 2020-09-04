const EVENTS_COUNT = 5;
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
const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const CITIES = [`Moscow`, `Saint Petersburg`, `Krasnoyarsk`, `Yekaterinburg`, `Khabarovsk`, `Omsk`, `Irkutsk`, `Krasnodar`];
const ADDITIONAL_OPTIONS = [
  {name: `Add luggage`, price: 30, id: `luggage`},
  {name: `Switch to comfort`, price: 100, id: `comfort`},
  {name: `Add meal`, price: 15, id: `meal`},
  {name: `Choose seats`, price: 5, id: `seats`},
  {name: `Travel by train`, price: 40, id: `train`}
];
const MIN_NUMBER_PHOTOS = 0;
const MAX_NUMBER_PHOTOS = 10;
const MIN_PRICE = 10;
const MAX_PRICE = 100;
const ESC_KEYCODE = 27;
const SORT_TYPE = {
  default: `default`,
  timeUp: `date-up`,
  priceUp: `price-up`,
};
const BLANK_EVENT = {
  eventType: null,
  destination: null,
  destinationInfo: ``,
  destinationPhotos: null,
  additionalOptions: null,
  timeStart: null,
  timeEnd: null,
  price: null,
  isFavorite: false,
};


export {
  EVENTS_COUNT,
  DESCRIPTIONS,
  EVENT_TYPES,
  CITIES,
  ADDITIONAL_OPTIONS,
  MIN_NUMBER_PHOTOS,
  MAX_NUMBER_PHOTOS,
  MIN_PRICE,
  MAX_PRICE,
  ESC_KEYCODE,
  SORT_TYPE,
  BLANK_EVENT,
};
