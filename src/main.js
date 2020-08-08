import {createTripInfo} from "./view/createTripInfo.js";
import {createHeaderMenu} from "./view/createHeaderMenu.js";
import {createTimeFilter} from "./view/createTimeFilter.js";
import {createSorting} from "./view/createSorting.js";
import {createEventWithDestination} from "./view/createEventWithDestination.js";
import {createDaysList} from "./view/createDaysList.js";
import {createDayItem} from "./view/createDayItem.js";
import {createEventsList} from "./view/createEventsList.js";
import {createEventItem} from "./view/createEventItem.js";
import {EVENTS_COUNT} from "./const.js";
import {getRandomArrayElement} from "./utils.js";
import {generateEvent} from "./mock/generateEvent.js";

const tripHeader = document.querySelector(`.trip-main`);
const tripHeaderMenu = tripHeader.querySelector(`.trip-controls`);
const tripHeaderCaptions = tripHeaderMenu.querySelectorAll(`.trip-controls h2`);
const tripEvents = document.querySelector(`.trip-events`);

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

// Генерирую события
const events = new Array(EVENTS_COUNT).fill().map(generateEvent);
// Случайное событие для его редактирования
const randomEvent = getRandomArrayElement(events);

render(tripHeader, createTripInfo(), `afterbegin`);
render(tripHeaderCaptions[0], createHeaderMenu(), `afterend`);
render(tripHeaderCaptions[1], createTimeFilter(), `afterend`);
render(tripEvents, createSorting(), `beforeend`);
render(tripEvents, createEventWithDestination(randomEvent), `beforeend`);
render(tripEvents, createDaysList(), `beforeend`);

const daysList = tripEvents.querySelector(`.trip-days`);

render(daysList, createDayItem(), `beforeend`);

const day = daysList.querySelector(`.day`);

render(day, createEventsList(), `beforeend`);

const eventsList = day.querySelector(`.trip-events__list`);

for (const event of events) {
  render(eventsList, createEventItem(event), `beforeend`);
}
