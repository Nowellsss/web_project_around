import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(
      ".popup__image-photo"
    );
    this._popupName = this._popupElement.querySelector(
      ".popup__image-name"
    );
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupName.textContent = name;

    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    const closeButton = this._popupElement.querySelector(
      ".popup__image-button-closed"
    );
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    } else {
      console.error("Botão de fechar não encontrado.");
    }
  }
}