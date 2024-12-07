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

let userId;
let sectionNewCardElement;

api.getAppInfo().then(([userData, cardData]) => {
  //Pega informações do perfil
  userId = userData._id;
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setUserAvatar(userData.avatar);
  //Pega as cards da API

  sectionNewCardElement = new Section(
    {
      items: cardData,
      renderer: (items) => {
        const card = new Card(
          items,
          "#template",
          (card) => {
            popupWithImage.open(card);
          },

          (cardId, liked) => {
            if (liked) {
              api.deleteLike(cardId);
            } else {
              api.isLiked(cardId);
            }
          },
          (card, cardId) => {
            popupConfirmation.open(card, cardId);
          },
          userId
        );
        sectionNewCardElement.addItem(card.generateCard());
      },
    },
    ".elements"
  );
  sectionNewCardElement.renderItems();
});

const buttonSaveAvatar = document.querySelector(".popup__button-save-avatar");
const buttonEditProfile = document.querySelector(".popup__button-create")

const popupEditForm = new PopupWithForm(
  "#popup-profile",
  ({ name, about }) => {
    buttonEditProfile.textContent = "Salvando...";
    api
      .editUserInfo(name, about)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
      })
      .finally(() => {
        buttonEditProfile.textContent = "Salvar";
        popupEditForm.close()
      });
  },
);
popupEditForm.setEventListeners();


const popupEditAvatarForm = new PopupWithForm(
  "#popup-avatar",
  ({ avatar }) => {
    buttonSaveAvatar.textContent = "Salvando...";
    userInfo.setUserAvatar(avatar);
    api.profilePhotoUpdate(avatar).finally(() => {
      buttonSaveAvatar.textContent = "Salvar";
      popupEditAvatarForm.close()
    });
  },
);

const buttonEditAvatar = document.querySelector(".profile__edit-avatar-button");

buttonEditAvatar.addEventListener("click", function () {
  popupEditAvatarForm.open();
});

popupEditAvatarForm.setEventListeners();


const popupConfirmation = new PopupWithConfirmation(
  "#popup-confirmation",
  (card, cardId) => {
    api.deleteCard(cardId);
    card.remove();
  },
  ".popup__form-confirmation"
);

popupConfirmation.setEventListeners();

// Popup para Imagem
const popupWithImage = new PopupWithImage(
  "#popup-image",
  ".popup__image-photo",
  ".popup__image-name",

);

popupWithImage.setEventListeners();


const popupCard = new PopupWithForm(
  "#popup-card",
  ({ name, link }) => {
    api.addNewCard(name, link).then((apiCard) => {

      const newCardData = new Card(
        apiCard,
        "#template",
        (card) => popupWithImage.open(card),
        (cardId, liked) => {
          if (liked) {
            api.delete(cardId);
          } else {
            api.isLiked(cardId);
          }
        },
        (card, cardId) => {
          popupConfirmation.open(card, cardId);
        },
        userId
      ).generateCard();
      sectionNewCardElement.addItem(newCardData);
      popupCard.close();
    });
  },
);

popupCard.setEventListeners();





// Form Validator Class
const formProfilePopup = document.querySelector("#popup-profile").querySelector(".popup__form");
const formCardPopup = document.querySelector("#popup-card").querySelector(".popup__form");

const formvalidatorcard = new FormValidator(config, formCardPopup)
  formvalidatorcard.enableValidation()

const formvalidatorprofile = new FormValidator(config,formProfilePopup)
  formvalidatorprofile.enableValidation()

// Add evento ao button para abrir o popup
document.querySelector(".profile__add-button").addEventListener("click", () => {
  popupCard.open();
  formvalidatorcard.enableValidation();
});

document.querySelector(".profile__edit-button").addEventListener("click", () => {
  popupEditForm.open();
  formvalidatorprofile.enableValidation();
});