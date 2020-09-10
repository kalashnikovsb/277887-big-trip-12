import Smart from "./smartView.js";
import {getCorrectPreposition, parseTimeToArray} from "../utils/events.js";
import {
  EVENT_TYPES,
  CITIES,
  ADDITIONAL_OPTIONS,
  BLANK_EVENT,
  DESCRIPTIONS,
} from "../const.js";


const renderEventsGroup = (events, currentType) => {
  return events.map((type) => {
    type = type.toLowerCase();
    return (
      `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType.toLowerCase() ? `checked` : ``}>
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
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${currentOption.id}-1" type="checkbox" name="event-offer-${currentOption.id}" data-option-name="${currentOption.name}" data-option-price="${currentOption.price}" ${keys.indexOf(currentOption.name) !== -1 ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${currentOption.id}-1">
          <span class="event__offer-title">${currentOption.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${currentOption.price}</span>
        </label>
      </div>`
    );
  }).join(``);
};


const renderDestinationInfo = (destinationInfo, destinationPhotos) => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationInfo}</p>
      ${renderPhotosList(destinationPhotos)}
    </section>`
  );
};


const renderPhotosList = (photos) => {
  if (photos.length === 0) {
    return (``);
  }

  let photosList = ``;
  photos.forEach((photo) => {
    photosList += renderPhoto(photo);
  });

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${photosList}
      </div>
    </div>`
  );
};


const renderPhoto = (photoUrl) => {
  return `<img class="event__photo" src="${photoUrl}" alt="Event photo">`;
};


const renderCorrectTime = (date) => {
  const [year, month, day, hours, minutes] = parseTimeToArray(date);
  return `${String(year).slice(-2)}/${month}/${day} ${hours}:${minutes}`;
};


const createEventEditTemplate = (data) => {
  const {eventType, destination, timeStart, timeEnd, additionalOptions, price, isFavorite, destinationInfo, destinationPhotos} = data;

  const transferEvents = EVENT_TYPES.slice(0, 7);
  const activityEvents = EVENT_TYPES.slice(7);

  const isFavoriteChecked = isFavorite ? `checked` : ``;

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
                ${renderEventsGroup(transferEvents, eventType)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${renderEventsGroup(activityEvents, eventType)}
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

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavoriteChecked}>
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
          ${destination ? renderDestinationInfo(destinationInfo, destinationPhotos) : ``}
        </section>
      </form>
    </li>`
  );
};


export default class EventEdit extends Smart {
  constructor(event = BLANK_EVENT) {
    super();

    this._data = EventEdit.parseEventToData(event);

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._optionClickHandler = this._optionClickHandler.bind(this);
    this._eventTypeClickHandler = this._eventTypeClickHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this._setInnerHandlers();
  }


  getTemplate() {
    return createEventEditTemplate(this._data);
  }


  _closeClickHandler() {
    this._callback.closeClick();
  }


  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeClickHandler);
  }


  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
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


  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick();
  }


  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteClickHandler);
  }


  reset(event) {
    this.updateData(EventEdit.parseEventToData(event));
  }


  static parseEventToData(event) {
    return Object.assign({}, event, {isFavorite: Boolean(event.favorite)});
  }


  static parseDataToEvent(data) {
    data = Object.assign({}, data);
    if (!data.isFavorite) {
      data.favorite = false;
    }
    delete data.isFavorite;
    return data;
  }


  _priceChangeHandler(evt) {
    let finalData = Number(evt.target.value);
    if (finalData < 0 || isNaN(finalData)) {
      finalData = 0;
    }
    finalData = Math.floor(finalData);
    this.updateData({price: finalData});
  }


  _destinationChangeHandler(evt) {
    let index = 0;
    let finalData = null;
    CITIES.forEach((city, i) => {
      if (city === evt.target.value) {
        index = i;
        finalData = city;
      }
    });
    if (!finalData) {
      finalData = ``;
    }
    this.updateData({destination: finalData, destinationInfo: DESCRIPTIONS[index]});
  }


  _eventTypeClickHandler(evt) {
    const currentType = evt.target.value;

    const eventTypeFromList = EVENT_TYPES.find((type) => {
      return (type.toLowerCase() === currentType);
    });

    this.updateData({eventType: eventTypeFromList});
  }


  _optionClickHandler(evt) {
    const finalData = this._data.additionalOptions.slice();

    const optionFromList = ADDITIONAL_OPTIONS.find((option) => {
      return (option.name === evt.target.dataset.optionName);
    });

    let isExist = false;
    let index = -1;
    this._data.additionalOptions.forEach((option, i) => {
      if (option.name === optionFromList.name) {
        isExist = true;
        index = i;
      }
    });

    if (isExist) {
      finalData.splice(index, 1);
    } else {
      finalData.push(optionFromList);
    }

    this.updateData({additionalOptions: finalData});
  }


  _setInnerHandlers() {
    Array.from(this.getElement().querySelectorAll(`.event__offer-checkbox`)).forEach((checkbox) => {
      checkbox.addEventListener(`click`, this._optionClickHandler);
    });
    Array.from(this.getElement().querySelectorAll(`.event__type-list .event__type-input`)).forEach((input) => {
      input.addEventListener(`click`, this._eventTypeClickHandler);
    });
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._destinationChangeHandler);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._priceChangeHandler);
  }


  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }
}
