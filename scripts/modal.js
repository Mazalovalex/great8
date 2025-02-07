// const popupPlayers = document.querySelector(".popup");
// const topScorerItem = document.querySelector(".top-scorer-item");
// const popupButtonElement = document.querySelector(".popup-button");

// console.log(popupPlayers);
// console.log(topScorerItem);
// console.log(popupButtonElement);

// if (popupPlayers && topScorerItem && popupButtonElement) {
//   // Открытие попапа по клику на topScorerItem
//   topScorerItem.addEventListener("click", () => {
//     openModal(popupPlayers);
//   });

//   // Закрытие попапа по клику на popupButtonElement
//   popupButtonElement.addEventListener("click", () => {
//     closeModal(popupPlayers);
//   });

//   // Функция открытия модального окна
//   function openModal(modalElement) {
//     modalElement.classList.remove("popup-hide");
//     modalElement.classList.add("popup_is-opened");
//   }

//   // Функция закрытия модального окна
//   function closeModal(modalElement) {
//     modalElement.classList.add("popup-hide");
//     modalElement.classList.remove("popup_is-opened");
//   }
// } else {
//   console.error(
//     "popupPlayers, topScorerItem или popupButtonElement не найдены в документе"
//   );
// }
