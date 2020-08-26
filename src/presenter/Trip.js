import TripInfo from "../view/TripInfo.js";
import HeaderMenu from "../view/HeaderMenu.js";
import Filter from "../view/Filter.js";
import Sorting from "../view/Sorting.js";
import DaysList from "../view/DaysList.js";
import DayItem from "../view/DayItem.js";
import EventsList from "../view/EventsList.js";
import EventItem from "../view/EventItem.js";
import EventEdit from "../view/EventEdit.js";
import NoEvents from "../view/NoEvents.js";
import {getObjectDatesList} from "../utils/events.js";
import {renderPosition, render, replace} from "../utils/render.js";

export default class Trip {
  constructor(events, tripHeader, tripEvents) {
    this._events = events;
    this._tripHeader = tripHeader;
    this._tripEvents = tripEvents;
    this._tripHeaderMenu = tripHeader.querySelector(`.trip-controls`);
    this._tripHeaderCaptions = tripHeader.querySelectorAll(`.trip-controls h2`);
    this._tripInfo = new TripInfo(events);
    this._headerMenu = new HeaderMenu();
    this._filter = new Filter();
    this._sorting = new Sorting();
    this._noEvents = new NoEvents();
    this._daysList = new DaysList();
    this._daysCounter = 1;
  }

  init() {
    render(this._tripHeader, this._tripInfo, renderPosition.AFTERBEGIN);
    render(this._tripHeaderCaptions[0], this._headerMenu, renderPosition.AFTEREND);
    render(this._tripHeaderCaptions[1], this._filter, renderPosition.AFTEREND);

    // Получаю объект, где каждый ключ это уникальная дата,
    // а каждое значение это массив с событиями этой даты
    this._objectDates = getObjectDatesList(this._events);
    // Получаю уникальные даты событий
    const objectDateKeys = Object.keys(this._objectDates);

    if (this._events.length) {
      render(this._tripEvents, this._sorting, renderPosition.BEFOREEND);
    } else {
      render(this._tripEvents, this._noEvents, renderPosition.BEFOREEND);
    }

    render(this._tripEvents, this._daysList, renderPosition.BEFOREEND);
    for (let currentDate of objectDateKeys) {
      this._renderDay(currentDate);
    }
  }

  _renderDay(currentDate) {
    const dayItem = new DayItem(this._daysCounter, currentDate);
    render(this._daysList, dayItem, renderPosition.BEFOREEND);

    this._daysCounter++;

    const allDays = this._daysList.getElement().querySelectorAll(`.day`);
    const day = allDays[allDays.length - 1];

    const eventsList = new EventsList();
    render(day, eventsList, renderPosition.BEFOREEND);

    for (const event of this._objectDates[currentDate]) {
      this._renderEvent(event, eventsList);
    }
  }

  _renderEvent(event, eventsList) {
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
