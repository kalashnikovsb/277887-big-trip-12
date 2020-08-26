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

const tripHeader = document.querySelector(`.trip-main`);
const tripHeaderMenu = tripHeader.querySelector(`.trip-controls`);
const tripHeaderCaptions = tripHeaderMenu.querySelectorAll(`.trip-controls h2`);
const tripEvents = document.querySelector(`.trip-events`);

export default class Trip () {
  init(events) {

  }

  _renderTripInfo() {

  }

  _renderHeaderMenu() {

  }

  _renderFilter() {

  }

  _renderSorting() {

  }

  _renderNoEvents() {

  }

  _renderDaysList() {

  }

  _renderDayItem() {

  }

  _renderEventsList() {

  }

  _renderEvent() {

  }


}
