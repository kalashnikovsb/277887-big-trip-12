export const createTripInfo = (events) => {

  const renderTripInfoTitle = (array) => {
    const destinations = new Set();
    array.forEach((item) => {
      destinations.add(item.destination);
    });
    const cities = Array.from(destinations);

    const lastIndex = cities.length - 1;
    let resultString = ``;
    for (let i = 0; i < cities.length; i++) {
      if (i !== lastIndex) {
        resultString += `${cities[i]} &mdash; `;
      } else {
        resultString += `${cities[i]}`;
      }
    }
    return resultString;
  };

  const renderCorrectTime = (array) => {
    const firstDate = array[0].timeStart.toString().slice(4, 10);
    const lastDate = array[array.length - 1].timeStart.toString().slice(8, 10);
    return `${firstDate}&nbsp;&mdash;&nbsp;${lastDate}`;
  };

  const getFullPrice = (array) => {
    let result = 0;
    array.forEach((event) => {
      result += event.price;
      event.additionalOptions.forEach((option) => {
        result += option.price;
      });
    });
    return result;
  };

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
