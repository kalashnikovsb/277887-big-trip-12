export const createEventItem = (event) => {
  const {eventType, destination, additionalOptions, time, price} = event;

  const getCorrectPreposition = (word) => {
    switch (word) {
      case `Check-in`:
      case `Sightseeing`:
      case `Restaurant`:
        return `${word} in`;
      default:
        return `${word} to`;
    }
  };

  const renderAdditionalOptions = (options) => {
    return Object.entries(options).map(([key, value]) => {
      return `
        <li class="event__offer">
          <span class="event__offer-title">${key}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${value}</span>
       </li>`;
    }).join(``);
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${getCorrectPreposition(eventType)} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${time.date}T${time.start}">${time.start}</time>
            &mdash;
            <time class="event__end-time" datetime="${time.date}T${time.end}">${time.end}</time>
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
