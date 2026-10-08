function switchTab(tabName, event) {
  if (event) event.preventDefault();

  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => btn.classList.remove('active'));

  document.getElementById(`tab-${tabName}`).classList.add('active');

  if (event && event.target.classList.contains('nav-btn')) {
    event.target.classList.add('active');
  } else {
    const targetNav = document.querySelector(`nav a[onclick*="${tabName}"]`);
    if (targetNav) targetNav.classList.add('active');
  }
}

function openSection(sectionId) {
  document.getElementById(sectionId).classList.add('active');
}

function closeOverlay(sectionId) {
  document.getElementById(sectionId).classList.remove('active');
  
  // Pause audio saat modal ditutup
  const audio = document.getElementById('audio-player');
  if (audio && !audio.paused) {
    audio.pause();
    document.getElementById('play-btn').innerText = '▶';
  }
}

function openDetail(detailId) {
  document.getElementById(detailId).classList.add('active');
}

function closeDetail(detailId) {
  document.getElementById(detailId).classList.remove('active');
}

/* Logic Custom Music Player */
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = '❚❚';
    playBtn.style.paddingLeft = '0px';
  } else {
    audio.pause();
    playBtn.innerText = '▶';
    playBtn.style.paddingLeft = '2px';
  }
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

if (audio) {
  audio.addEventListener('loadedmetadata', () => {
    progressBar.max = audio.duration;
    durationTimeEl.innerText = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
    currentTimeEl.innerText = formatTime(audio.currentTime);
  });

  progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
  });

  audio.addEventListener('ended', () => {
    playBtn.innerText = '▶';
    playBtn.style.paddingLeft = '2px';
    progressBar.value = 0;
  });
}