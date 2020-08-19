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
import {parseTimeToArray, renderPosition, renderElement} from "./utils.js";
import {generateEvent} from "./mock/generateEvent.js";

const tripHeader = document.querySelector(`.trip-main`);
const tripHeaderMenu = tripHeader.querySelector(`.trip-controls`);
const tripHeaderCaptions = tripHeaderMenu.querySelectorAll(`.trip-controls h2`) ;
const tripEvents = document.querySelector(`.trip-events`);

const eventsSortByTime = (first, second) => {
  const firstTime = first.timeStart;
  const secondValue = second.timeStart;
  return firstTime - secondValue;
};

const getObjectDatesList = (arrayOfEvents) => {
  let dates = {};
  arrayOfEvents.forEach((item) => {
    const [year, month, day] = parseTimeToArray(item.timeStart);
    const key = `${year}-${month}-${day}`;
    dates[key] = [];
  });
  for (let key in dates) {
    if (typeof key === `string`) {
      dates[key] = arrayOfEvents.filter((item) => {
        const [year, month, day] = parseTimeToArray(item.timeStart);
        return (key === `${year}-${month}-${day}`);
      });
    }
  }
  return dates;
};

const events = new Array(EVENTS_COUNT).fill().map(generateEvent).sort(eventsSortByTime);
const objectDates = getObjectDatesList(events);

renderElement(tripHeader, new TripInfo(events).getElement(), renderPosition.AFTERBEGIN);
renderElement(tripHeaderCaptions[0], new HeaderMenu().getElement(), renderPosition.AFTEREND);
renderElement(tripHeaderCaptions[1], new Filter().getElement(), renderPosition.AFTEREND);
renderElement(tripEvents, new Sorting().getElement(), renderPosition.BEFOREEND);
renderElement(tripEvents, new DaysList().getElement(), renderPosition.BEFOREEND);

const daysList = tripEvents.querySelector(`.trip-days`);

let dayNumber = 1;
const objectDateKeys = Object.keys(objectDates);
for (let key of objectDateKeys) {
  renderElement(daysList, new DayItem(dayNumber, key).getElement(), renderPosition.BEFOREEND);
  dayNumber++;

  const allDays = daysList.querySelectorAll(`.day`);
  const day = allDays[allDays.length - 1];

  renderElement(day, new EventsList().getElement(), renderPosition.BEFOREEND);
  const eventsList = day.querySelector(`.trip-events__list`);

  for (const event of objectDates[key]) {
    const usualEvent = new EventItem(event).getElement();
    const openButton = usualEvent.querySelector(`.event__rollup-btn`);
    const editingEvent = new EventEdit(event).getElement();
    const closeButton = editingEvent.querySelector(`.event__rollup-btn`);
    const editForm = editingEvent.querySelector(`.event--edit`);

    renderElement(eventsList, usualEvent, renderPosition.BEFOREEND);
    let isEdit = false;

    openButton.addEventListener(`click`, () => {
      eventsList.replaceChild(editingEvent, usualEvent);
      isEdit = true;
    });

    closeButton.addEventListener(`click`, () => {
      eventsList.replaceChild(usualEvent, editingEvent);
      isEdit = false;
    });

    editForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      eventsList.replaceChild(usualEvent, editingEvent);
      isEdit = false;
    });

    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === 27 && isEdit) {
        eventsList.replaceChild(usualEvent, editingEvent);
        isEdit = false;
      }
    });
  }
}
