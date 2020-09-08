import Abstract from "./abstractView.js";


export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }


  updateData(update) {
    if (!update) {
      return;
    }
    this._data = Object.assign({}, this._data, update);
    this.updateElement();
  }


  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    prevElement = null;
    this.restoreHandlers();
  }


  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }
}
