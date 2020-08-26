import {EVENTS_COUNT} from "./const.js";
import TripInfo from "./view/TripInfo.js";
import HeaderMenu from "./view/HeaderMenu.js";
import Filter from "./view/Filter.js";
import Sorting from "./view/Sorting.js";
import DaysList from "./view/DaysList.js";
import DayItem from "./view/DayItem.js";
import EventsList from "./view/EventsList.js";
import EventItem from "./view/EventItem.js";
import EventEdit from "./view/EventEdit.js";
import NoEvents from "./view/NoEvents.js";
import {parseTimeToArray} from "./utils/events.js";
import {renderPosition, render, replace} from "./utils/render.js";
import {generateEvent} from "./mock/generateEvent.js";

// Функция сортировки событий по времени
const eventsSortByTime = (first, second) => {
  const firstTime = first.timeStart;
  const secondValue = second.timeStart;
  return firstTime - secondValue;
};

// Функция получания массива у которого каждый ключ это день в виде строки,
// а значение это массив событий этого дня
const getObjectDatesList = (arrayOfEvents) => {
  let dates = {};
  arrayOfEvents.forEach((item) => {
    const [year, month, day] = parseTimeToArray(item.timeStart);
    const key = `${year}-${month}-${day}`;
    dates[key] = [];
  });
  Object.keys(dates).map((key) => {
    dates[key] = arrayOfEvents.filter((item) => {
      const [year, month, day] = parseTimeToArray(item.timeStart);
      return (key === `${year}-${month}-${day}`);
    });
  });
  return dates;
};

const tripHeader = document.querySelector(`.trip-main`);
const tripHeaderMenu = tripHeader.querySelector(`.trip-controls`);
const tripHeaderCaptions = tripHeaderMenu.querySelectorAll(`.trip-controls h2`);
const tripEvents = document.querySelector(`.trip-events`);

// Получаю массив событий и сразу сортирую его по времени
const events = new Array(EVENTS_COUNT).fill().map(generateEvent).sort(eventsSortByTime);

render(tripHeader, new TripInfo(events), renderPosition.AFTERBEGIN);
render(tripHeaderCaptions[0], new HeaderMenu(), renderPosition.AFTEREND);
render(tripHeaderCaptions[1], new Filter(), renderPosition.AFTEREND);

// Получаю массив у которого каждый ключ это день в виде строки,
// а значение это массив событий этого дня
const objectDates = getObjectDatesList(events);

// Если события есть, то отображаю сортировку
if (events.length) {
  render(tripEvents, new Sorting(), renderPosition.BEFOREEND);
}

// Если событий нет, то отображаю приглашение добавить событие
if (!events.length) {
  render(tripEvents, new NoEvents(), renderPosition.BEFOREEND);
}

render(tripEvents, new DaysList(), renderPosition.BEFOREEND);
const daysList = tripEvents.querySelector(`.trip-days`);

// Счетчик дней путешествия, начинается всегда с 1
let dayNumber = 1;
const objectDateKeys = Object.keys(objectDates);

// Для каждого дня отображаю внутренние блоки внутри
for (let key of objectDateKeys) {
  render(daysList, new DayItem(dayNumber, key), renderPosition.BEFOREEND);

  dayNumber++;

  const allDays = daysList.querySelectorAll(`.day`);
  const day = allDays[allDays.length - 1];

  render(day, new EventsList(), renderPosition.BEFOREEND);
  const eventsList = day.querySelector(`.trip-events__list`);

  for (const event of objectDates[key]) {
    const regularEvent = new EventItem(event);
    const editingEvent = new EventEdit(event);

    render(eventsList, regularEvent, renderPosition.BEFOREEND);

    let isEdit = false;

    const replaceRegularToEdit = () => {
      replace(editingEvent, regularEvent);
      isEdit = true;
    };

    const replaceEditToRegular = () => {
      replace(regularEvent, editingEvent);
      isEdit = false;
    };

    regularEvent.setOpenClickHandler(replaceRegularToEdit);
    editingEvent.setCloseClickHandler(replaceEditToRegular);
    editingEvent.setFormSubmitHandler(replaceEditToRegular);

    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === 27 && isEdit) {
        replaceEditToRegular();
      }
    });
  }
}
