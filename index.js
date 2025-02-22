import { images } from "./scripts/Images.js";

fetch("https://mazalovalex.github.io/great8/model/data.json")
  .then((resp) => {
    if (!resp.ok) {
      throw new Error(`Ошибка сети: ${resp.status} ${resp.statusText}`);
    }
    return resp.json();
  })
  .then((data) => {
    console.log("Данные загружены");
    console.log(data);
    console.log("Теперь вы можете делать что угодно с этими данными");

    updateGoalRecord(data);
    showVideoBtn.addEventListener("click", function () {
      toggleVideo(data);
    });
  })
  .catch((error) => {
    console.error("Произошла ошибка при выполнении запроса:", error.message);
    // Дополнительные действия при ошибке, например, показать сообщение пользователю
    alert("Не удалось загрузить данные. Пожалуйста, попробуйте позже.");
  });

const modalWindows = document.querySelectorAll(".popup"); // все попапы
// Добавляем анимацию для всех модальных окон
modalWindows.forEach(function (modalWindow) {
  modalWindow.classList.add("popup_is-animated"); // добавление класса анимации
});

// Функция для обновления данных о рекорде
function updateGoalRecord(data) {
  // Обновляем количество голов Овечкина в заголовке
  const ovechkinGoalTitleElement = document.querySelector(".record-number");
  ovechkinGoalTitleElement.textContent = data.ovechkinGoals;

  // Обновляем описание  под заголовке
  const recordDescriptionElement = document.querySelector(
    ".record-description"
  );
  recordDescriptionElement.textContent = data.description;
  // Обновляем количество голов Овечкина в Топ 5
  const TopPlayersOvechkinGoalElement =
    document.querySelector(".goalsOvechkin");
  TopPlayersOvechkinGoalElement.textContent = data.ovechkinGoals;

  // Обновляем разницу до рекорда Гретцки
  const remainingGoalsElement = document.querySelector(".record-difference");
  remainingGoalsElement.textContent =
    data.gretskyRecord - data.ovechkinGoals + 1;

  // Обновляем прогресс-бар
  const progressBar = document.querySelector(".progress-barOvi");
  const progress =
    ((data.ovechkinGoals - data.gretskyRecord / 2) * 100) /
    (data.gretskyRecord / 2);
  progressBar.setAttribute("data-progress", progress);

  //обновляем значение в кнопке мобильная версия
  const goalNumber = document.querySelector(".goal-number");
  goalNumber.textContent = data.ovechkinGoals;

  ///Обновляем видео в HTML из обьекта
  const videoIframe = document.querySelector(".video");
  videoIframe.src = data.videoUrl; // Используем URL из объекта

  // Обновляем высоту видеоплеера для разрешений от 500 до 1280
  const TopPlayersElement = document.querySelector(".player-list");
  const videoPlayer = document.querySelector(".video");
  const heightTopPlayers = getComputedStyle(TopPlayersElement).height;

  const mediaQuery = window.matchMedia(
    "(min-width: 500px) and (max-width: 1280px)"
  );

  const updateHeight = () => {
    if (mediaQuery.matches) {
      // Обновляем высоту только если медиазапрос выполнен
      videoPlayer.style.height = heightTopPlayers;
    } else {
      // Можно задать высоту по умолчанию или другое значение
      videoPlayer.style.height = "200px"; // Сбросить высоту, если не подходит диапазон
    }
  };

  // Инициализация высоты при загрузке
  updateHeight();

  // Обновление при изменении размера окна
  mediaQuery.addEventListener("change", updateHeight);
}
// updateGoalRecord();

// Функция для обновления красной линией прогресс-баров
function updateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar) => {
    const progress = bar.dataset.progress;
    bar.style.width = progress + "%";
  });
}

// Функция для анимации чисел
function animateGoalNumbers() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  const goalElements = document.querySelectorAll(".player-goals");

  goalElements.forEach((goalElement) => {
    const targetNumber = parseInt(goalElement.textContent, 10);
    let currentNumber = 500;
    const duration = 2000;
    const stepTime = duration / (targetNumber - currentNumber);

    const interval = setInterval(() => {
      currentNumber++;
      goalElement.textContent = currentNumber;

      if (currentNumber >= targetNumber) {
        clearInterval(interval);
      }
    }, stepTime);
  });
}

