// Структура аудиоальбомов
const audioGroups = {
  "Пётр Ильич Чайковский – Детский альбом": [
    { file: "tchaikovsky/track1.mp3", title: "Утро" },
    { file: "tchaikovsky/track2.mp3", title: "Игра" }
  ],
  "Игорь Алексеевич Парфёнов – Детский альбом": [
    { file: "parfenov/track1.mp3", title: "Колыбельная" }
  ],
  "Эми Бич – Детский альбом": [
    { file: "beach/track1.mp3", title: "Вальс" }
  ]
};

// Поиск читаемого названия трека по имени файла
function findTitleByFilename(filename) {
  for (const tracks of Object.values(audioGroups)) {
    for (const track of tracks) {
      if (track.file === filename) {
        return track.title;
      }
    }
  }
  return filename;
}

const urlParams = new URLSearchParams(window.location.search);
const playFile = urlParams.get("play");
const currentUrl = window.location.origin + window.location.pathname;

if (playFile) {
  // Режим воспроизведения по ссылке ?play=...
  const title = findTitleByFilename(playFile);
  const audio = document.createElement("audio");
  audio.src = `audio/${playFile}`;
  audio.controls = true;
  audio.autoplay = true;

  document.body.innerHTML = `<h2>Воспроизведение: ${title}</h2>`;
  document.body.appendChild(audio);
} else {
  // Режим отображения списка треков
  const trackList = document.getElementById("trackList");

  for (const [groupTitle, tracks] of Object.entries(audioGroups)) {
    const groupHeader = document.createElement("h2");
    groupHeader.textContent = groupTitle;
    trackList.appendChild(groupHeader);

    tracks.forEach(track => {
      const container = document.createElement("div");
      container.className = "track";

      const titleEl = document.createElement("h3");
      titleEl.textContent = track.title;

      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = `audio/${track.file}`;

      const qrDiv = document.createElement("div");
      qrDiv.className = "qrcode";

      const fullPath = `${currentUrl}?play=${encodeURIComponent(track.file)}`;
      QRCode.toCanvas(qrDiv, fullPath, { width: 128 }, err => {
        if (err) console.error(err);
      });

      container.appendChild(titleEl);
      container.appendChild(audio);
      container.appendChild(qrDiv);
      trackList.appendChild(container);
    });
  }
}
