import EventItem from "../view/eventItemView.js";
import EventEdit from "../view/eventEditView.js";
import {ESC_KEYCODE} from "../const.js";
import {renderPosition, render, replace, remove} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};


export default class Event {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._changeData = changeData;

    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;

    this._replaceRegularToEdit = this._replaceRegularToEdit.bind(this);
    this._replaceEditToRegular = this._replaceEditToRegular.bind(this);
    this._escKeyPressHandler = this._escKeyPressHandler.bind(this);
    this._formSubmit = this._formSubmit.bind(this);
    this._favoriteClick = this._favoriteClick.bind(this);
    this._deleteClick = this._deleteClick.bind(this);
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
    this._editingEvent.setDeleteClickHandler(this._deleteClick);

    if (!prevRegularEvent || !prevEditingEvent) {
      render(this._container, this._regularEvent, renderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._regularEvent, prevRegularEvent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._editingEvent, prevEditingEvent);
    }

    remove(prevRegularEvent);
    remove(prevEditingEvent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToRegular();
    }
  }


  destroy() {
    remove(this._regularEvent);
    remove(this._editingEvent);
  }


  _replaceRegularToEdit() {
    replace(this._editingEvent, this._regularEvent);
    document.addEventListener(`keydown`, this._escKeyPressHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }


  _replaceEditToRegular() {
    this._editingEvent.reset(this._event);
    replace(this._regularEvent, this._editingEvent);
    document.removeEventListener(`keydown`, this._escKeyPressHandler);
    this._mode = Mode.DEFAULT;
  }

  _formSubmit(event) {
    this._changeData(event);
    replace(this._regularEvent, this._editingEvent);
    document.removeEventListener(`keydown`, this._escKeyPressHandler);
    this._mode = Mode.DEFAULT;
  }


  _favoriteClick() {
    this._changeData(Object.assign({}, this._event, {favorite: !this._event.favorite}));
  }


  _deleteClick() {
    this.destroy();
  }


  _escKeyPressHandler(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      this._replaceEditToRegular();
    }
  }
}
