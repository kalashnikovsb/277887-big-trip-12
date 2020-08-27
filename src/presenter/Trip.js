import TripInfo from "../view/TripInfo.js";
import Sorting from "../view/Sorting.js";
import DaysList from "../view/DaysList.js";
import DayItem from "../view/DayItem.js";
import EventsList from "../view/EventsList.js";
import EventItem from "../view/EventItem.js";
import EventEdit from "../view/EventEdit.js";
import NoEvents from "../view/NoEvents.js";
import {SORT_TYPE} from "../const.js";
import {getObjectDatesList, sortTimeUp, sortPriceUp} from "../utils/events.js";
import {renderPosition, render, replace} from "../utils/render.js";


export default class Trip {
  constructor(tripHeader, tripEvents) {
    this._currentSortType = SORT_TYPE.default;
    this._tripHeader = tripHeader;
    this._tripEvents = tripEvents;
    this._sorting = new Sorting();
    this._noEvents = new NoEvents();
    this._daysList = new DaysList();
    this._daysCounter = 1;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }


  init(events) {
    this._events = events.slice();
    this._sourceEvents = events.slice();
    this._tripInfo = new TripInfo(events);
    render(this._tripHeader, this._tripInfo, renderPosition.AFTERBEGIN);
    // Получаю объект, где каждый ключ это уникальная дата,
    // а каждое значение это массив с событиями этой даты
    this._objectDates = getObjectDatesList(this._events);
    // Получаю уникальные даты событий
    this._objectDateKeys = Object.keys(this._objectDates);
    if (this._events.length) {
      this._renderSorting();
    } else {
      render(this._tripEvents, this._noEvents, renderPosition.BEFOREEND);
    }
    render(this._tripEvents, this._daysList, renderPosition.BEFOREEND);
    this._renderDaysEventsNormally();
  }


  _renderDay(currentDate) {
    const dayItem = new DayItem(this._daysCounter, currentDate);
    render(this._daysList, dayItem, renderPosition.BEFOREEND);

    this._daysCounter++;

    const allDays = this._daysList.getElement().querySelectorAll(`.day`);
    const day = allDays[allDays.length - 1];

    // Создал контейнер списка событий
    const eventsList = new EventsList();
    // Отрисовал его
    render(day, eventsList, renderPosition.BEFOREEND);
    // Получаю массив событий для отрисовки
    const eventsForRendering = this._objectDates[currentDate];
    this._renderEvents(eventsList, eventsForRendering);
  }


  _renderEvents(eventsList, eventsForRendering) {
    // Отрисовываю события массива eventsForRendering
    // в контейнер eventsList
    for (const event of eventsForRendering) {
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
      // Обработчики открытия, закрытия, отправки формы и нажатия ESC
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

  _renderSorting() {
    render(this._tripEvents, this._sorting, renderPosition.BEFOREEND);
    this._sorting.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  _renderDaysEventsNormally() {
    this._daysCounter = 1;
    for (let currentDate of this._objectDateKeys) {
      this._renderDay(currentDate);
    }
    document.querySelector(`.trip-sort__item--day`).textContent = `Day`;
  }

  _renderEventsSorted() {
    const dayItem = new DayItem();
    render(this._daysList, dayItem, renderPosition.BEFOREEND);
    const eventsList = new EventsList();
    render(dayItem, eventsList, renderPosition.BEFOREEND);
    this._renderEvents(eventsList, this._events);
    document.querySelector(`.trip-sort__item--day`).textContent = ``;
  }

  _clearDaysList() {
    this._daysList.getElement().innerHTML = ``;
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEvents(sortType);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SORT_TYPE.timeUp:
        this._events.sort(sortTimeUp);
        break;
      case SORT_TYPE.priceUp:
        this._events.sort(sortPriceUp);
        break;
      default:
        this._events = this._sourceEvents;
    }
    this._currentSortType = sortType;
    this._clearDaysList();
    if (this._currentSortType === SORT_TYPE.default) {
      this._renderDaysEventsNormally();
    } else {
      this._renderEventsSorted();
    }
  }
}
