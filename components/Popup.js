export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup__open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup__open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(
      ".popup__button-closed"
    );
    closeButton.addEventListener("click", () => {
     this.close();
    });

   this._popupElement.addEventListener("click", (event) => {
     if (event.target.classList.contains("popup__open")) {
      this.close();
      }
    });
  }
}