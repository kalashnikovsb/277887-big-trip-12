import Abstract from "./abstractView.js";


const createDaysListTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};


export default class DaysList extends Abstract {
  getTemplate() {
    return createDaysListTemplate();
  }
}
