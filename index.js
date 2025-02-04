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
  "./image/OviPNG/ovechkin1.png",
];
// Функция для Остатка до рекорда, шайб овечкина в топ 5 игроков, прогресс бара

function updateGoalRecord() {
  // Получаем текущее количество голов
  const currentGoalCountElement = document.querySelector(".record-number");
  const currentGoalCount = Number(currentGoalCountElement.textContent);

  // Обновляем количество голов Овечкина
  const ovechkinGoalElement = document.querySelector(".goalsOvechkin");
  ovechkinGoalElement.textContent = currentGoalCount;

  // Записываем рекорд Гретцки
  const remainingGoalsElement = document.querySelector(".record-difference");
  const gretskyRecord = 894;
  remainingGoalsElement.textContent = gretskyRecord - currentGoalCount + 1;
  console.log(remainingGoalsElement);

  // Записываем актуальный процент прогресс бара Овечкина
  const progress = ((currentGoalCount - 894 / 2) * 100) / (894 / 2);
  const progressBar = document.querySelector(".progress-barOvi");
  progressBar.setAttribute("data-progress", progress);
}
updateGoalRecord();

// Функция для обновления прогресс-баров
function updateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");

  progressBars.forEach(function (bar) {
    const progress = bar.dataset.progress;
    bar.style.width = progress + "%";
  });
}
// Функция для анимации чисел
function animateGoalNumbers() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return; // Если включен режим уменьшения движения, прерываем анимацию

  const goalElements = document.querySelectorAll(".player-goals");

  goalElements.forEach(function (goalElement) {
    const targetNumber = parseInt(goalElement.textContent, 10);
    let currentNumber = 500;
    const duration = 2000;
    const stepTime = duration / (targetNumber - currentNumber);

    const interval = setInterval(function () {
      currentNumber++;
      goalElement.textContent = currentNumber;

      if (currentNumber >= targetNumber) {
        clearInterval(interval);
      }
    }, stepTime);
  });
}
// Функция для анимации фотографий Овечкина
function startImageAnimation(imagesArr) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return; // Если включен режим уменьшения движения, прерываем анимацию

  let currentIndex = 0;
  const imageElement = document.querySelector(".ovechkin-image");
  const frameDelay = 2500;

  const interval = setInterval(function () {
    if (currentIndex >= imagesArr.length) {
      clearInterval(interval);
      return;
    }

    if (imageElement) {
      imageElement.src = imagesArr[currentIndex];
      currentIndex++;
    }
  }, frameDelay);
}

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

  // Добавляем класс для анимации, чтобы она началась после загрузки страницы
  titleElement.classList.add("visible");
  developerElement.classList.add("visible");
  recordDescriptionElement.classList.add("visible");
  videoElement.classList.add("visible");
  recordProgressTitleElement.classList.add("visible");
}

// установка флага для запуска функций после закрытия прелоудера
let preloaderHidden = false;

window.addEventListener("load", function () {
  setTimeout(function () {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hidden");
    preloader.style.display = "none";
    preloaderHidden = true;

    if (preloaderHidden) {
      console.log("Флаг активен: Прелоадер скрыт.");
      updateProgressBars();
      animateGoalNumbers();
      startImageAnimation(images);
      animateText();
    }
  }, 11112000);
});

const videoWrapper = document.getElementById("video-wrapper");
const showVideoBtn = document.getElementById("show-video-btn");
const videoIframe = document.getElementById("video-iframe");

// Функция для проверки размера экрана
function checkScreenSize() {
  if (window.innerWidth < 500) {
    // Если ширина экрана меньше 500px, показываем кнопку и скрываем видео
    showVideoBtn.style.display = "block";
    videoWrapper.style.display = "none";
    videoIframe.src = "";
  } else {
    // Если ширина экрана больше или равна 500px, скрываем кнопку и показываем видео
    showVideoBtn.style.display = "none";
    videoWrapper.style.display = "block";
  }
}

// Проверка размера экрана при загрузке страницы
window.onload = checkScreenSize;

// Дополнительная обработка изменения ширины окна
window.addEventListener("resize", checkScreenSize);

// Функция для переключения видео
function toggleVideo() {
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

// Добавляем обработчик события для кнопки
showVideoBtn.addEventListener("click", toggleVideo);
