// Получаем элемент select по id
const themeSelect = document.getElementById("theme-select");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  // Сбрасываем классы body до базового "page" и добавляем класс для выбранной темы
  document.body.className = "page";
  document.body.classList.add(`theme_${theme}`);
}

function changeTheme(theme) {
  // Сохраняем выбранную тему в localStorage
  localStorage.setItem("theme", theme);
  // Если выбрано "auto", подстраиваемся под системную тему, иначе применяем выбранную тему
  if (theme === "auto") {
    applyTheme(systemTheme.matches ? "dark" : "light");
  } else {
    applyTheme(theme);
  }
}

function initTheme() {
  // Получаем сохранённую тему или устанавливаем режим "auto" по умолчанию
  const savedTheme = localStorage.getItem("theme") || "auto";
  changeTheme(savedTheme);
  // Устанавливаем сохранённое значение в элемент select
  themeSelect.value = savedTheme;
}

// Обработчик изменения выбранного значения в select
themeSelect.addEventListener("change", () => {
  changeTheme(themeSelect.value);
});

// Если системная тема меняется, обновляем, если выбран авто-режим
systemTheme.addEventListener("change", () => {
  if (localStorage.getItem("theme") === "auto") {
    changeTheme("auto");
  }
});

// Инициализация темы при загрузке страницы
initTheme();
