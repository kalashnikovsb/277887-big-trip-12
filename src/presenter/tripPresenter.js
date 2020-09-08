import TripInfo from "../view/tripInfoView.js";
import Sorting from "../view/sortingView.js";
import DaysList from "../view/daysListView.js";
import DayItem from "../view/dayItemView.js";
import EventsList from "../view/eventsListView.js";
import NoEvents from "../view/noEventsView.js";
import EventPresenter from "./eventPresenter.js";
import {SORT_TYPE} from "../const.js";
import {updateItem} from "../utils/common.js";
import {getObjectDatesList, sortTimeUp, sortPriceUp} from "../utils/events.js";
import {renderPosition, render, remove} from "../utils/render.js";


export default class Trip {
  constructor(tripHeader, tripEvents) {
    this._currentSortType = SORT_TYPE.default;
    this._tripHeader = tripHeader;
    this._tripEvents = tripEvents;
    this._sorting = new Sorting();
    this._noEvents = new NoEvents();
    this._daysList = new DaysList();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._eventChangeHandler = this._eventChangeHandler.bind(this);

    // 6.1.17
    this._modeChangeHandler = this._modeChangeHandler.bind(this);

    this._daysArray = [];
    this._eventPresenters = {};
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
      render(this._tripEvents, this._daysList, renderPosition.BEFOREEND);
      this._renderDaysEventsNormally();
    } else {
      render(this._tripEvents, this._noEvents, renderPosition.BEFOREEND);
    }
  }


  _renderDay(currentDate, daysCounter) {
    const dayItem = new DayItem(daysCounter, currentDate);

    // Кладу в массив дней для удаления при сортировке
    this._daysArray.push(dayItem);
    render(this._daysList, dayItem, renderPosition.BEFOREEND);

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
      this._renderEvent(eventsList, event);
    }
  }


  _renderEvent(container, event) {
    // 6.1.17
    const eventPresenter = new EventPresenter(container, this._eventChangeHandler, this._modeChangeHandler);
    // const eventPresenter = new EventPresenter(container, this._eventChangeHandler);
    eventPresenter.init(event);
    this._eventPresenters[event.id] = eventPresenter;
  }


  _renderSorting() {
    render(this._tripEvents, this._sorting, renderPosition.BEFOREEND);
    this._sorting.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }


  _renderDaysEventsNormally() {
    // Счетчик дней путешествия
    let daysCounter = 1;
    for (let currentDate of this._objectDateKeys) {
      this._renderDay(currentDate, daysCounter);
      daysCounter++;
    }
    // Показать слово день в сортировке
    this._sorting.hideShowDayText(true);
  }


  _renderEventsSorted() {
    const dayItem = new DayItem();
    // Проверка
    this._daysArray.push(dayItem);
    render(this._daysList, dayItem, renderPosition.BEFOREEND);
    const eventsList = new EventsList();
    render(dayItem, eventsList, renderPosition.BEFOREEND);
    this._renderEvents(eventsList, this._events);
    // Скрыть слово день в сортировке
    this._sorting.hideShowDayText(false);
  }


  _clearDaysList() {
    // Удаляю дни
    this._daysArray.forEach((day) => {
      remove(day);
    });
    this._daysArray = [];
    // Удаляю события
    Object.values(this._eventPresenters).forEach((presenter) => {
      presenter.destroy();
    });
    this._eventPresenters = {};
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


  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortEvents(sortType);
  }


  // 6.1.17
  _modeChangeHandler() {
    Object.values(this._eventPresenters).forEach((presenter) => {
      presenter.resetView();
    });
  }


  _eventChangeHandler(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._sourceEvents = updateItem(this._sourceEvents, updatedEvent);
    this._eventPresenters[updatedEvent.id].init(updatedEvent);
  }
}
