export default class Card {
  constructor(cardData, template, handleCardClick){
    this._cardData = cardData;
    this._template = document.querySelector(template);
    this._handleCardClick = handleCardClick;
    this._openPopup = this._openPopup.bind(this);
  }

  cardAdd() {
    const card = this._template
      .content.querySelector(".elements__card").cloneNode(true);
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

    cardImage.addEventListener("click", this._openPopup);

    cardImage.src = this._cardData.link;
    cardTitle.textContent = this._cardData.name;
    cardImage.alt = this._cardData.name;
    return card;
  }

  _openPopup() {
    this._handleCardClick(this._cardData.link, this._cardData.name)
  }
}
