// Загружаем JSON-файл с данными игроков
fetch("https://mazalovalex.github.io/great8/model/popup-player-info.json")
  .then(function (resp) {
    if (!resp.ok) {
      throw new Error(
        "Ошибка сети: ответ сервера не успешен (" + resp.statusText + ")"
      );
    }
    return resp.json();
  })
  .then(function (data) {
    console.log("Data is loaded", data);

    const playerItems = document.querySelectorAll(".top-scorer-item");

    // Получаем блок "Следующий матч" и скрываем его изначально
    const nextMatchWrapper = document.querySelector(".next-match-wrapper");
    nextMatchWrapper.style.display = "none";

    // Навешиваем обработчик клика на каждого игрока
    playerItems.forEach(function (item) {
      item.addEventListener("click", function () {
        clearPopup(); // Очищаем попап перед загрузкой новых данных

        // Получаем имя игрока из data-атрибута
        const playerName = item.dataset.name;

        // Ищем данные игрока в загруженном JSON
        const playerData = data.playersData.find(function (player) {
          return player.name === playerName;
        });

        if (!playerData) {
          console.warn("Данные для игрока не найдены:", playerName);
          return;
        }

        function factListItems(selector, dataArray) {
          const listItems = document.querySelectorAll(selector);

          listItems.forEach(function (li, index) {
            if (dataArray[index]) {
              const numberSpan = li.querySelector(".fact-number");
              const textSpan = li.querySelector(".fact-text");
              const factTooltip = li.querySelector(".fact-tooltip");

              if (numberSpan) {
                numberSpan.textContent = dataArray[index].number;
              }
              if (textSpan) {
                textSpan.textContent = dataArray[index].text;
              }
            } else {
              li.textContent = ""; // Если данных нет, очищаем элемент
            }
          });
        }

        factListItems(".facts-item", playerData.facts);

        function fillListItems(selector, dataArray) {
          const listItems = document.querySelectorAll(selector);
          listItems.forEach((li, index) => {
            li.textContent = dataArray[index] || ""; // Если данных нет, оставляем пустым
          });
        }

        console.log(document.querySelectorAll(".match-data"));

        // Заполняем факты и рекорды игрока
        fillListItems(".popup__history-text", playerData.popupHistoryText);

        // === ФОТО ЖУРНАЛА ===
        const pictureImagesAll = document.querySelectorAll(".picture__img");
        pictureImagesAll.forEach((img, index) => {
          img.src = playerData.photos[index] || "";
          img.alt = playerData.photosAlt[index] || "";
        });

        // === ОБНОВЛЕНИЕ ФОНА ПОПАПА (только для планшетов 500-768px) ===
        const popupBody = document.querySelector(".popup__body-player");

        if (window.innerWidth >= 320 && window.innerWidth <= 1024) {
          if (playerData.background) {
            popupBody.style.backgroundImage =
              "url(" + playerData.background + ")";
          } else {
            popupBody.style.backgroundImage = "none";
          }
        }

        // === ОБЩАЯ ФУНКЦИЯ ДЛЯ ЗАПОЛНЕНИЯ ДАННЫХ ===
        function fillData(selectors, source) {
          Object.entries(selectors).forEach(([key, selector]) => {
            const element = document.querySelector(selector);
            if (element) {
              element.textContent = source[key] || "";
            }
          });
        }

        // === ЗАПОЛНЯЕМ ИНФОРМАЦИЮ ОБ ИГРОКЕ ===
        const infoSelectors = {
          name: ".popup__body-player-info-name",
          height: ".info-list-height-change",
          weight: ".info-list-weight-change",
          birthDate: ".info-list-birthDate-change",
          birthplace: ".info-list-birthplace-change",
          shoots: ".info-list-shoots-change",
          draft: ".info-list-draft-change",
          clubs: ".info-list-clubs-change",
          nickname: ".info-list-nickname-change",
        };
        fillData(infoSelectors, playerData.info);

        // === ОБНОВЛЯЕМ ФЛАГ (отдельно, так как это изображение) ===
        const flagImg = document.querySelector(".info-list-citizenship-flag");
        if (flagImg) {
          flagImg.src = playerData.info.flag || "";
          flagImg.alt = playerData.info.altFlag || "";
        }

        // === ОБНОВЛЯЕМ ФОТО ИГРОКА ===
        const playerImg = document.querySelector(".popup__body__img");
        if (playerImg) {
          playerImg.src = playerData.info.img || "";
        }

        // === ПОКАЗЫВАЕМ БЛОК "СЛЕДУЮЩИЙ МАТЧ" ДЛЯ ОВЕЧКИНА ===
        nextMatchWrapper.style.display =
          playerData.name === "Александр Овечкин" ? "flex" : "none";

        // === ЗАПОЛНЯЕМ СТАТИСТИКУ ===
        const statsSelectors = {
          gamesPlayed: ".table-cell-games-played",
          goals: ".table-cell-goals",
          assists: ".table-cell-assists",
          points: ".table-cell-points",
          penaltyMinutes: ".table-cell-penalties",
          shotsOnGoal: ".table-cell-shots",
          shootingPercentage: ".table-cell-shooting-percentage",
        };
        fillData(statsSelectors, playerData.statistics);
      });
    });
  })
  .catch(function (error) {
    console.error("Произошла ошибка при выполнении запроса:", error.message);
  });

/**
 * Функция для очистки попапа перед загрузкой новых данных
 */
function clearPopup() {
  console.log("Очищаем попап...");

  // Очищаем все изображения
  document.querySelectorAll(".picture__img").forEach((img) => {
    img.src = "";
    img.alt = "";
  });

  // Очищаем текстовые данные
  const infoSelectors = [
    ".popup__body-player-info-name",
    ".info-list-height-change",
    ".info-list-weight-change",
    ".info-list-birthDate-change",
    ".info-list-birthplace-change",
    ".info-list-shoots-change",
    ".info-list-draft-change",
    ".info-list-clubs-change",
    ".info-list-nickname-change",
    ".table-cell-games-played",
    ".table-cell-goals",
    ".table-cell-assists",
    ".table-cell-points",
    ".table-cell-penalties",
    ".table-cell-shots",
    ".table-cell-shooting-percentage",
  ];
  infoSelectors.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = "";
  });

  // Очищаем флаг
  const flagImg = document.querySelector(".info-list-citizenship-flag");
  if (flagImg) {
    flagImg.src = "";
    flagImg.alt = "";
  }

  // Очищаем фото игрока
  const playerImg = document.querySelector(".popup__body__img");
  if (playerImg) playerImg.src = "";

  // Очищаем фон попапа
  document.querySelector(".popup__body-player").style.backgroundImage = "none";

  // Скрываем блок "Следующий матч"
  const nextMatchWrapper = document.querySelector(".next-match-wrapper");
  if (nextMatchWrapper) nextMatchWrapper.style.display = "none";
}
