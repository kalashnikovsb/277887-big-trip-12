import Abstract from "./abstractView.js";
import {getCorrectPreposition, parseTimeToArray} from "../utils/events.js";
import moment from "moment";


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


const renderCorrectTime = (date) => {
  const [year, month, day, hours, minutes] = parseTimeToArray(date);
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};


const renderDuration = (timeStart, timeEnd) => {
  let start = moment(timeStart);
  let end = moment(timeEnd);

  start.set(`seconds`, `59`);
  start.set(`milliseconds`, `999`);
  end.set(`seconds`, `59`);
  end.set(`milliseconds`, `999`);

  let days = end.diff(start, `days`);
  days = (days < 10) ? `0` + days : days;
  days = Number(days) === 0 ? `` : days;

  end.subtract(days, `days`);
  let hours = end.diff(start, `hours`);
  hours = (hours < 10) ? `0` + hours : hours;
  hours = Number(hours) === 0 ? `` : hours;

  end.subtract(hours, `hours`);
  let minutes = end.diff(start, `minutes`);
  minutes = (minutes < 10) ? `0` + minutes : minutes;
  minutes = Number(minutes) === 0 ? `` : minutes;

  const resultString = `${!days ? `` : days + `D`} ${!hours ? `` : hours + `H`} ${!minutes ? `` : minutes + `M`}`;

  return resultString;
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
          <p class="event__duration">${renderDuration(timeStart, timeEnd)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
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
