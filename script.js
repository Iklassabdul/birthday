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

  // Rotating Heading
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

  let titleIndex = 0;
  const rotatingTitle = document.getElementById("rotating-title");

  setInterval(() => {
    rotatingTitle.style.opacity = 0;
    setTimeout(() => {
      titleIndex = (titleIndex + 1) % titles.length;
      rotatingTitle.textContent = titles[titleIndex];
      rotatingTitle.style.opacity = 1;
    }, 300);
  }, 5000);

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

  showBtn.addEventListener("click", () => {
    const isVisible = !book.classList.contains("hidden");

    if (isVisible) {
      book.classList.remove("show");
      setTimeout(() => {
        book.classList.add("hidden");
        showBtn.textContent = "Come read what your baby wrote today";
        showBtn.classList.remove("glow-button");
        phraseBtn.classList.add("hidden");
      }, 300);
    } else {
      book.classList.remove("hidden");
      updateJournal(currentIndex);
      setTimeout(() => {
        book.classList.add("show");
      }, 10);
      showBtn.textContent = "Hide what your baby wrote 💌";
      showBtn.classList.add("glow-button");
      phraseBtn.classList.remove("hidden");
    }
  });

  // Swipe Gesture
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

  let giftMsgIndex = 0;
  let popupTimeout;

  giftHeading.addEventListener("click", () => {
    const today = new Date();
    const giftDay = new Date("2025-05-31T00:00:00+01:00");

    if (today < giftDay) {
      popupText.textContent = giftMessages[giftMsgIndex % giftMessages.length];
      giftMsgIndex++;
      giftPopup.classList.remove("hidden");

      clearTimeout(popupTimeout);
      popupTimeout = setTimeout(() => {
        giftPopup.classList.add("hidden");
      }, 5000);
    } else {
      alert("The gift is now ready! (Reveal logic goes here.)");
    }
  });

  closePopup.addEventListener("click", () => {
    giftPopup.classList.add("hidden");
    clearTimeout(popupTimeout);
  });

  // Dismiss popup if clicking outside
  document.addEventListener("click", (e) => {
    if (
      !giftPopup.classList.contains("hidden") &&
      !giftPopup.contains(e.target) &&
      e.target !== giftHeading
    ) {
      giftPopup.classList.add("hidden");
      clearTimeout(popupTimeout);
    }
  });
});
