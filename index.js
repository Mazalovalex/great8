import { data } from "./scripts/data.js"; // Импортируем объект из другого файла
import { images } from "./scripts/Images.js"; // Импортируем объект из другого файла

// Функция для обновления данных о рекорде
function updateGoalRecord() {
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
updateGoalRecord();

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
  }, 300);
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

function toggleVideo() {
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
    console.log("Видео отображается, скрываем...");
    videoWrapper.style.display = "none"; // Скрываем видео
    videoIframe.src = ""; // Останавливаем видео, очищая src
    showVideoBtn.textContent = "Смотреть гол Овечкина";
    console.log("Текст на кнопке изменен на 'Смотреть гол Овечкина'");
  }
}

// Обработчик для кнопки переключения видео
const showVideoBtn = document.getElementById("show-video-btn");
if (showVideoBtn) {
  showVideoBtn.addEventListener("click", toggleVideo);
  console.log("Обработчик клика добавлен на кнопку");
} else {
  console.log("Кнопка не найдена!");
}
