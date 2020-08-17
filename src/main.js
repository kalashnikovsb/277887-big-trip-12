import {EVENTS_COUNT} from "./const.js";
import TripInfo from "./view/TripInfo.js";
import HeaderMenu from "./view/HeaderMenu.js";
import Filter from "./view/Filter.js";
import Sorting from "./view/Sorting.js";
import EventWithDestination from "./view/EventWithDestination.js";
import DaysList from "./view/DaysList.js";
import DayItem from "./view/DayItem.js";
import EventsList from "./view/EventsList.js";
import EventItem from "./view/EventItem.js";
import EventEdit from "./view/EventEdit.js";
import {parseTimeToArray, renderPosition, renderElement} from "./utils.js";
import {generateEvent} from "./mock/generateEvent.js";

const tripHeader = document.querySelector(`.trip-main`);
const tripHeaderMenu = tripHeader.querySelector(`.trip-controls`);
const tripHeaderCaptions = tripHeaderMenu.querySelectorAll(`.trip-controls h2`);
const tripEvents = document.querySelector(`.trip-events`);

const eventsSortByTime = (first, second) => {
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
const events = new Array(EVENTS_COUNT).fill().map(generateEvent).sort(eventsSortByTime);
// Созаю объект дат, с массивами событий для каждой даты
const objectDates = getObjectDatesList(events);


renderElement(tripHeader, new TripInfo(events).getElement(), renderPosition.AFTERBEGIN);
renderElement(tripHeaderCaptions[0], new HeaderMenu().getElement(), renderPosition.AFTEREND);
renderElement(tripHeaderCaptions[1], new Filter().getElement(), renderPosition.AFTEREND);
renderElement(tripEvents, new Sorting().getElement(), renderPosition.BEFOREEND);
// renderElement(tripEvents, new EventWithDestination(events[0]).getElement(), renderPosition.BEFOREEND);
renderElement(tripEvents, new DaysList().getElement(), renderPosition.BEFOREEND);

const daysList = tripEvents.querySelector(`.trip-days`);


// Счетчик дней в путешествии
let dayNumber = 1;
const objectDateKeys = Object.keys(objectDates);
for (let key of objectDateKeys) {
  // Передаю счетчик и дату для отображения блока
  renderElement(daysList, new DayItem(dayNumber, key).getElement(), renderPosition.BEFOREEND);
  dayNumber++;

  // Коллекция всех дней
  const allDays = daysList.querySelectorAll(`.day`);
  // Последний день в коллекции, чтобы вставить именно в него события
  const day = allDays[allDays.length - 1];

  renderElement(day, new EventsList().getElement(), renderPosition.BEFOREEND);
  const eventsList = day.querySelector(`.trip-events__list`);

  for (const event of objectDates[key]) {
    const currentEvent = new EventItem(event).getElement();
    const openButton = currentEvent.querySelector(`.event__rollup-btn`);

    const currentEventEdit = new EventEdit(event).getElement();
    const closeButton = currentEventEdit.querySelector(`.event__rollup-btn`);

    renderElement(eventsList, currentEvent, renderPosition.BEFOREEND);

    let isEdit = false;
    openButton.addEventListener(`click`, () => {
      const oldElement = eventsList.replaceChild(currentEventEdit, currentEvent);
      oldElement.remove();
      oldElement.removeElement();
      isEdit = true;
    });

    // renderElement(eventsList, new EventEdit(event).getElement(), renderPosition.BEFOREEND);
  }
}
