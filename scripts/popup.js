fetch("http://127.0.0.1:5500/model/popup-player-info.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    console.log("Data is loaded");
    console.log(data);
    console.log("Now here you can do what you want");

    const playerItems = document.querySelectorAll(".top-scorer-item");
    console.log(playerItems);

    //Получаем блок "Следующий матч" и скрываем его изначально
    const nextMatchWrapper = document.querySelector(".next-match-wrapper");
    nextMatchWrapper.style.display = "none";

    playerItems.forEach(function (item) {
      item.addEventListener("click", function () {
        const playerName = item.dataset.name;

        const playerData = data.playersData.find(function (player) {
          return player.name === playerName;
        });

        console.log(playerData);

        // Заполняем данные попапа
        // ФОТО ЖУРНАЛА
        document.querySelector(".picture__img_11").src = playerData.photos[0];
        document.querySelector(".picture__img_12").src = playerData.photos[1];
        document.querySelector(".picture__img_13").src = playerData.photos[2];
        // document.querySelector(".picture__img_21").src = playerData.photos[3];
        // document.querySelector(".picture__img_22").src = playerData.photos[4];
        // document.querySelector(".picture__img_23").src = playerData.photos[5];

        // ALT для фотографий из фото журнала
        document.querySelector(".picture__img_11").alt =
          playerData.photosAlt[0];
        document.querySelector(".picture__img_12").alt =
          playerData.photosAlt[1];
        document.querySelector(".picture__img_13").alt =
          playerData.photosAlt[2];

        //ИНФО
        // Инфо - Имя
        document.querySelector(".popup__body-player-info-name").textContent =
          playerData.info.name;
        // Инфо - Рост
        document.querySelector(".info-list-height-change").textContent =
          playerData.info.height;
        // Инфо - Вес
        document.querySelector(".info-list-weight-change").textContent =
          playerData.info.weight;
        // Инфо - Дата рождения
        document.querySelector(".info-list-birthDate-change").textContent =
          playerData.info.birthDate;
        // Инфо - Место Рождения
        document.querySelector(".info-list-birthplace-change").textContent =
          playerData.info.birthplace;
        // Инфо - Флаг
        document.querySelector(".info-list-citizenship-flag").src =
          playerData.info.flag;
        // Инфо - ALT к Флагу
        document.querySelector(".info-list-citizenship-flag").alt =
          playerData.info.altFlat;
        // Инфо - Хват
        document.querySelector(".info-list-shoots-change").textContent =
          playerData.info.shoots;
        // Инфо - Драфт
        document.querySelector(".info-list-draft-change").textContent =
          playerData.info.draft;
        // Инфо - Клубы
        document.querySelector(".info-list-clubs-change").textContent =
          playerData.info.clubs;
        // Инфо - Прозвище
        document.querySelector(".info-list-nickname-change").textContent =
          playerData.info.nickname;
        // Фото в инфо
        document.querySelector(".popup__body__img").src = playerData.info.img;

        // Показываем блок "Следующий матч", если выбран Овечкин
        if (playerData.name === "Александр Овечкин") {
          nextMatchWrapper.style.display = "block";
        } else {
          nextMatchWrapper.style.display = "none";
        }

        //СТАТИСТИКА
        // Статистика - Сыгранные матчи
        document.querySelector(".table-games-played-value").textContent =
          playerData.statistics.gamesPlayed;
        // Статистика - Голы
        document.querySelector(".table-goals-value").textContent =
          playerData.statistics.goals;
        // Статистика - Ассисты
        document.querySelector(".table-assists-value").textContent =
          playerData.statistics.assists;
        // Статистика - Очки
        document.querySelector(".table-points-value").textContent =
          playerData.statistics.points;
        // Статистика - Штрафные минуты
        document.querySelector(".table-penalty-minutes-value").textContent =
          playerData.statistics.penaltyMinutes;
        // Статистика - Броски по воротам
        document.querySelector(".table-shots-on-goal-value").textContent =
          playerData.statistics.shotsOnGoal;
        // Статистика - Процент реализации бросков
        document.querySelector(".table-shooting-percentage-value").textContent =
          playerData.statistics.shootingPercentage;

        //ФАКТЫ
        // Факты - первый факт Заголовок
        document.querySelector(".fact-1-title").textContent =
          playerData.factsTitle[0];
        // Факты - первый факт Текст
        document.querySelector(".fact-1").textContent = playerData.facts[0];

        // Факты - второй факт Заголовок
        document.querySelector(".fact-2-title").textContent =
          playerData.factsTitle[1];
        // Факты - второй факт Текст
        document.querySelector(".fact-2").textContent = playerData.facts[1];

        // Факты - трейти факт Заголовок
        document.querySelector(".fact-3-title").textContent =
          playerData.factsTitle[2];
        // Факты - третий факт Текст
        document.querySelector(".fact-3").textContent = playerData.facts[2];
      });
    });
  });
