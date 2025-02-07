import { videoData } from "./scripts/data.js"; // Импортируем объект из другого файла
console.log(videoData.videoUrl);

const images = [
  "./image/OviPNG/ovechkin1.png",
  "./image/OviPNG/ovechkin2.png",
  "./image/OviPNG/ovechkin3.png",
  "./image/OviPNG/ovechkin4.png",
  "./image/OviPNG/ovechkin5.png",
  "./image/OviPNG/ovechkin6.png",
  "./image/OviPNG/ovechkin7.png",
  "./image/OviPNG/ovechkin8.png",
  "./image/OviPNG/ovechkin9.png",
  "./image/OviPNG/ovechkin10.png",
  "./image/OviPNG/ovechkin11.png",
  "./image/OviPNG/ovechkin12.png",
  "./image/OviPNG/ovechkin13.png",
  "./image/OviPNG/ovechkin14.png",
  "./image/OviPNG/ovechkin15.png",
];

// Функция для обновления данных о рекорде
function updateGoalRecord() {
  const currentGoalCountElement = document.querySelector(".record-number");
  const currentGoalCount = Number(currentGoalCountElement.textContent);

  // Обновляем количество голов Овечкина
  const ovechkinGoalElement = document.querySelector(".goalsOvechkin");
  ovechkinGoalElement.textContent = currentGoalCount;

  // Обновляем разницу до рекорда Гретцки
  const remainingGoalsElement = document.querySelector(".record-difference");
  const gretskyRecord = 894;
  remainingGoalsElement.textContent = gretskyRecord - currentGoalCount + 1;

  // Обновляем прогресс-бар
  const progress = ((currentGoalCount - 894 / 2) * 100) / (894 / 2);
  const progressBar = document.querySelector(".progress-barOvi");
  progressBar.setAttribute("data-progress", progress);

  const goalNumber = document.querySelector(".goal-number");
  goalNumber.textContent = currentGoalCount;

  ///видео в HTML из обьекта
  console.log("Пытаемся получить URL видео...");
  console.log(videoData);
  console.log(videoData.videoUrl);
  const videoUrl = videoData.videoUrl;
  console.log("Полученный URL видео: ", videoUrl); // Логируем полученный URL

  const videoIframe = document.getElementById("video-iframe");
  videoIframe.src = videoUrl; // Используем URL из объекта

  // Обновляем высоту видеоплеера для разрешений от 500 до 1280
  const TopPlayersElement = document.querySelector(".player-list");

  if (!TopPlayersElement) {
    console.error("Элемент .player-list не найден.");
    return;
  }

  const mediaQuery = window.matchMedia(
    "(min-width: 500px) and (max-width: 1280px)"
  );

  const updateHeight = () => {
    if (mediaQuery.matches) {
      const heightTopPlayers = getComputedStyle(TopPlayersElement).height;
      const videoPlayer = document.querySelector(".video");
      if (videoPlayer) {
        videoPlayer.style.height = heightTopPlayers;
      }
    }
  };

  updateHeight();
  mediaQuery.addEventListener("change", updateHeight);
}

updateGoalRecord();

// Функция для обновления прогресс-баров
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
      `Ошибка загрузки изображения: ${imageElement.src}. Заменяем на изображение по умолчанию.`
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
      console.log(`Показ изображения: ${imagesArr[currentIndex]}`);
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
  const videoUrl = videoData.videoUrl;
  console.log("Полученный URL видео: ", videoUrl); // Логируем полученный URL

  // Если видео скрыто
  if (videoWrapper.style.display === "none" || !videoWrapper.style.display) {
    console.log("Видео скрыто, показываем...");

    videoWrapper.style.display = "block"; // Показываем видео
    showVideoBtn.textContent = "Закрыть видео";
    console.log("Текст на кнопке изменен на 'Закрыть видео'");

    // Если iframe уже имеет src, ничего не меняем, иначе устанавливаем видео
    if (!videoIframe.getAttribute("src")) {
      console.log("В iframe нет src, задаем URL из объекта");
      videoIframe.src = videoUrl; // Используем URL из объекта
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

