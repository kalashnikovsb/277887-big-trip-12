import Abstract from "./abstractView.js";
import {getCorrectPreposition, parseTimeToArray} from "../utils/events.js";


const renderAdditionalOptions = (options) => {
  return options.map((option) => {
    return `
      <li class="event__offer">
        <span class="event__offer-title">${option.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${option.price}</span>
     </li>`;
  }).join(``);
};

const getFullPrice = (price, additionalOptions) => {
  let fullPrice = price;
  additionalOptions.forEach((option) => {
    fullPrice += option.price;
  });
  return fullPrice;
}


const renderCorrectTime = (date) => {
  const [year, month, day, hours, minutes] = parseTimeToArray(date);
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};


const createEventItemTemplate = (event) => {
  const {eventType, destination, additionalOptions, timeStart, timeEnd, price} = event;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${getCorrectPreposition(eventType)} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="
            ${renderCorrectTime(timeStart)}">${timeStart.toString().slice(16, 21)}
            </time>
            &mdash;
            <time class="event__end-time" datetime="
            ${renderCorrectTime(timeEnd)}">${timeEnd.toString().slice(16, 21)}
            </time>
          </p>
          <p class="event__duration">90M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${getFullPrice(price, additionalOptions)}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${renderAdditionalOptions(additionalOptions)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};


export default class EventItem extends Abstract {
  constructor(event) {
    super();
    this._event = event;
    this._openClickHandler = this._openClickHandler.bind(this);
  }


  getTemplate() {
    return createEventItemTemplate(this._event);
  }


  _openClickHandler() {
    this._callback.click();
  }


  setOpenClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._openClickHandler);
  }
}
