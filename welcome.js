document.addEventListener("DOMContentLoaded", function () {
  const welcomeScreen = document.getElementById("welcome-screen");
  const welcomeMessage = document.getElementById("welcome-message");

  const messages = [
    "System status: Waiting for Oluwakemi’s birthday...<br>Programmed with love, patience, and a little surprise.",
    "Hello Oluwakemi,<br>Before anything else, just know, this page is love in digital form.<br>Count it down with me.",
    "Dear Oluwakemi,<br>Every sunrise brings us closer.<br>This countdown? It’s my silent way of saying “I’m thinking of you.”",
    "Oluwakemi,<br>Some people write letters. I build webpages.<br>And this one? It’s all for you.",
    "Hey beautiful,<br>I didn’t just build a page... I planted a surprise that blooms on your birthday.",
    "You may not see the effort...<br>But every second behind this was for one thing.<br>Making your birthday feel a little more special, Oluwakemi.",
    "Good afternoon, Oluwakemi.<br>This page exists for one reason:<br>You. And the joy of seeing you smile.",
    "Hi Oluwakemi,<br>They say love is shown in little things.<br>So here’s a page, counting down to a day that means everything to me.",
    "Oluwakemi,<br>I coded a surprise into the future.<br>Keep checking... it’s going to be sweet.",
    "Some gifts come wrapped in ribbons,<br>Others, in intention.<br>This one is wrapped in code, crafted for you, Oluwakemi.",
    "Hi Oluwakemi,<br>A little something to remind you how special you are...<br>Let the countdown to your day begin.",
    "Oluwakemi,<br>This isn’t just a website... it’s a journey.<br>And it all leads to your birthday.",
    "Good afternoon, Oluwakemi!<br>I may not be a magician...<br>But I made this just for you. Let the countdown begin.",
    "Dear Oluwakemi,<br>Every moment, every second... brings us closer to your light.<br>This page was built with love, care, and a little hope to make you smile.",
    "Hello Oluwakemi,<br>This is for you.<br>A quiet countdown to something special.",
    "Oluwakemi,<br>This isn’t just a countdown...<br>It’s my way of showing how much I care.<br>Built with love just for you.",
    "To my favorite person,<br>Every second brings us closer to your day.<br>This page was crafted with all my heart.",
    "Hey Oluwakemi,<br>Something special is waiting for you here.<br>Let’s count down to it together.",
    "Good afternoon, Oluwakemi.<br>I didn’t wrap this in paper, I built it in code.<br>A gift made with love... and a few lines of JavaScript."
  ];

  const selectedMessage = messages[Math.floor(Math.random() * messages.length)];
  welcomeMessage.innerHTML = selectedMessage;

  // Show the welcome screen
  welcomeScreen.classList.remove("welcome-hidden");

  // Auto-close after 8 seconds or on click
  function closeWelcome() {
    welcomeScreen.classList.add("welcome-hidden");
  }

  setTimeout(closeWelcome, 8000);
  welcomeScreen.addEventListener("click", closeWelcome);
});
