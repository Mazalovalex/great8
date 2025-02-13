// Загружаем JSON-файл с данными игроков
fetch("https://mazalovalex.github.io/great8/model/popup-player-info.json")
  .then(function (resp) {
    if (!resp.ok) {
      throw new Error(
        "Ошибка сети: ответ сервера не успешен (" + resp.statusText + ")"
      );
    }
    return resp.json();
  })
  .then(function (data) {
    console.log("Data is loaded", data);
  });
