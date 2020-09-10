import Abstract from "./abstractView.js";


const createNoEventsTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};


export default class NoEvents extends Abstract {
  getTemplate() {
    return createNoEventsTemplate();
  }
}
