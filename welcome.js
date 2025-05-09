document.addEventListener("DOMContentLoaded", function () {
  // ========== Countdown Timer ==========
  const targetDate = new Date("2025-05-31T00:00:00+01:00").getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;
    const d = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    const h = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const m = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    const s = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));
    document.getElementById("days").textContent = String(d).padStart(2, "0");
    document.getElementById("hours").textContent = String(h).padStart(2, "0");
    document.getElementById("minutes").textContent = String(m).padStart(2, "0");
    document.getElementById("seconds").textContent = String(s).padStart(2, "0");
  }, 1000);

  // ========== Rotating Titles ==========
  const messages = [
    "Something beautiful is brewing for the one who makes me smile.",
    "My woman, my everything, your surprise is almost ready.",
    "You’ve been my peace… now let me return the joy.",
    "I get one small thing wey go make your heart do gbim gbim…",
    "Hey love, something special is coming…",
    "You no go expect the love wey I package for you…",
    "Something dey load wey go make you blush tire…",
    "Get ready to scream ‘awww’, it’s coming…",
    "My love, something crafted just for you is almost here…",
    "My love, May 31st go loud… just wait.",
    "This surprise na just a piece of how I feel for you.",
    "I dey express the love wey words no fit capture.",
    "What’s coming is a small version of the big love I carry for you.",
    "This one no be ordinary, na love coded in a moment."
  ];
  const titleEl = document.getElementById("rotating-title");
  let msgIndex = 0;
  setInterval(() => {
    titleEl.style.opacity = 0;
    setTimeout(() => {
      titleEl.textContent = messages[msgIndex];
      titleEl.style.opacity = 1;
      msgIndex = (msgIndex + 1) % messages.length;
    }, 300);
  }, 5000);

  // ========== Audio Logic ==========
  const birthdayDeadline = new Date("2025-05-31T00:00:00+01:00").getTime();
  const now = new Date().getTime();

  const audioPlayer = document.querySelector(".simple-audio-player");
  const giftHeading = document.getElementById("gift-heading");

  if (now >= birthdayDeadline) {
    if (audioPlayer) audioPlayer.classList.add("hidden");
    if (giftHeading) giftHeading.textContent = "Happy Birthday Oluwakemi!";
  } else {
    const audio = document.getElementById("audio");
    const playBtn = document.getElementById("play-button");
    const playIcon = document.getElementById("play-icon");
    const progress = document.getElementById("progress-bar");
    const currentTimeEl = document.getElementById("current-time");
    const durationEl = document.getElementById("duration");

    const allTracks = Array.from("abcdefghijklmnopqrstuvwxyz");
    const todayKey = new Date().toISOString().slice(0, 10);
    const playedTodayKey = `played-song-${todayKey}`;

    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("played-song-") && key !== playedTodayKey) {
        localStorage.removeItem(key);
      }
    });

    function pickSongForToday() {
      let alreadyPlayed = localStorage.getItem(playedTodayKey);
      if (alreadyPlayed) return `audio/${alreadyPlayed}.mp3`;
      const random = allTracks[Math.floor(Math.random() * allTracks.length)];
      localStorage.setItem(playedTodayKey, random);
      return `audio/${random}.mp3`;
    }

    const todayTrack = pickSongForToday();
    audio.src = todayTrack;

    let isPlaying = false;

    playBtn.addEventListener("click", () => {
      isPlaying ? audio.pause() : audio.play();
    });

    audio.addEventListener("play", () => {
      isPlaying = true;
      playIcon.innerHTML = "&#10074;&#10074;";
    });

    audio.addEventListener("pause", () => {
      isPlaying = false;
      playIcon.innerHTML = "&#9658;";
    });

    audio.addEventListener("timeupdate", () => {
      progress.value = audio.currentTime;
      progress.max = audio.duration;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent = formatTime(audio.duration);
    });

    function formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
      return `${min}:${sec}`;
    }

    progress.addEventListener("mousedown", e => e.preventDefault());

    audio.addEventListener("ended", () => {
      isPlaying = false;
      playIcon.innerHTML = "&#9658;";
      document.getElementById("password-popup").classList.remove("hidden");
      document.getElementById("password-input").value = "";
      document.getElementById("error-message").classList.add("hidden");
    });
  }

  // ========== Gift Popup ==========
  const giftPopup = document.getElementById("gift-popup");
  const popupText = document.getElementById("popup-text");
  const giftLines = [
    "A queen like you deserves to wait for a royal reveal. Patience, my love.",
    "Hmm… you too dey rush. Let’s unwrap it together on the 31st.",
    "Chill babygirl… we still dey cook your surprise. Come back on the 31st."
  ];
  let popupIndex = 0;

  giftHeading.addEventListener("click", () => {
    popupText.textContent = giftLines[popupIndex % giftLines.length];
    popupIndex++;
    giftPopup.classList.remove("hidden");
    setTimeout(() => giftPopup.classList.add("hidden"), 5000);
  });

  document.getElementById("close-popup").addEventListener("click", () => {
    giftPopup.classList.add("hidden");
  });

  // ========== Phrase Unlock ==========
  const passwordPopup = document.getElementById("password-popup");
  const passwordInput = document.getElementById("password-input");
  const submitBtn = document.getElementById("submit-password");
  const errorMsg = document.getElementById("error-message");
  const closePasswordPopup = document.getElementById("close-password-popup");

  const phraseDisplay = document.getElementById("phrase-display");
  const phraseText = document.getElementById("phrase-text");

  const PASSWORD = "TrustMeBabe";
  const phraseDates = [12, 14, 16, 17, 19, 20, 21, 23, 24, 29];
  const phrases = ["Oluwakemi", "Love", "Honesty", "Communication", "Ifemi", "Ayomi", "Marriage", "Eternity", "Baker", "Birthday"];
  const currentDay = new Date().getDate();

  submitBtn.addEventListener("click", () => {
    const input = passwordInput.value.trim();
    if (input === PASSWORD) {
      if (phraseDates.includes(currentDay)) {
        phraseText.textContent = phrases[phraseDates.indexOf(currentDay)];
      } else {
        phraseText.textContent = "Sorry my love, no phrase today. Check back tomorrow.";
      }
      passwordPopup.classList.add("hidden");
      phraseDisplay.classList.remove("hidden");
    } else {
      errorMsg.textContent = "You entered the wrong password my love.";
      errorMsg.classList.remove("hidden");
    }
  });

  closePasswordPopup.addEventListener("click", () => {
    passwordPopup.classList.add("hidden");
  });
});
