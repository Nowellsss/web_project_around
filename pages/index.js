import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js"
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/userInfo.js";

const cardZone = document.querySelector(".elements");
const formProfilePopup = document.querySelector("#popup-profile").querySelector(".popup__form");
const formCardPopup = document.querySelector("#popup-card").querySelector(".popup__form");
const inputCardTitle = document.querySelector(".popup__location");
const inputUrl = document.querySelector(".popup__url");


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

const section = new Section(
  { items: initialCards, renderer: function(cardData)
    {const card = new Card(
    cardData,
    "#template"
  )
  const newCard = card.cardAdd();
  return newCard}},
  ".elements"
);
section.renderItems();

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error-visible",}


const formvalidatorcard = new FormValidator(config, formCardPopup)
  formvalidatorcard.enableValidation()

const formvalidatorprofile = new FormValidator(config,formProfilePopup)
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


formProfilePopup.addEventListener("submit", function (evt) {
    evt.preventDefault();

    closePopup(miPopup);
  });





  const imagePopup = new PopupWithImage("#popup-image");
imagePopup.setEventListeners();

// Popup Novo Local - para add imagens
const newImgPopup = new PopupWithForm(".new-img", (formData) => {
  const newCard = renderCard({ name: formData.title, link: formData.url });
  imgSection.addItem(newCard);
  newImgPopup.close();
});
newImgPopup.setEventListeners();

// Add evento ao btn para abrir o popup de add img
document.querySelector(".profile__add-button").addEventListener("click", () => {
  newImgPopup.open();
  newImgFormValidator.resetValidation();
});



