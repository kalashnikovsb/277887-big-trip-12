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

// Генерирую события и сортирую по времени
const events = new Array(EVENTS_COUNT).fill().map(generateEvent).sort(arraySortByTime);

render(tripHeader, createTripInfo(events), `afterbegin`);
render(tripHeaderCaptions[0], createHeaderMenu(), `afterend`);
render(tripHeaderCaptions[1], createTimeFilter(), `afterend`);
render(tripEvents, createSorting(), `beforeend`);
render(tripEvents, createEventWithDestination(events[0]), `beforeend`);
render(tripEvents, createDayList(), `beforeend`);

const dayList = tripEvents.querySelector(`.trip-days`);

render(dayList, createDayItem(), `beforeend`);

const day = dayList.querySelector(`.day`);

render(day, createEventList(), `beforeend`);

const eventList = day.querySelector(`.trip-events__list`);

for (const event of events) {
  render(eventList, createEventItem(event), `beforeend`);
}
