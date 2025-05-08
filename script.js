<script>
document.addEventListener("DOMContentLoaded", function () {
  // --- Welcome Screen ---
  const welcomeEl = document.getElementById("welcome-screen");
  const messageEl = document.getElementById("welcome-message");
  const welcomeMessages = [
    "System status: Waiting for Oluwakemi’s birthday...<br>Programmed with love, patience, and a little surprise.",
    "Hello Oluwakemi,<br>Before anything else, just know, this page is love in digital form. Count it down with me.",
    "Dear Oluwakemi,<br>Every sunrise brings us closer. This countdown? It’s my silent way of saying 'I’m thinking of you.'",
    "Oluwakemi,<br>Some people write letters. I build webpages. And this one? It’s all for you.",
    "Hey beautiful,<br>I didn’t just build a page... I planted a surprise that blooms on your birthday.",
    "You may not see the effort...<br>But every second behind this was for one thing — making your birthday feel a little more special, Oluwakemi.",
    "Hi Oluwakemi,<br>They say love is shown in little things. So here’s a page, counting down to a day that means everything to me.",
    "Some gifts come wrapped in ribbons,<br>Others, in intention. This one is wrapped in code, crafted for you, Oluwakemi.",
    "A little something to remind you how special you are...<br>Let the countdown begin.",
    "This isn’t just a countdown...<br>It’s a gift wrapped in love, made only for you."
  ];
  const watHour = (new Date().getUTCHours() + 1) % 24;
  const greeting = watHour >= 12 && watHour < 17 ? "Good afternoon" : watHour >= 17 ? "Good evening" : "Good morning";
  const welcomeMsg = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  messageEl.innerHTML = `${greeting}, Oluwakemi.<br><br>${welcomeMsg}`;
  setTimeout(() => {
    welcomeEl.classList.add("fade-out");
    document.body.style.overflow = "auto";
  }, 5000);

  // --- Countdown Timer ---
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

  // --- Rotating Titles ---
  const rotatingTitles = [
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
  let rotateIndex = 0;
  setInterval(() => {
    titleEl.style.opacity = 0;
    setTimeout(() => {
      titleEl.textContent = rotatingTitles[rotateIndex];
      titleEl.style.opacity = 1;
      rotateIndex = (rotateIndex + 1) % rotatingTitles.length;
    }, 300);
  }, 5000);

  // --- Audio Player ---
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play-button");
  const playIcon = document.getElementById("play-icon");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");

  const tracks = Array.from("abcdefghijklmnopqrstuvwxyz").slice(0, 24);
  const todayKey = new Date().toISOString().slice(0, 10);
  const storageKey = `played-song-${todayKey}`;

  function pickDailyTrack() {
    const stored = localStorage.getItem(storageKey);
    if (stored) return `music/${stored}.mp4`;
    const random = tracks[Math.floor(Math.random() * tracks.length)];
    localStorage.setItem(storageKey, random);
    return `music/${random}.mp4`;
  }

  audio.src = pickDailyTrack();

  playBtn.addEventListener("click", () => {
    audio.paused ? audio.play() : audio.pause();
  });

  audio.addEventListener("play", () => {
    playIcon.textContent = "❚❚";
  });

  audio.addEventListener("pause", () => {
    playIcon.textContent = "▶";
  });

  audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;
    progressBar.max = audio.duration;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  });

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  progressBar.addEventListener("mousedown", e => e.preventDefault());

  audio.addEventListener("ended", () => {
    document.getElementById("password-popup").classList.remove("hidden");
    document.getElementById("password-input").value = "";
    document.getElementById("error-message").classList.add("hidden");
  });

  // --- Password Phrase Unlock ---
  const PASSWORD = "TrustMeBabe";
  const phraseDates = [12, 14, 16, 17, 19, 20, 21, 23, 24, 29];
  const phrases = ["Oluwakemi", "Love", "Honesty", "Communication", "Ifemi", "Ayomi", "Marriage", "Eternity", "Baker", "Birthday"];
  const today = new Date().getDate();

  document.getElementById("submit-password").addEventListener("click", () => {
    const input = document.getElementById("password-input").value.trim();
    if (input === PASSWORD) {
      const msg = phraseDates.includes(today)
        ? phrases[phraseDates.indexOf(today)]
        : "Sorry my love, no phrase today. Check back tomorrow.";
      document.getElementById("phrase-text").textContent = msg;
      document.getElementById("password-popup").classList.add("hidden");
      document.getElementById("phrase-display").classList.remove("hidden");
    } else {
      document.getElementById("error-message").textContent = "You entered the wrong password my love.";
      document.getElementById("error-message").classList.remove("hidden");
    }
  });

  document.getElementById("close-password-popup").addEventListener("click", () => {
    document.getElementById("password-popup").classList.add("hidden");
  });

  // --- Gift Popup Messages ---
  const giftPopup = document.getElementById("gift-popup");
  const giftHeading = document.getElementById("gift-heading");
  const popupText = document.getElementById("popup-text");
  const giftLines = [
    "A queen like you deserves to wait for a royal reveal. Patience, my love.",
    "Hmm… you too dey rush. Let’s unwrap it together on the 31st.",
    "Chill babygirl… we still dey cook your surprise. Come back on the 31st."
  ];
  let lineIndex = 0;

  giftHeading.addEventListener("click", () => {
    popupText.textContent = giftLines[lineIndex];
    lineIndex = (lineIndex + 1) % giftLines.length;
    giftPopup.classList.remove("hidden");
    setTimeout(() => giftPopup.classList.add("hidden"), 5000);
  });

  document.getElementById("close-popup").addEventListener("click", () => {
    giftPopup.classList.add("hidden");
  });
});
</script>
