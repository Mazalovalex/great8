// photos — массив с 5 изображениями.
// info — объект с личной информацией (имя, рост, вес и т.д.).
// statistics — объект, содержащий данные по текущему сезону и карьере.
// facts — массив с интересными фактами о игроке.


const playersData = [
  {
    name: "Александр Овечкин",
    photos: [
      "url1.jpg",
      "url2.jpg",
      "url3.jpg",
      "url4.jpg",
      "url5.jpg"
    ],
    info: {
      height: "6'3\"",
      weight: "238 lb",
      birthDate: "9/17/1985",
      birthplace: "Москва, Россия",
      shoots: "Правша",
      draft: "2004, WSH (1st overall), 1st round, 1st pick"
    },
    statistics: {
      currentSeason: {
        gamesPlayed: 50,
        goals: 25,
        assists: 30,
        points: 55
      },
      career: {
        gamesPlayed: 1300,
        goals: 740,
        assists: 600,
        points: 1340
      }
    },
    facts: [
      "Самый возрастной игрок, забивший 50 голов за сезон.",
      "Овечкин выигрывал 'Морис Ришар Трофи' 9 раз – абсолютный рекорд.",
      "Дебют 5 октября 2005 года: два гола против 'Коламбус Блю Джекетс'."
    ]
  },
  {
    name: "Уэйн Гретцки",
    photos: [
      "url1.jpg",
      "url2.jpg",
      "url3.jpg",
      "url4.jpg",
      "url5.jpg"
    ],
    info: {
      height: "6'3\"",
      weight: "238 lb",
      birthDate: "1/26/1961",
      birthplace: "Рэвелсток, Канада",
      shoots: "Правша",
      draft: "1979, EDM (1st overall), 1st round, 1st pick"
    },
    statistics: {
      currentSeason: {
        gamesPlayed: 0,
        goals: 0,
        assists: 0,
        points: 0
      },
      career: {
        gamesPlayed: 1487,
        goals: 894,
        assists: 1963,
        points: 2857
      }
    },
    facts: [
      "Гретцки – рекордсмен по количеству очков (2,857) и передачам (1,963) в НХЛ.",
      "Он выиграл Кубок Стэнли 4 раза с 'Эдмонтон Ойлерз'.",
      "Перешёл в 'Лос-Анджелес Кингз' в 1988 году, что стало поворотным моментом для НХЛ."
    ]
  }
];


