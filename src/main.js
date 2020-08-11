import {EVENTS_COUNT} from "./const.js";
import {createTripInfo} from "./view/createTripInfo.js";
import {createHeaderMenu} from "./view/createHeaderMenu.js";
import {createTimeFilter} from "./view/createTimeFilter.js";
import {createSorting} from "./view/createSorting.js";
import {createEventWithDestination} from "./view/createEventWithDestination.js";
import {createDayList} from "./view/createDayList.js";
import {createDayItem} from "./view/createDayItem.js";
import {createEventList} from "./view/createEventList.js";
import {createEventItem} from "./view/createEventItem.js";
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

const getDatesObject = (array) => {
  // Создаю объект, у которого ключи это уникальные даты событий
  let dates = {};
  array.forEach((item) => {
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
      dates[key] = array.filter((item) => {
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
const datesObject = getDatesObject(events);


render(tripHeader, createTripInfo(events), `afterbegin`);
render(tripHeaderCaptions[0], createHeaderMenu(), `afterend`);
render(tripHeaderCaptions[1], createTimeFilter(), `afterend`);
render(tripEvents, createSorting(), `beforeend`);
render(tripEvents, createEventWithDestination(events[0]), `beforeend`);
render(tripEvents, createDayList(), `beforeend`);

const dayList = tripEvents.querySelector(`.trip-days`);


// Счетчик дней в путешествии
let dayNumber = 1;
for (let date in datesObject) {
  // Чтобы линтер не ругался
  if (typeof date === `string`) {
    // Передаю счетчик и дату для отображения блока
    render(dayList, createDayItem(dayNumber, date), `beforeend`);
    dayNumber++;

    // Коллекция всех дней
    const allDays = dayList.querySelectorAll(`.day`);
    // Последний день в коллекции, чтобы вставить именно в него события
    const day = allDays[allDays.length - 1];

    render(day, createEventList(), `beforeend`);
    const eventList = day.querySelector(`.trip-events__list`);

    for (const event of datesObject[date]) {
      render(eventList, createEventItem(event), `beforeend`);
    }
  }
}
