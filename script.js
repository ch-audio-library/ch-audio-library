const audioGroups = {
  "Пётр Ильич Чайковский – Детский альбом": [
    "tchaikovsky/track1.mp3",
    "tchaikovsky/track2.mp3"
  ],
  "Игорь Алексеевич Парфёнов – Детский альбом": [
    "parfenov/track1.mp3"
  ],
  "Эми Бич – Детский альбом": [
    "beach/track1.mp3"
  ]
};

const trackList = document.getElementById("trackList");
const currentUrl = window.location.href.replace(/\/$/, "");

const urlParams = new URLSearchParams(window.location.search);
const playFile = urlParams.get("play");

// Переход по ссылке ?play=...
if (playFile) {
  const audio = document.createElement("audio");
  audio.src = `audio/${playFile}`;
  audio.autoplay = true;
  audio.controls = true;
  document.body.innerHTML = `<h2>Воспроизведение: ${decodeURIComponent(playFile)}</h2>`;
  document.body.appendChild(audio);
} else {
  // Вывод всех блоков и треков
  for (const [groupTitle, files] of Object.entries(audioGroups)) {
    const groupHeader = document.createElement("h2");
    groupHeader.textContent = groupTitle;
    trackList.appendChild(groupHeader);

    files.forEach(filename => {
      const nameOnly = filename.split("/").pop().replace(".mp3", "");
      const container = document.createElement("div");
      container.className = "track";

      const title = document.createElement("h3");
      title.textContent = nameOnly;

      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = `audio/${filename}`;

      const qrDiv = document.createElement("div");
      qrDiv.className = "qrcode";

      const fullPath = `${currentUrl}?play=${encodeURIComponent(filename)}`;
      QRCode.toCanvas(qrDiv, fullPath, { width: 128 }, err => {
        if (err) console.error(err);
      });

      container.appendChild(title);
      container.appendChild(audio);
      container.appendChild(qrDiv);
      trackList.appendChild(container);
    });
  }
}
