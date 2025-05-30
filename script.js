console.clear();

class MusicPlayer {
  constructor() {
    this.audio = new Audio();
    this.isPlaying = false;
    this.currentTrack = null;
    
    // DOM элементы
    this.playerElement = document.getElementById('player');
    this.playBtn = document.getElementById('play');
    this.prevBtn = document.getElementById('prev');
    this.nextBtn = document.getElementById('next');
    this.artistElement = document.getElementById('artist');
    this.trackNameElement = document.getElementById('track-name');
    this.progressBar = document.getElementById('progress-bar');
    this.controlPanel = document.getElementById('control-panel');
    this.infoBar = document.getElementById('info');
    this.homePage = document.getElementById('home-page');

    // Привязка контекста
    this.play = this.play.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.togglePlayPause = this.togglePlayPause.bind(this);

    // Инициализация
    this.init();
  }

  init() {
    // Проверяем параметры URL
    const urlParams = new URLSearchParams(window.location.search);
    const trackToPlay = urlParams.get('play');

    if (trackToPlay) {
      this.loadTrack(trackToPlay);
    } else {
      // Если нет трека для воспроизведения, показываем главную страницу
      this.showHomePage();
    }

    // Настройка аудио
    this.audio.addEventListener('timeupdate', this.updateProgress);
    this.playBtn.addEventListener('click', this.togglePlayPause);
  }

  loadTrack(trackPath) {
    // Скрываем главную страницу и показываем плеер
    this.homePage.style.display = 'none';
    this.playerElement.style.display = 'block';

    // Устанавливаем трек
    this.currentTrack = `https://ch-audio-library.github.io/audio/${trackPath}`;
    this.audio.src = this.currentTrack;

    // Парсим информацию о треке из пути
    const trackInfo = this.parseTrackInfo(trackPath);
    this.artistElement.textContent = trackInfo.artist;
    this.trackNameElement.textContent = trackInfo.trackName;

    // Автовоспроизведение
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updatePlayButton();
    }).catch(error => {
      console.error('Автовоспроизведение не сработало:', error);
    });
  }

  parseTrackInfo(trackPath) {
    // Пример пути: magdalena/track1.mp3
    const parts = trackPath.split('/');
    const artist = parts[0];
    const trackName = parts[1].replace('.mp3', '').replace(/_/g, ' ');
    
    return {
      artist: this.capitalizeFirstLetter(artist),
      trackName: this.capitalizeFirstLetter(trackName)
    };
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  showHomePage() {
    this.playerElement.style.display = 'none';
    this.homePage.style.display = 'block';
    this.homePage.innerHTML = '<h1>Добро пожаловать в аудио библиотеку</h1>';
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.audio.play();
    this.isPlaying = true;
    this.updatePlayButton();
    this.toggleActiveState();
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updatePlayButton();
    this.toggleActiveState();
  }

  updatePlayButton() {
    // Здесь можно добавить смену иконки play/pause
  }

  updateProgress() {
    const progress = (this.audio.currentTime / this.audio.duration) * 100;
    this.progressBar.style.width = `${progress}%`;
  }

  toggleActiveState() {
    Array.from(this.controlPanel.classList).find(element => {
      return element !== "active" ? this.controlPanel.classList.add('active') : this.controlPanel.classList.remove('active');
    });
    
    Array.from(this.infoBar.classList).find(element => {
      return element !== "active" ? this.infoBar.classList.add('active') : this.infoBar.classList.remove('active');
    });
  }
}

// Инициализация плеера
const player = new MusicPlayer();