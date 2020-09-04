import EventItem from "../view/eventItemView.js";
import EventEdit from "../view/eventEditView.js";
import {ESC_KEYCODE} from "../const.js";
import {renderPosition, render, replace, remove} from "../utils/render.js";


export default class Event {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._replaceRegularToEdit = this._replaceRegularToEdit.bind(this);
    this._replaceEditToRegular = this._replaceEditToRegular.bind(this);
    this._escKeyPressHandler = this._escKeyPressHandler.bind(this);
    this._favoriteClick = this._favoriteClick.bind(this);
    this._formSubmit = this._formSubmit.bind(this);
  }


  init(event) {
    this._event = event;

    const prevRegularEvent = this._regularEvent;
    const prevEditingEvent = this._editingEvent;

    this._regularEvent = new EventItem(event);
    this._editingEvent = new EventEdit(event);

    this._regularEvent.setOpenClickHandler(this._replaceRegularToEdit);
    this._editingEvent.setCloseClickHandler(this._replaceEditToRegular);
    this._editingEvent.setFormSubmitHandler(this._formSubmit);
    this._editingEvent.setFavoriteClickHandler(this._favoriteClick);

    if (!prevRegularEvent || !prevEditingEvent) {
      render(this._container, this._regularEvent, renderPosition.BEFOREEND);
      return;
    }

    if (this._container.getElement().contains(prevRegularEvent.getElement())) {
      replace(this._regularEvent, prevRegularEvent);
    }

    if (this._container.getElement().contains(prevEditingEvent.getElement())) {
      replace(this._editingEvent, prevEditingEvent);
    }

    remove(prevRegularEvent);
    remove(prevEditingEvent);
  }


  destroy() {
    remove(this._regularEvent);
    remove(this._editingEvent);
  }


  _replaceRegularToEdit() {
    replace(this._editingEvent, this._regularEvent);
    document.addEventListener(`keydown`, this._escKeyPressHandler);
  }


  _replaceEditToRegular() {
    replace(this._regularEvent, this._editingEvent);
    document.removeEventListener(`keydown`, this._escKeyPressHandler);
  }

  _formSubmit(event) {
    this._changeData(event);
    replace(this._regularEvent, this._editingEvent);
    document.removeEventListener(`keydown`, this._escKeyPressHandler);
  }


  _favoriteClick() {
    this._changeData(Object.assign({}, this._event, {favorite: !this._event.favorite}));
  }


  _escKeyPressHandler(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this._replaceEditToRegular();
    }
  }
}
