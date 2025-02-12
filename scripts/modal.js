const popupPlayers = document.querySelector(".popup");
const topScorerItems = document.querySelectorAll(".top-scorer-item");
const popupButtonElements = document.querySelectorAll(".popup__button-close");
console.log(popupButtonElements);
// Открытие модального окна


function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
  modalElement.scrollTop = 0; // Сброс позиции скролла на верх
  modalElement.addEventListener("mousedown", handleCloseOverlay);
  document.addEventListener("keydown", handleCloseEsc);
}


function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");

  setTimeout(() => {
    const popupContent = modalElement.querySelector(".popup__content");
    if (popupContent) {
      console.log("До сброса scrollTop:", popupContent.scrollTop);
      popupContent.scrollTop = 0;
      console.log("После сброса scrollTop:", popupContent.scrollTop);
    } else {
      console.log("popup__content не найден!");
    }
  }, 50); // Даем время на рендеринг

  modalElement.addEventListener("mousedown", handleCloseOverlay);
  document.addEventListener("keydown", handleCloseEsc);
}




// Закрытие модального окна
function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  modalElement.removeEventListener("mousedown", handleCloseOverlay);
  document.removeEventListener("keydown", handleCloseEsc);
}

// Обработчик клика по оверлею
function handleCloseOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// Обработчик нажатия клавиши Esc
function handleCloseEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    if (openPopup) closeModal(openPopup);
  }
}

// Открытие попапа по клику на topScorerItem
topScorerItems.forEach((topScorerItem) => {
  topScorerItem.addEventListener("click", () => {
    openModal(popupPlayers); // Открытие попапа
  });
});






// Обработчик для всех кнопок закрытия попапа
popupButtonElements.forEach((popupButtonClose) => {
  popupButtonClose.addEventListener("click", function (evt) {
    const modal = evt.target.closest(".popup");
    if (modal) closeModal(modal);
  });
});
