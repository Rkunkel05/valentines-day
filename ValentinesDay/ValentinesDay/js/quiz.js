console.log("quiz.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-quiz-btn");
  const letterContainer = document.querySelector(".letter-container");
  const heartContainer = document.querySelector('.floating-hearts');
  const musicBtn = document.getElementById("music-btn");

  let player;
  let playing = false;

  // ---------------- Quiz State ----------------
  const questions = [
    {
      question: "What is her favorite color?",
      answers: ["Pink", "Black", "Blue", "Green"],
      correct: "Blue"
    },
    {
      question: "How long have we been dating?",
      answers: ["Twenty months", "One week", "Fifteen months", "One year"],
      correct: "Fifteen months"
    },
    {
      question: "Which of these dates have we NOT gone on?",
      answers: ["Concert", "Kayak", "Rock Climbing", "Beach"],
      correct: "Beach"
    },
    {
        question: "MREOW",
        answers: ["meowwww", "woof", "neighhh", "bark"],
        correct: "meowwww"
    },
    {
        question: "What is her favorite drink?",
        answers: ["Matcha Latte", "Earl Grey", "Milk", "Lemonade"],
        correct: "Matcha Latte"     
    },
    {
        question: "How much do you love her?",
        answers: ["Not at all lol", "Like kinda", "SO much!!", "A normal amount"],
        correct: "SO much!!"       
    },
    {
        question: "What is her favorite gurt?",
        answers: ["Siggi", "Fage", "Oikos", "Chobani"],
        correct: "Chobani" 
    },
    {
        question: "How much can she squat?",
        answers: ["175lbs", "210lbs", "150lbs", "75lbs"],
        correct: "150lbs"     
    },
    {
        question: "Okay fr 0-10 how much do you really love her?",
        answers: ["10000", "idk 6?", "literally 0", "-50"],
        correct: "10000"     
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  // ---------------- Quiz Functions ----------------
  function showQuestion() {
    const q = questions[currentQuestionIndex];

    letterContainer.innerHTML = `
      <h2>${q.question}</h2>
      <p>Score: ${score}</p>
      <div class="answers quad-grid">
        ${q.answers.map(a => `<button class="answer" data-answer="${a}">${a}</button>`).join('')}
      </div>
    `;

    addAnswerListeners();
  }

  function addAnswerListeners() {
    const buttons = document.querySelectorAll(".answer");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const selected = btn.dataset.answer;
        const correct = questions[currentQuestionIndex].correct;

        if (selected === correct) score++;

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
          showQuestion();
        } else {
          showFinalScore();
        }
      });
    });
  }

  function showFinalScore() {
    let passed = score === questions.length; // only perfect score passes
    let message = passed
      ? "You saved her!!!"
      : "Ooo... erm... yea the evil king just fed her to the dragon... thats awk... Maybe next time?";
  
    letterContainer.innerHTML = `
      <h2>Quiz Complete</h2>
      <p>Your Score: ${score} / ${questions.length}</p>
      <h3>${message}</h3>
      ${passed ? '<button id="continue" class="button">Continue</button>' : '<button id="restart" class="button">Play Again</button>'}
    `;
  
    if (passed) {
      document.getElementById("continue").addEventListener("click", () => {
        // action when quiz is passed, e.g., show next page or message
        letterContainer.innerHTML = `<h2>You saved your girlfriend from the evil king...!</h2><br><h2>And now she has a prize for you...!</h2><button id="toKiss" class="button">Continue</button>`;
        
        document.getElementById("toKiss").addEventListener("click", () => {
            burstKisses(40);
            letterContainer.innerHTML = `<h2>One billion kisses!!!</h2><a href="finalScreen.html" class="button">Continue</a>`;
          });
    });

    } else {
      document.getElementById("restart").addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
      });
    }
  }

  startBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  });


  // ---------------- Floating Hearts ----------------
  function createHeart() {
    const heart = document.createElement('img');
    heart.src = 'images/heart.png';
    heart.classList.add('floating-heart');
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = 3 + Math.random() * 2 + 's';
    heartContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }

  setInterval(createHeart, 300);

  // ---------------- YouTube Music ----------------
  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('yt-player');
  };

  musicBtn.addEventListener("click", () => {
    if (!playing) {
      player.playVideo();
      musicBtn.textContent = "Pause Music";
    } else {
      player.pauseVideo();
      musicBtn.textContent = "Play Music";
    }
    playing = !playing;
  });
});

function burstKisses(amount = 25) {
    for (let i = 0; i < amount; i++) {
      const kiss = document.createElement("img");
  
      kiss.src = "images/kiss.png";
      kiss.classList.add("kiss-burst");
  
      // random direction spread
      const x = (Math.random() - 0.5) * 1200 + "px";
      const y = (Math.random() - 0.5) * 1200 + "px";
      const r = (Math.random() * 360) + "deg";
  
      kiss.style.setProperty("--x", x);
      kiss.style.setProperty("--y", y);
      kiss.style.setProperty("--r", r);
  
      document.body.appendChild(kiss);
  
      setTimeout(() => kiss.remove(), 2000);
    }
  }