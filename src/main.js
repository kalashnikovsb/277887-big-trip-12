import {EVENTS_COUNT} from "./const.js";
import {tripInfo} from "./view/tripInfo.js";
import {headerMenu} from "./view/headerMenu.js";
import {filter} from "./view/filter.js";
import {sorting} from "./view/sorting.js";
import {eventWithDestination} from "./view/eventWithDestination.js";
import {daysList} from "./view/daysList.js";
import {dayItem} from "./view/dayItem.js";
import {eventsList} from "./view/eventsList.js";
import {eventItem} from "./view/eventItem.js";
import {parseTimeToArray} from "./utils.js";
import {generateEvent} from "./mock/generateEvent.js";

const tripHeader = document.querySelector(`.trip-main`);
const tripHeaderMenu = tripHeader.querySelector(`.trip-controls`);
const tripHeaderCaptions = tripHeaderMenu.querySelectorAll(`.trip-controls h2`);
const tripEvents = document.querySelector(`.trip-events`);

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const arraySortByTime = (first, second) => {
  const firstTime = first.timeStart;
  const secondValue = second.timeStart;
  return firstTime - secondValue;
};

const getObjectDatesList = (arrayOfEvents) => {
  // Создаю объект, у которого ключи это уникальные даты событий
  let dates = {};
  arrayOfEvents.forEach((item) => {
    const [year, month, day] = parseTimeToArray(item.timeStart);
    const key = `${year}-${month}-${day}`;
    // Присваиваю каждому ключу пустой массив, в который буду класть события
    dates[key] = [];
  });
  // Прохожу все ключи
  for (let key in dates) {
    // Чтобы линтер не ругался
    if (typeof key === `string`) {
      // Фильтрую массив событий
      dates[key] = arrayOfEvents.filter((item) => {
        const [year, month, day] = parseTimeToArray(item.timeStart);
        return (key === `${year}-${month}-${day}`);
      });
    }
  }
  return dates;
};


// Генерирую события и сортирую по времени
const events = new Array(EVENTS_COUNT).fill().map(generateEvent).sort(arraySortByTime);
// Созаю объект дат, с массивами событий для каждой даты
const objectDates = getObjectDatesList(events);


render(tripHeader, createTripInfo(events), `afterbegin`);
render(tripHeaderCaptions[0], createHeaderMenu(), `afterend`);
render(tripHeaderCaptions[1], createTimeFilter(), `afterend`);
render(tripEvents, createSorting(), `beforeend`);
render(tripEvents, createEventWithDestination(events[0]), `beforeend`);
render(tripEvents, createDayList(), `beforeend`);

const dayList = tripEvents.querySelector(`.trip-days`);


// Счетчик дней в путешествии
let dayNumber = 1;
const objectDateKeys = Object.keys(objectDates);
for (let key of objectDateKeys) {
  // Передаю счетчик и дату для отображения блока
  render(dayList, createDayItem(dayNumber, key), `beforeend`);
  dayNumber++;

  // Коллекция всех дней
  const allDays = dayList.querySelectorAll(`.day`);
  // Последний день в коллекции, чтобы вставить именно в него события
  const day = allDays[allDays.length - 1];

  render(day, createEventList(), `beforeend`);
  const eventList = day.querySelector(`.trip-events__list`);

  for (const event of objectDates[key]) {
    render(eventList, createEventItem(event), `beforeend`);
  }
}