// Функция для анимации фотографий Овечкина
function startImageAnimation(imagesArr, frameDelay = 100) {
  if (!Array.isArray(imagesArr) || !imagesArr.length) {
    console.error("Ошибка: Массив изображений пуст или не является массивом.");
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) {
    console.log("Анимация отключена: включён режим уменьшения движения.");
    return;
  }

  const imageElement = document.querySelector(".ovechkin-image");
  if (!imageElement) {
    console.error("Ошибка: Элемент .ovechkin-image не найден.");
    return;
  }

  imageElement.onerror = () => {
    console.error(
      "Ошибка загрузки изображения: " +
        imageElement.src +
        "Заменяем на изображение по умолчанию."
    );
    imageElement.src = "./image/OviPNG/ovechkin1.png";
  };

  let currentIndex = 0;

  setTimeout(() => {
    const interval = setInterval(() => {
      if (!imageElement || currentIndex >= imagesArr.length) {
        clearInterval(interval);
        console.log("Анимация завершена: все изображения показаны.");
        return;
      }

      imageElement.src = imagesArr[currentIndex];
      currentIndex++;
    }, frameDelay);
  }, 10);
}

// Функция для анимации текста
function animateText() {
  const developerElement = document.querySelector(".developer");
  const titleElement = document.querySelector(".record-section_title");
  const recordDescriptionElement = document.querySelector(
    ".record-description"
  );
  const videoElement = document.querySelector(".video");
  const recordProgressTitleElement = document.querySelector(
    ".record-progress__title"
  );

  titleElement.classList.add("visible");
  developerElement.classList.add("visible");
  recordDescriptionElement.classList.add("visible");
  videoElement.classList.add("visible");
  recordProgressTitleElement.classList.add("visible");
}

// Функция для проверки размера экрана
function checkScreenSize() {
  const videoWrapper = document.getElementById("video-wrapper");
  const showVideoBtn = document.getElementById("show-video-btn");
  const videoIframe = document.getElementById("video-iframe");

  if (window.innerWidth < 500) {
    showVideoBtn.style.display = "block";
    videoWrapper.style.display = "none";
    videoIframe.src = "";
  } else {
    showVideoBtn.style.display = "none";
    videoWrapper.style.display = "block";
  }
}

// Инициализация при загрузке страницы
window.addEventListener("load", function () {
  setTimeout(function () {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hidden");
    preloader.style.display = "none";

    updateProgressBars();
    animateGoalNumbers();
    startImageAnimation(images);
    animateText();
    checkScreenSize();
  }, 2000);
});

// Обработчик изменения размера окна
window.addEventListener("resize", checkScreenSize);
////!!!!!!!!!!!!!!

function toggleVideo(data) {
  const videoWrapper = document.getElementById("video-wrapper");
  const showVideoBtn = document.getElementById("show-video-btn");
  const videoIframe = document.getElementById("video-iframe");

  // Доступ к ссылке на видео из объекта
  // Если видео скрыто
  if (videoWrapper.style.display === "none" || !videoWrapper.style.display) {
    videoWrapper.style.display = "block"; // Показываем видео
    showVideoBtn.textContent = "Закрыть видео";

    // Если iframe уже имеет src, ничего не меняем, иначе устанавливаем видео
    if (!videoIframe.getAttribute("src")) {
      console.log("В iframe нет src, задаем URL из объекта");
      videoIframe.src = data.videoUrl; // Используем URL из объекта
      // Логируем, что ссылка установлена
      console.log("Ссылка на видео установлена: ", videoIframe.src);
    } else {
      console.log("Видео уже имеет src, не меняем");
    }
  } else {
    videoWrapper.style.display = "none"; // Скрываем видео
    videoIframe.src = ""; // Останавливаем видео, очищая src
    showVideoBtn.textContent = "Смотреть гол";
  }
}

// Обработчик для кнопки переключения видео
const showVideoBtn = document.getElementById("show-video-btn");
