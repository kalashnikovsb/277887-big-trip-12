export const createDayItem = (dayNumber, date) => {

  const renderCorrectTime = (string) => {
    let currentDate = new Date(Date.parse(string));
    let result = currentDate.toString().slice(4, 10);
    return result;
  };

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${date}">${renderCorrectTime(date)}</time>
      </div>
    </li>`
  );
};
