const EVENTS_COUNT = 3;

const tripHeader = document.querySelector(`.trip-main`);
const tripHeaderMenu = tripHeader.querySelector(`.trip-controls`);
const tripHeaderCaptions = tripHeaderMenu.querySelectorAll(`.trip-controls h2`);
const tripEvents = document.querySelector(`.trip-events`);

import {createTripInfo} from "./view/createTripInfo.js";
import {createHeaderMenu} from "./view/createHeaderMenu.js";
import {createTimeFilter} from "./view/createTimeFilter.js";
import {createSorting} from "./view/createSorting.js";
import {createEventWithDestination} from "./view/createEventWithDestination.js";
import {createDaysList} from "./view/createDaysList.js";
import {createDayItem} from "./view/createDayItem.js";
import {createEventsList} from "./view/createEventsList.js";
import {createEventItem} from "./view/createEventItem.js";

const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

render(tripHeader, createTripInfo(), `afterbegin`);
render(tripHeaderCaptions[0], createHeaderMenu(), `afterend`);
render(tripHeaderCaptions[1], createTimeFilter(), `afterend`);
render(tripEvents, createSorting(), `beforeend`);
render(tripEvents, createEventWithDestination(), `beforeend`);
render(tripEvents, createDaysList(), `beforeend`);

const daysList = tripEvents.querySelector(`.trip-days`);

render(daysList, createDayItem(), `beforeend`);

const day = daysList.querySelector(`.day`);

render(day, createEventsList(), `beforeend`);

const eventsList = day.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(eventsList, createEventItem(), `beforeend`);
}
