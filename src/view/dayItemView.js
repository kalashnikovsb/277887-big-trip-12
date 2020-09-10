import Abstract from "./abstractView.js";


const renderCorrectTime = (string) => {
  if (!string) {
    return ``;
  }
  let currentDate = new Date(Date.parse(string));
  let result = currentDate.toString().slice(4, 10);
  return result;
};


const createDayItemTemplate = (dayNumber = ``, date = ``) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${date}">${renderCorrectTime(date)}</time>
      </div>
    </li>`
  );
};


export default class DayItem extends Abstract {
  constructor(dayNumber, date) {
    super();
    this._dayNumber = dayNumber;
    this._date = date;
  }
  getTemplate() {
    return createDayItemTemplate(this._dayNumber, this._date);
  }
}
