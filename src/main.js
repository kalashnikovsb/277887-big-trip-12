import {EVENTS_COUNT} from "./const.js";
import {eventsSortByTime} from "./utils/events.js";
import {generateEvent} from "./mock/generateEvent.js";
import Trip from "./presenter/Trip.js";

const tripHeader = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

// Сгенерировал события и отсортировал по времени
const events = new Array(EVENTS_COUNT).fill().map(generateEvent).sort(eventsSortByTime);

const trip = new Trip(events, tripHeader, tripEvents);
trip.init();
