import Abstract from "./Abstract.js";

const createEventsListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventsList extends Abstract {
  getTemplate() {
    return createEventsListTemplate();
  }
}
