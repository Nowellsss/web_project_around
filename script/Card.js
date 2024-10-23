import {openPopup, popupImage} from "./utils.js";

export default class Card {
  constructor(cardData, template){
    this._cardData = cardData;
    this._template = document.querySelector(template);
  }

  cardAdd() {
    const card = this._template
      .cloneNode(true)
      .content.querySelector(".elements__card");
    const cardImage = card.querySelector(".elements__image");
    const buttonDeleteCard = card.querySelector(".elements__image-trash");
    const cardTitle = card.querySelector(".elements__title");
    const buttonLike = card.querySelector(".elements__image-like");

    buttonDeleteCard.addEventListener("click", function () {
      card.remove();
    });
    buttonLike.addEventListener("click", function () {
      buttonLike.classList.toggle("elements__image-like_active");
    });

    cardImage.addEventListener("click",() => {
      openPopup(popupImage);
      const popupPhoto = popupImage.querySelector(".popup__image-photo");
      const popupTitle = popupImage.querySelector(".popup__image-name");

      popupPhoto.src = this._cardData.link;
      popupTitle.textContent = this._cardData.name;
      cardImage.alt = this._cardData.name;
    });

    cardImage.src = this._cardData.link;
    cardTitle.textContent = this._cardData.name;
    cardImage.alt = this._cardData.name;
    return card;
  }
}
