document.addEventListener("DOMContentLoaded", function () {
  // ========== Welcome Screen ==========
  const welcomeMessages = [
    "System status: Waiting for Oluwakemi’s birthday...\nProgrammed with love, patience, and a little surprise.",
    "Before anything else, just know, this page is love in digital form.\nCount it down with me.",
    "Every sunrise brings us closer.\nThis countdown? It’s my silent way of saying “I’m thinking of you.”",
    "Some people write letters. I build webpages.\nAnd this one? It’s all for you.",
    "Hey beautiful,\nI didn’t just build a page... I planted a surprise that blooms on your birthday.",
    "You may not see the effort...\nBut every second behind this was for one thing. Making your birthday feel a little more special, Oluwakemi.",
    "Oluwakemi,\nThey say love is shown in little things.\nSo here’s a page, counting down to a day that means everything to me.",
    "Oluwakemi,\nI coded a surprise into the future.\nKeep checking... it’s going to be sweet.",
    "Some gifts come wrapped in ribbons,\nOthers in intention.\nThis one is wrapped in code, crafted for you, Oluwakemi.",
    "This isn’t just a countdown...\nIt’s my way of showing how much I care.\nBuilt with love just for you."
  ];
  const welcomeScreen = document.getElementById("welcome-screen");
  const welcomeMessage = document.getElementById("welcome-message");
  if (welcomeScreen && welcomeMessage) {
    const selected = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    welcomeMessage.textContent = selected;
    setTimeout(() => {
      welcomeScreen.style.opacity = 0;
      setTimeout(() => welcomeScreen.style.display = "none", 500);
    }, 8000);
  }

  // ========== Title Rotation ==========
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

  const updateTitle = () => {
    titleEl.style.opacity = 0;
    setTimeout(() => {
      titleEl.textContent = messages[msgIndex];
      titleEl.style.opacity = 1;
      msgIndex = (msgIndex + 1) % messages.length;
    }, 300);
  };
  const titleInterval = setInterval(updateTitle, 5000);

  // ========== Countdown Timer + 12AM Reveal ==========
  const countdown = document.getElementById("countdown");
  const birthdayMessage = document.getElementById("birthday-message");
  const targetMidnight = new Date("2025-05-31T00:00:00+01:00").getTime();

  const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetMidnight - now;

    if (distance <= 0) {
      clearInterval(countdownTimer);
      countdown.classList.add("hidden");
      birthdayMessage.classList.remove("hidden");
      titleEl.textContent = "The moment is here, my love.";
      clearInterval(titleInterval);
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").textContent = String(d).padStart(2, "0");
    document.getElementById("hours").textContent = String(h).padStart(2, "0");
    document.getElementById("minutes").textContent = String(m).padStart(2, "0");
    document.getElementById("seconds").textContent = String(s).padStart(2, "0");
  }, 1000);

  // ========== Audio ==========
  const audio = document.getElementById("audio");
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  audio.src = `audio/${randomLetter}.mp3`;

  const playBtn = document.getElementById("play-button");
  const playIcon = document.getElementById("play-icon");
  const progress = document.getElementById("progress-bar");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");

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

  // ========== Gift Unlock Logic ==========
  const giftHeading = document.getElementById("gift-heading");
  const giftPopup = document.getElementById("gift-popup");
  const popupText = document.getElementById("popup-text");

  const unlockTime = new Date("2025-05-31T12:00:00+01:00").getTime();
  const correctPhrase = "Oluwakemi Loving You Brings Me Peace Joy Strength And Purpose";

  let isGiftUnlocked = false;

  giftHeading.addEventListener("click", () => {
    const now = new Date().getTime();

    if (now >= unlockTime) {
      // Show password input popup for full phrase
      const input = prompt("Enter the full 10-word phrase to unlock your gift:");
      if (input && input.trim() === correctPhrase) {
        window.location.href = "gift.html";
      } else {
        alert("Hmm… that’s not the full phrase, my love. Try again.");
      }
    } else {
      // Still before unlock time: show rotating tease
      const lines = [
        "A queen like you deserves to wait for a royal reveal. Patience, my love.",
        "Hmm… you too dey rush. Let’s unwrap it together on the 31st.",
        "Chill babygirl… we still dey cook your surprise. Come back on the 31st."
      ];
      popupText.textContent = lines[Math.floor(Math.random() * lines.length)];
      giftPopup.classList.remove("hidden");
      setTimeout(() => giftPopup.classList.add("hidden"), 5000);
    }
  });

  document.getElementById("close-popup").addEventListener("click", () => {
    giftPopup.classList.add("hidden");
  });

  // ========== Phrase Unlock ========== (optional, still active)
  const passwordPopup = document.getElementById("password-popup");
  const passwordInput = document.getElementById("password-input");
  const submitBtn = document.getElementById("submit-password");
  const errorMsg = document.getElementById("error-message");
  const closePasswordPopup = document.getElementById("close-password-popup");

  const phraseDisplay = document.getElementById("phrase-display");
  const phraseText = document.getElementById("phrase-text");

  const PASSWORD = "TrustMeBabe";
  const phraseDates = [10, 14, 16, 17, 19, 20, 21, 23, 24, 29];
  const phrases = ["Oluwakemi", "Loving", "You", "Brings", "Me", "Peace", "Joy", "Strength", "And", "Purpose"];
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
