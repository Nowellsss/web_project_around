import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import utils from "./utils.js";


const editButton = document.querySelector(".profile__edit-button");
const miPopup = document.querySelector("#popup-profile");
const closeButton = miPopup.querySelector(".popup__button-closed");
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__description");
const saveButton = document.querySelector(".popup__button-create");
const profileText = document.querySelector(".profile__text");
const profileProfession = document.querySelector(".profile__profession");
const cardZone = document.querySelector(".elements");
const buttonAddCard = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector("#popup-card");
const buttonCloseAddCard = cardPopup.querySelector(".popup__button-closed");
const formProfilePopup = document.querySelector("#popup-profile").querySelector(".popup__form");
const formCardPopup = document.querySelector("#popup-card").querySelector(".popup__form");
const inputCardTitle = document.querySelector(".popup__title");
const inputUrl = document.querySelector(".popup__description");
const popupImage = document.querySelector("#popup-image");
const buttonClosePopupImage = document.querySelector(".popup__image-button-closed");

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

  const cardToAdd = cardAdd(inputCardTitle.value, inputUrl.value);
  cardZone.prepend(cardToAdd);

  closePopUp(cardPopup);
});



editButton.addEventListener("click", () => {
  openPopup(miPopup);
});

closeButton.addEventListener("click", () => {
  closePopup(miPopup);
});

saveButton.addEventListener("click", saveChanges);

buttonAddCard.addEventListener("click", () => {
  openPopup(cardPopup);
});

buttonCloseAddCard.addEventListener("click", () => {
  closePopup(cardPopup);
});



function openPopup(popup) {
  popup.classList.add("popup__open");
  document.addEventListener("keydown", handleEscapeKey);
}

function closePopup(popup) {
  popup.classList.remove("popup__open");
  if (document.querySelectorAll(".popup__open").length === 0) {
   document.removeEventListener("keydown", handleEscapeKey);
  }
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup__open");
    openPopups.forEach((popup) => closePopup(popup));
  }
}

function saveChanges() {
  profileText.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

 closePopup(miPopup);
}

buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImage);
});

const popupOverlay = document.querySelectorAll(".popup__overlay");
const allPopup = document.querySelectorAll(".popup");

popupOverlay.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    overlay.parentNode.classList.remove("popup__open");
  });
});