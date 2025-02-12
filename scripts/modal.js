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
    closeModal(openPopup);
  }
}

// Открытие попапа по клику на topScorerItem
topScorerItems.forEach((topScorerItem) => {
  topScorerItem.addEventListener("click", () => {
    openModal(popupPlayers); // Открытие попапа
  });
});

// Обработчик для кнопок закрытия попапа
popupButtonElements.forEach(function (popupButtonClose) {
  popupButtonClose.addEventListener("click", function (evt) {
    const modal = evt.target.closest(".popup");
    closeModal(modal);
  });
});
