export const popupImage = document.querySelector("#popup-image");
export const cardPopup = document.querySelector("#popup-card");
const miPopup = document.querySelector("#popup-profile");
const buttonClosePopupImage = document.querySelector(".popup__image-button-closed");
const buttonCloseAddCard = cardPopup.querySelector(".popup__button-closed");
const buttonAddCard = document.querySelector(".profile__add-button");
const closeButton = miPopup.querySelector(".popup__button-closed");
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__description");
const saveButton = document.querySelector(".popup__button-create");
const profileText = document.querySelector(".profile__text");
const profileProfession = document.querySelector(".profile__profession");
const editButton = document.querySelector(".profile__edit-button");


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

export function openPopup(popup) {
  popup.classList.add("popup__open");
  document.addEventListener("keydown", handleEscapeKey);
}

export function closePopup(popup) {
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