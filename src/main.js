import Trip from "./presenter/tripPresenter.js";
import HeaderMenu from "./view/headerMenuView.js";
import Filter from "./view/filterView.js";
import {EVENTS_COUNT} from "./const.js";
import {render, renderPosition} from "./utils/render.js";
import {eventsSortByTime} from "./utils/events.js";
import {generateEvent} from "./mock/generateEvent.js";

const tripHeader = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);
const tripHeaderCaptions = tripHeader.querySelectorAll(`.trip-controls h2`);

const headerMenu = new HeaderMenu();
const filter = new Filter();
render(tripHeaderCaptions[0], headerMenu, renderPosition.AFTEREND);
render(tripHeaderCaptions[1], filter, renderPosition.AFTEREND);

// Сгенерировал события и отсортировал по времени
const events = new Array(EVENTS_COUNT).fill().map(generateEvent).sort(eventsSortByTime);

const trip = new Trip(tripHeader, tripEvents);
trip.init(events);
