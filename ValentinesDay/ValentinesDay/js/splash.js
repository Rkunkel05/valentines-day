window.addEventListener("load", () => {
  const splash = document.querySelector(".splash");
  const letter = document.querySelector(".letter-container");

  setTimeout(() => {
    splash.classList.add("display-none");

    setTimeout(() => {
      letter.classList.add("show");
    }, 500); // small delay after splash
  }, 5000); // splash duration
});

  const heartContainer = document.querySelector('.floating-hearts');

function createHeart() {
  const heart = document.createElement('img');
  heart.src = 'images/heart.png';   // your heart image path
  heart.classList.add('floating-heart');
  heart.style.left = Math.random() * 100 + '%';          // random horizontal position
  heart.style.animationDuration = 3 + Math.random() * 2 + 's'; // 3-5s float
  heartContainer.appendChild(heart);

  // remove after animation finishes
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// create a heart every 300ms
setInterval(createHeart, 300);

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player');
}

const btn = document.getElementById("music-btn");
let playing = false;

btn.addEventListener("click", () => {
  if (!playing) {
    player.playVideo();
    btn.textContent = "Pause Music";
  } else {
    player.pauseVideo();
    btn.textContent = "Play Music";
  }
  playing = !playing;
});