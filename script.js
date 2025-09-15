const eventDate = new Date("2025-09-15T14:19:00").getTime();

const countdownEl = document.getElementById("countdown");
const revealBtn = document.getElementById("revealBtn");
const posterSection = document.getElementById("posterSection");
const eventMusic = document.getElementById("eventMusic"); // poster music
const revealMusic = document.getElementById("revealMusic"); // reveal page music
const container = document.querySelector(".container");

// Ensure initial state
posterSection.classList.add("hidden");
revealBtn.classList.add("hidden");

// Start reveal page music when page loads
window.addEventListener("load", () => {
  revealMusic.play().then(() => {
    console.log("Reveal music started automatically.");
  }).catch((err) => {
    console.log("Autoplay blocked by browser:", err);
  });
});

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    countdownEl.textContent = "00:00";
    revealBtn.classList.remove("hidden"); // show REVEAL button
    clearInterval(timer);
    return;
  }

  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  let formatted =
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds;

  countdownEl.textContent = formatted;
}

let timer = setInterval(updateCountdown, 1000);
updateCountdown();

// Reveal Button Click
revealBtn.addEventListener("click", () => {
  // Stop reveal page music
  revealMusic.pause();
  revealMusic.currentTime = 0;

  // Switch sections
  container.classList.add("hidden");
  posterSection.classList.remove("hidden");

  // Play poster music
  eventMusic.play().then(() => {
    console.log("Poster music started.");
  }).catch((err) => {
    console.log("Autoplay blocked for poster music:", err);
  });
});
