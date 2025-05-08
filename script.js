document.addEventListener("DOMContentLoaded", function () {
  // Countdown
  const targetDate = new Date("2025-05-31T00:00:00+01:00").getTime();
  setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }, 1000);

  // Rotating Titles
  const titles = [
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
  let titleIndex = 0;
  setInterval(() => {
    titleEl.style.opacity = 0;
    setTimeout(() => {
      titleEl.textContent = titles[titleIndex];
      titleEl.style.opacity = 1;
      titleIndex = (titleIndex + 1) % titles.length;
    }, 300);
  }, 5000);

  // Audio Player & Song Rotation
  const audio = document.getElementById("audio");
  const playButton = document.getElementById("play-button");
  const playIcon = document.getElementById("play-icon");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");

  let isPlaying = false;
  const today = new Date();
  const currentDay = today.getDate();
  const playDateKey = `playedSongs-${today.getFullYear()}-${today.getMonth() + 1}`;

  const allTracks = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").slice(0, 24);
  const playedTracks = JSON.parse(localStorage.getItem(playDateKey)) || [];

  function getTodaySong() {
    if (currentDay >= 10 && currentDay <= 31) {
      const remaining = allTracks.filter((t) => !playedTracks.includes(t));
      if (remaining.length > 0) {
        const choice = remaining[Math.floor(Math.random() * remaining.length)];
        playedTracks.push(choice);
        localStorage.setItem(playDateKey, JSON.stringify(playedTracks));
        return `music/${choice}.mp3`;
      } else {
        return null;
      }
    }
    return null;
  }

  const todayTrack = getTodaySong();
  if (todayTrack) {
    audio.src = todayTrack;
  }

  playButton.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
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
    const current = audio.currentTime;
    const duration = audio.duration;
    progressBar.value = current;
    progressBar.max = duration;
    currentTimeEl.textContent = formatTime(current);
    durationEl.textContent = formatTime(duration);
  });

  progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
  });

  audio.addEventListener("ended", () => {
    isPlaying = false;
    playIcon.innerHTML = "&#9658;";
    progressBar.value = 0;
    currentTimeEl.textContent = "0:00";
    passwordInput.value = "";
    errorMsg.classList.add("hidden");
    passwordPopup.classList.remove("hidden");
  });

  function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  // Gift Popup
  const giftHeading = document.getElementById("gift-heading");
  const giftPopup = document.getElementById("gift-popup");
  const popupText = document.getElementById("popup-text");
  const closePopup = document.getElementById("close-popup");

  const giftMessages = [
    "A queen like you deserves to wait for a royal reveal. Patience, my love.",
    "Hmm… you too dey rush. Let’s unwrap it together on the 31st.",
    "Chill babygirl… we still dey cook your surprise. Come back on the 31st."
  ];
  let msgIndex = 0;

  giftHeading.addEventListener("click", () => {
    const birthday = new Date("2025-05-31T00:00:00+01:00");
    if (today < birthday) {
      popupText.textContent = giftMessages[msgIndex % giftMessages.length];
      msgIndex++;
      giftPopup.classList.remove("hidden");
      setTimeout(() => giftPopup.classList.add("hidden"), 5000);
    }
  });

  closePopup.addEventListener("click", () => {
    giftPopup.classList.add("hidden");
  });

  // Password Popup
  const passwordPopup = document.getElementById("password-popup");
  const passwordInput = document.getElementById("password-input");
  const submitBtn = document.getElementById("submit-password");
  const closePasswordPopup = document.getElementById("close-password-popup");
  const errorMsg = document.getElementById("error-message");
  const phraseDisplay = document.getElementById("phrase-display");
  const phraseText = document.getElementById("phrase-text");

  const PASSWORD = "TrustMeBabe";
  const phrases = ["Oluwakemi", "Love", "Honesty", "Communication", "Ifemi", "Ayomi", "Marriage", "Eternity", "Baker", "Birthday"];
  const allowedDates = [12, 14, 16, 17, 19, 20, 21, 23, 24, 29];

  submitBtn.addEventListener("click", () => {
    const input = passwordInput.value.trim();
    if (input === PASSWORD) {
      if (allowedDates.includes(currentDay)) {
        phraseText.textContent = phrases[allowedDates.indexOf(currentDay)];
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
