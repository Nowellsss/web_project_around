let editButton = document.querySelector(".profile__edit-button");
let addButton = document.querySelector(".profile__add-button");
let closeEditButton = document.querySelector(".popup__container-close-button-edit");
let closeAddButton = document.querySelector(".popup__container-close-button-add");
let formElement = document.querySelector(".popup__container");


function openPopupEdit() {
  let popup = document.querySelector(".popup__edit--button");

  popup.classList.add("popup__opened");
}

function closePopupEdit() {
  let popup = document.querySelector(".popup__edit--button");

  popup.classList.remove("popup__opened");
}

function openPopupAdd() {
  let popup = document.querySelector(".popup__add--card");

  popup.classList.add("popup__opened");
}

function closePopupAdd() {
  let popup = document.querySelector(".popup__add--card");

  popup.classList.remove("popup__opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector("#name").value;
  let jobInput = document.querySelector("#job").value;

  console.log(nameInput, jobInput);

  let userName = document.querySelector(".profile__name");
  let userJob = document.querySelector(".profile__job");

  userName.textContent = nameInput;
  userJob.textContent = jobInput;

  closePopupEdit();
}

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);
closeEditButton.addEventListener("click", closePopupEdit);
closeAddButton.addEventListener("click", closePopupAdd);
formElement.addEventListener("submit", handleProfileFormSubmit);


const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];


function createCard(card) {
//Pegar o template
const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");

//Fazer uma cópia
const cardCopy = cardTemplate.cloneNode(true);

//Pegar os sub elementos da cópia
const cardImage = cardCopy.querySelector(".element__image");
const cardTitle = cardCopy.querySelector(".element__title");
const cardLike = cardCopy.querySelector(".element__like");
const cardDislike = cardCopy.querySelector(".element__dislike");
const cardTrash = cardCopy.querySelector(".element__delete-button");

cardTrash.addEventListener("click", deleteButton);

cardLike.addEventListener("click", likeButton);
cardDislike.addEventListener("click", dislikeButton);

cardImage.addEventListener("click", () => openPopupImage(card.link, card.name));

//Popular a cópia com os dados do cartão

cardImage.src = card.link;
cardImage.alt = card.name;
cardTitle.textContent = card.name;

//Pegar a lista de cartões 

const cardList = document.querySelector(".elements");

//Adicionar a cópia na lista de cartões

cardList.prepend(cardCopy);
}


for (let i = 0; i < initialCards.length; i++) {
createCard(initialCards[i]);
}

const addCardPopup = document.querySelector(".popup__add--card");

const addCardForm = addCardPopup.querySelector(".popup__add--cardform");
addCardForm.addEventListener("submit", function (evt) {
evt.preventDefault();
const imageInput = document.querySelector(".element__image");
const titleInput = document.querySelector(".element__title");


const card = {
image: imageInput.value,
title: titleInput.value,
};


createCard(card);
addCardForm.reset();
closePopupAdd();
});


// Botão de remover
function deleteButton(evt) {
evt.target.closest(".element").remove()
}


// Botão Like

function likeButton(evt) {  
  evt.target.classList.add("element__hidden")

  const dislikeButton = evt.target.parentElement.querySelector(".element__dislike")
  dislikeButton.classList.remove("element__hidden")
}

function dislikeButton(evt) {
  evt.target.classList.add("element__hidden")

  const likeButton = evt.target.parentElement.querySelector(".element__like")
  likeButton.classList.remove("element__hidden")
}

// Pop View Image

const viewButton = document.querySelector(".element__image");
const closeviewButton = document.querySelector(".popup__container-close-button-view");
const popupImage = document.querySelector(".popup__view-image-render");
const popupTitle = document.querySelector(".popup__view-image-title");


function openPopupImage(link, name) {
  let popup = document.querySelector(".popup__view--image");

  popupImage.src = link
  popupImage.alt = name
  popupTitle.textContent = name

  popup.classList.add("popup__opened");
}

function closePopupImage() {
  let popup = document.querySelector(".popup__view--image");

  popup.classList.remove("popup__opened");
}

closeviewButton.addEventListener("click", closePopupImage)



