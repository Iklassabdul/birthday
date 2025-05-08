document.addEventListener("DOMContentLoaded", function () {
  // Countdown Timer
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

  // Journal Logic
  const book = document.getElementById("book");
  const showBtn = document.getElementById("show-book");
  const phraseBtn = document.getElementById("show-phrase");

  const loveEl = document.getElementById("love-quote");
  const motiEl = document.getElementById("motivation-quote");
  const leftPageNum = document.getElementById("left-page-number");
  const rightPageNum = document.getElementById("right-page-number");
  const timestampLeft = document.getElementById("timestamp-left");
  const timestampRight = document.getElementById("timestamp-right");

  const loveQuotes = [
    "You're the sugar in my tea.",
    "You calm me like Lagos rain after heat.",
    "Even suya no sweet reach your love.",
    "You complete me like pepper and jollof.",
    "You dey make my heart skip like NEPA light."
  ];

  const motivationQuotes = [
    "You’re stronger than you feel.",
    "Greatness no dey rush — take your time.",
    "One day, your hustle go speak for you.",
    "No dull — your shine is loading.",
    "Keep going. You carry power."
  ];

  let currentIndex = new Date().getDate() % loveQuotes.length;

  function updateJournal(index) {
    loveEl.textContent = loveQuotes[index % loveQuotes.length];
    motiEl.textContent = motivationQuotes[index % motivationQuotes.length];

    const now = new Date();
    const timestamp = now.toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric"
    }) + " — " + now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });

    timestampLeft.textContent = timestamp;
    timestampRight.textContent = timestamp;

    leftPageNum.textContent = `Page ${index * 2 + 1}`;
    rightPageNum.textContent = `Page ${index * 2 + 2}`;
  }

  // Toggle Journal + Reveal Second Button
  showBtn.addEventListener("click", () => {
    const isVisible = !book.classList.contains("hidden");

    if (isVisible) {
      book.classList.remove("show");
      setTimeout(() => {
        book.classList.add("hidden");
        showBtn.textContent = "Click me for today’s journal";
        phraseBtn.classList.add("hidden");
      }, 300);
    } else {
      book.classList.remove("hidden");
      updateJournal(currentIndex);
      setTimeout(() => {
        book.classList.add("show");
      }, 10);
      showBtn.textContent = "Hide journal";
      phraseBtn.classList.remove("hidden");
    }
  });

  // Swipe Gestures
  let startX = 0;
  let isDragging = false;

  book.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  book.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    handleSwipe(endX - startX);
  });

  book.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
  });

  book.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.clientX;
    handleSwipe(endX - startX);
  });

  function handleSwipe(deltaX) {
    if (deltaX > 50) {
      currentIndex = (currentIndex - 1 + loveQuotes.length) % loveQuotes.length;
      updateJournal(currentIndex);
    } else if (deltaX < -50) {
      currentIndex = (currentIndex + 1) % loveQuotes.length;
      updateJournal(currentIndex);
    }
  }

  // Placeholder: You can later attach this to unlock a modal, input, etc.
  phraseBtn.addEventListener("click", () => {
    alert("This is where the phrase feature will go!");
  });
});
