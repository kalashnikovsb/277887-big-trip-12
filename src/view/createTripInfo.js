const renderTripInfoTitle = (events) => {
  const destinations = new Set();
  events.forEach((item) => {
    destinations.add(item.destination);
  });
  const cities = Array.from(destinations);

  const lastIndex = cities.length - 1;
  let resultString = ``;
  cities.map((city) => {
    if (city === cities[lastIndex]) {
      resultString += `${city}`;
    } else {
      resultString += `${city} &mdash; `;
    }
  });
  return resultString;
};

const renderCorrectTime = (events) => {
  const firstDate = events[0].timeStart.toString().slice(4, 10);
  const lastDate = events[events.length - 1].timeStart.toString().slice(8, 10);
  return `${firstDate}&nbsp;&mdash;&nbsp;${lastDate}`;
};

const getFullPrice = (events) => {
  let result = 0;
  events.forEach((event) => {
    result += event.price;
    event.additionalOptions.forEach((option) => {
      result += option.price;
    });
  });
  return result;
};

export const createTripInfo = (events) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">
        ${renderTripInfoTitle(events)}
        </h1>

        <p class="trip-info__dates">${renderCorrectTime(events)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getFullPrice(events)}</span>
      </p>
    </section>`
  );
};
