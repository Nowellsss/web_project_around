export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(
      ".popup__button-closed, .elements__button_type_close"
    );
    closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }
}