import Abstract from "./Abstract.js";
import {getCorrectPreposition, parseTimeToArray} from "../utils.js";
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

const renderPhotos = (photos) => {
  return photos.map((value) => {
    return `<img class="event__photo" src="${value}" alt="Event photo">`;
  }).join(``);
};

const renderCorrectTime = (date) => {
  const [year, month, day, hours, minutes] = parseTimeToArray(date);
  return `${String(year).slice(-2)}/${month}/${day} ${hours}:${minutes}`;
};

const createEventWithDestinationTemplate = (event) => {
  const {eventType, destination, destinationInfo, destinationPhotos, timeStart, timeEnd, additionalOptions, price} = event;

  const transferEvents = EVENT_TYPES.slice(0, 7);
  const activityEvents = EVENT_TYPES.slice(7);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
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
              ${renderEventsGroup(transferEvents)};
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${renderEventsGroup(activityEvents)};
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
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${renderAdditionalOptions(additionalOptions)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinationInfo}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${renderPhotos(destinationPhotos)}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export default class EventWithDestination extends Abstract {
  constructor(event) {
    super();
    this._event = event;
  }
  getTemplate() {
    return createEventWithDestinationTemplate(this._event);
  }
}
