async function loadCalendar() {
  try {
    // Загружаем JSON-файл
    const resp = await fetch(
      "https://mazalovalex.github.io/great8/model/popup-next-match-calendar.json"
    );
    if (!resp.ok) {
      throw new Error(
        `Ошибка сети: ответ сервера не успешен (${resp.statusText})`
      );
    }
    const data = await resp.json();
    console.log("Данные загружены");
    const dataCalendar = data;

    // Селекторы для элементов на странице
    const matchSelectors = {
      homeTeamLogo: ".home-team img",
      homeTeamLogoAlt: ".home-team img",
      homeTeam: ".home-team .team-text",
      date: ".time-games-list li:nth-child(1)",
      time: ".time-games-list li:nth-child(2)",
      awayTeamLogo: ".away-team img",
      awayTeamLogoAlt: ".away-team img",
      awayTeam: ".away-team .team-text",
    };

    // Функция для заполнения данных
    function fillData(selectors, source) {
      Object.entries(selectors).forEach(function ([key, selector]) {
        const element = document.querySelector(selector);
        if (element) {
          if (element.tagName === "IMG") {
            element.src = source[key.replace("Alt", "")] || "";
            element.alt = source[key] || "Логотип команды";
          } else {
            element.textContent = source[key] || "";
          }
        }
      });
    }

    // Заполняем данные на странице
    fillData(matchSelectors, dataCalendar.calendar[0]);
  } catch (error) {
    console.error("Ошибка загрузки JSON:", error);
  }
}

// Запускаем загрузку календаря
loadCalendar();
