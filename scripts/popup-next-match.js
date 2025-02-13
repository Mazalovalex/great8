// Загружаем JSON-файл Календарь
fetch(
  "https://mazalovalex.github.io/great8/model/popup-next-match-calendar.json"
)
  .then(function (resp) {
    if (!resp.ok) {
      throw new Error(
        "Ошибка сети: ответ сервера не успешен (" + resp.statusText + ")"
      );
    }
    return resp.json();
  })
  .then(function (data) {
    console.log("Данные загружены");
    // Сохраняем в константу
    const dataCalendar = data;

    // === СЕЛЕКТОРЫ ДЛЯ МАТЧА ===
    const matchSelectors = {
      homeTeamLogo: ".home-team img",
      homeTeam: ".home-team .team-text",
      date: ".time-games-list li:nth-child(1)",
      time: ".time-games-list li:nth-child(2)",
      awayTeamLogo: ".away-team img",
      awayTeam: ".away-team .team-text",
    };

    // === УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ===
    function fillData(selectors, source) {
      Object.entries(selectors).forEach(function ([key, selector]) {
        const element = document.querySelector(selector);
        if (element) {
          if (element.tagName === "IMG") {
            element.src = source[key] || "";
            element.alt = `${source[key.replace("Logo", "")] || "Логотип"}`;
          } else {
            element.textContent = source[key] || "";
          }
        }
      });
    }

    // === ВЫЗОВ ===
    fillData(matchSelectors, dataCalendar.calendar[0]);
  })
  .catch(function (error) {
    console.error("Ошибка загрузки JSON:", error);
  });
