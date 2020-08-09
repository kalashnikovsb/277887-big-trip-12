import {getCorrectPreposition} from "../utils.js";

export const createEventItem = (event) => {
  const {eventType, destination, additionalOptions, timeStart, timeEnd, price} = event;

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
            ${timeStart.toISOString().slice(0, 10)}T${timeStart.toISOString().slice(11, 16)}">${timeStart.toISOString().slice(11, 16)}
            </time>
            &mdash;
            <time class="event__end-time" datetime="
            ${timeEnd.toISOString().slice(0, 10)}T${timeEnd.toISOString().slice(11, 16)}">${timeEnd.toISOString().slice(11, 16)}
            </time>
          </p>
          <p class="event__duration">90M</p>
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
