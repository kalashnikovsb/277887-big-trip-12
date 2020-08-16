import {createElement} from "../utils.js";

const renderCorrectTime = (string) => {
  let currentDate = new Date(Date.parse(string));
  let result = currentDate.toString().slice(4, 10);
  return result;
};

const createDayItemTemplate = (dayNumber, date) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${date}">${renderCorrectTime(date)}</time>
      </div>
    </li>`
  );
};

export default class dayItem {
  constructor(dayNumber, date) {
    this._dayNumber = dayNumber;
    this._date = date;
    this._element = null;
  }
  getTemplate() {
    return createDayItemTemplate(this._dayNumber, this._date);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
