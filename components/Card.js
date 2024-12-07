export default class Card {
  constructor(
    cardData,
    templateCard,
    handleCardClick,
    handleCardLike,
    openConfirmation,
    userId
  ) {
    this._cardData = cardData;
    this._template = templateCard;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._openConfirmation = openConfirmation;
    this._userId = userId;
  }

  _getTemplate() {
    const cardsTemplate = document.querySelector(this._template);

    const cardElement = cardsTemplate.content
      .querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }
  _setEventListeners() {
    this._likeButton();
    this._remove();
  }

  _likeButton() {
    this._liked = this._cardData.isLiked;

    this._likeButtonElement = this._element.querySelector(".elements__image-like");
    if (this._liked) {
      this._likeButtonElement.setAttribute("src", "../images/like-dark.png");
    } else {
      this._likeButtonElement.setAttribute("src", "../images/like.png");
    }


    this._likeButtonElement.addEventListener("click", () => {
      if (
        this._likeButtonElement.getAttribute("src") ===
        "../images/like-dark.png"
      ) {
        this._handleCardLike(this._cardData._id, true);
        return this._likeButtonElement.setAttribute(
          "src",
          "../images/like.png"
        );
      }

      this._handleCardLike(this._cardData._id, false);

      this._liked = !this._liked;
      return this._likeButtonElement.setAttribute(
        "src",
        "../images/like-dark.png"
      );
    });
  }

  _remove() {
    const trashCard = this._element.querySelector(".elements__image-trash");
    const cardUserId = this._cardData.owner._id;

    if (this._userId !== cardUserId) {
      trashCard.style.display = "block";
    } else {
      return (trashCard.style.display = "none");
    }


    trashCard.addEventListener("click", () => {
      this._openConfirmation(this._element, this._cardData._id);
    });
  }


  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".elements__image");
    const cardTitle = this._element.querySelector(".elements__title");

    cardImage.setAttribute("src", this._cardData.link);
    cardImage.setAttribute("alt", this._cardData.name);
    cardTitle.textContent = this._cardData.name;
    cardImage.addEventListener("click", () => {
      this._handleCardClick({
        name: this._cardData.name,
        link: this._cardData.link,
      });
    });

    this._setEventListeners();
    return this._element;
  }
}
