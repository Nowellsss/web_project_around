import { openPopup, closePopup, cardPopup } from "./utils.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const cardZone = document.querySelector(".elements");
const formProfilePopup = document.querySelector("#popup-profile").querySelector(".popup__form");
const formCardPopup = document.querySelector("#popup-card").querySelector(".popup__form");
const inputCardTitle = document.querySelector(".popup__name");
const inputUrl = document.querySelector(".popup__description");


const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (cardData) {
  const card = new Card(
    cardData,
    "#template"
  )
  const newCard = card.cardAdd();
  cardZone.append(newCard);
});

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error-visible",}


const formvalidatorcard = new FormValidator(config, formCardPopup)
  formvalidatorcard.enableValidation()

const formvalidatorprofile = new FormValidator(config, formProfilePopup)
  formvalidatorprofile.enableValidation()


  formCardPopup.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const cardData = {name:inputCardTitle.value, link:inputUrl.value}

    const card = new Card(
      cardData,
      "#template"
    )
    const newCard = card.cardAdd();
    cardZone.prepend(newCard);

    closePopup(cardPopup);
  });


