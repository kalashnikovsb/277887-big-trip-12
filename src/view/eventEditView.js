import Abstract from "./abstractView.js";
import {getCorrectPreposition, parseTimeToArray} from "../utils/events.js";
import {
  EVENT_TYPES,
  CITIES,
  ADDITIONAL_OPTIONS,
} from "../const.js";


const renderEventsGroup = (array) => {
  return array.map((type) => {
    type = type.toLowerCase();
    return (
      `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
      </div>`
    );
  }).join(``);
};


const renderDestinationList = (array) => {
  return array.map((arrayItem) => {
    return (
      `<option value="${arrayItem}"></option>`
    );
  }).join(``);
};


const renderAdditionalOptions = (options) => {
  // Получаю массив названий опций текущего события
  let keys = options.map((option) => {
    return option.name;
  });
  // По полученному массиву я подсвечиваю (из всех возможных) те опции, которые имеются
  return ADDITIONAL_OPTIONS.map((currentOption) => {
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${currentOption.id}-1" type="checkbox" name="event-offer-${currentOption.id}" ${keys.indexOf(currentOption.name) !== -1 ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${currentOption.id}-1">
          <span class="event__offer-title">${currentOption.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${currentOption.price}</span>
        </label>
      </div>`
    );
  }).join(``);
};


const renderCorrectTime = (date) => {
  const [year, month, day, hours, minutes] = parseTimeToArray(date);
  return `${String(year).slice(-2)}/${month}/${day} ${hours}:${minutes}`;
};


const creaveEventEditTemplate = (event) => {
  const {eventType, destination, timeStart, timeEnd, additionalOptions, price} = event;
  const transferEvents = EVENT_TYPES.slice(0, 7);
  const activityEvents = EVENT_TYPES.slice(7);

  return (
    `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${renderEventsGroup(transferEvents)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${renderEventsGroup(activityEvents)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${getCorrectPreposition(eventType)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${renderDestinationList(CITIES)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${renderCorrectTime(timeStart)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${renderCorrectTime(timeEnd)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${renderAdditionalOptions(additionalOptions)}
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};


export default class EventEdit extends Abstract {
  constructor(event) {
    super();
    this._event = event;
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }


  getTemplate() {
    return creaveEventEditTemplate(this._event);
  }


  _closeClickHandler() {
    this._callback.click();
  }


  setCloseClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeClickHandler);
  }


  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._event);
  }


  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._formSubmitHandler);
  }


  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }


  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
