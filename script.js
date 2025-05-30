// Список файлов — нужно вручную обновлять его при добавлении новых
const audioFiles = [
  "track1.mp3",
  "track2.mp3",
  // Добавьте сюда свои файлы
];

const trackList = document.getElementById("trackList");

const currentUrl = window.location.href.replace(/\/$/, ""); // без слэша в конце

audioFiles.forEach(filename => {
  const trackName = filename.replace(".mp3", "");
  const container = document.createElement("div");
  container.className = "track";

  const title = document.createElement("h3");
  title.textContent = trackName;

  const audio = document.createElement("audio");
  audio.controls = true;
  audio.src = `audio/${filename}`;

  const qrDiv = document.createElement("div");
  qrDiv.className = "qrcode";

  const directUrl = `${currentUrl}?play=${encodeURIComponent(filename)}`;
  QRCode.toCanvas(qrDiv, directUrl, { width: 128 }, error => {
    if (error) console.error(error);
  });

  container.appendChild(title);
  container.appendChild(audio);
  container.appendChild(qrDiv);
  trackList.appendChild(container);
});

// Автовоспроизведение по ссылке вида ?play=track1.mp3
const urlParams = new URLSearchParams(window.location.search);
const playFile = urlParams.get("play");

if (playFile && audioFiles.includes(playFile)) {
  const audioElement = document.createElement("audio");
  audioElement.src = `audio/${playFile}`;
  audioElement.autoplay = true;
  audioElement.controls = true;
  document.body.innerHTML = `<h2>Playing: ${playFile}</h2>`;
  document.body.appendChild(audioElement);
}
