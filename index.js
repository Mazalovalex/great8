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

// Функция для переключения видео
function toggleVideo() {
  const videoWrapper = document.getElementById("video-wrapper");
  const showVideoBtn = document.getElementById("show-video-btn");
  const videoIframe = document.getElementById("video-iframe");

  if (videoWrapper.style.display === "none") {
    videoWrapper.style.display = "block";
    videoIframe.src =
      "https://players.brightcove.net/6415718365001/D3UCGynRWU_default/index.html?videoId=6368141588112";
    showVideoBtn.textContent = "Закрыть видео";
  } else {
    videoWrapper.style.display = "none";
    videoIframe.src = "";
    showVideoBtn.textContent = "Показать гол";
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

// Обработчик для кнопки переключения видео
const showVideoBtn = document.getElementById("show-video-btn");
if (showVideoBtn) {
  showVideoBtn.addEventListener("click", toggleVideo);
}
