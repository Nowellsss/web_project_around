import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/userInfo.js";
import api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

/* const initialCards = [
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
]; */

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",}

// Informações do usuário
const userInfo = new UserInfo({
  name: ".profile__text",
  about: ".profile__profession",
  avatar: ".profile__image",
});

//Popup Novo Local - para add imagens
const newImgPopup = new PopupWithForm("#popup-card", (formData) => {
  const newContent = renderer({ name: formData.name, link: formData.link });
  newImgPopup.close(newContent);
});
newImgPopup.setEventListeners();

// Popup para Imagem
const imagePopup = new PopupWithImage("#popup-image");
imagePopup.setEventListeners();


// Popup para edição de perfil - nome e bio
const editProfilePopup = new PopupWithForm("#popup-profile", (formData) => {
  userInfo.setUserInfo(formData.name, formData.about);
  const currentUserInfo = userInfo.getUserInfo();
  editProfilePopup.setInputValues(currentUserInfo);
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

// Função de renderização de cartões
const renderer = (cardData) => {
  const card = new Card(
  cardData,
  "#template", (link, name)=> imagePopup.open(link, name)
)
  const newCard = card.cardAdd();
  section.addItem(newCard)
}

// Sections Class
const section = new Section(
  { items: initialCards, renderer:(formData) => renderer(formData)},
  ".elements"
);
section.renderItems();

// Form Validator Class
const formProfilePopup = document.querySelector("#popup-profile").querySelector(".popup__form");
const formCardPopup = document.querySelector("#popup-card").querySelector(".popup__form");

const formvalidatorcard = new FormValidator(config, formCardPopup)
  formvalidatorcard.enableValidation()

const formvalidatorprofile = new FormValidator(config,formProfilePopup)
  formvalidatorprofile.enableValidation()

// Add evento ao button para abrir o popup
document.querySelector(".profile__add-button").addEventListener("click", () => {
  newImgPopup.open();
  formvalidatorcard.enableValidation();
});

document.querySelector(".profile__edit-button").addEventListener("click", () => {
  editProfilePopup.open();
  formvalidatorprofile.enableValidation();
});


