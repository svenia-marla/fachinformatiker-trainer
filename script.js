// ===== Fachinformatiker Trainer – vanilla JS =====

let questions = [];
let originalPool = [];
let currentQuestionIndex = 0;
let score = 0;
let wrong = 0;
const answeredQuestions = [];

// we need to rebind these after rebuilding the quiz HTML
let questionNumber, questionText, optionsContainer, hint, explanation;
let hintBtn, explanationBtn, scoreDisplay, wrongDisplay;
const failSound = document.getElementById("fail-sound");

// ---------- utils ----------
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function bindElements() {
  questionNumber = document.getElementById("question-number");
  questionText = document.getElementById("question");
  optionsContainer = document.getElementById("options");
  hint = document.getElementById("hint");
  explanation = document.getElementById("explanation");
  hintBtn = document.getElementById("hint-button");
  explanationBtn = document.getElementById("explanation-button");
  scoreDisplay = document.getElementById("score");
  wrongDisplay = document.getElementById("wrong");

  hintBtn.onclick = () => {
    hint.style.display = hint.style.display === "none" ? "block" : "none";
  };
  explanationBtn.onclick = () => {
    explanation.style.display = explanation.style.display === "none" ? "block" : "none";
  };
}
function resetRun() {
  currentQuestionIndex = 0;
  score = 0;
  wrong = 0;
  answeredQuestions.length = 0;
  scoreDisplay.textContent = "0 richtig";
  wrongDisplay.textContent = "0 falsch";
}

// rebuilds the quiz UI inside #quiz-container
function buildQuizScaffold() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <div id="question-number" class="mb-2 fw-bold"></div>
    <div id="question" class="mb-3 fs-5"></div>
    <div id="options" class="btn-group-vertical w-100"></div>
    <div class="mt-3">
      <button id="hint-button" class="btn btn-sm btn-secondary me-2">💡 Hinweis zeigen</button>
      <button id="explanation-button" class="btn btn-sm btn-info">📘 Erklärung zeigen</button>
    </div>
    <div class="mt-2">
      <div id="hint" class="hint text-warning mt-2" style="display:none;"></div>
      <div id="explanation" class="explanation text-info mt-2" style="display:none;"></div>
    </div>
    <div class="mt-3 text-end">
      <span id="score" class="badge bg-success">0 richtig</span>
      <span id="wrong" class="badge bg-danger">0 falsch</span>
    </div>
  `;
  bindElements();
}

// ---------- quiz flow ----------
function renderQuestion() {
  const q = questions[currentQuestionIndex];
  questionNumber.textContent = `Frage ${currentQuestionIndex + 1} von ${questions.length}`;
  questionText.textContent = q.question;
  hint.textContent = q.hint || "";
  explanation.textContent = q.explanation || "";
  hint.style.display = "none";
  explanation.style.display = "none";
  hintBtn.disabled = false;
  explanationBtn.disabled = false;

  // randomize the position of answers
  optionsContainer.innerHTML = "";
  shuffle(q.options).forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-light mb-2 text-start";
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(opt, q);
    optionsContainer.appendChild(btn);
  });
}

function handleAnswer(selectedOptionText, q) {
  const isCorrect = selectedOptionText === q.answer;

  answeredQuestions.push({
    question: q.question,
    yourAnswer: selectedOptionText,
    correctAnswer: q.answer,
    explanation: q.explanation || "",
    isCorrect
  });

  if (isCorrect) {
    score++;
    scoreDisplay.textContent = `${score} richtig`;
  } else {
    wrong++;
    wrongDisplay.textContent = `${wrong} falsch`;
    try { failSound.currentTime = 0; failSound.play(); } catch (_) {}
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showSummary();
  }
}

function showSummary() {
  const total = questions.length;
  const container = document.getElementById("quiz-container");

  const headerHtml = `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h2 class="h4 mb-0">Quiz beendet</h2>
      <div>
        <span class="badge bg-success me-2">${score} richtig</span>
        <span class="badge bg-danger">${wrong} falsch</span>
      </div>
    </div>
    <p class="text-muted">Alle Fragen dieses Durchgangs. Falsche Antworten sind rot markiert und mit Erklärung versehen.</p>
  `;

  const itemsHtml = answeredQuestions.map((item, i) => {
    const statusCls = item.isCorrect ? "border-success" : "border-danger";
    const yourCls = item.isCorrect ? "text-success" : "text-danger";
    const explHtml = item.isCorrect
      ? ""
      : `<div class="mt-2 small"><span class="badge bg-info text-dark me-1">Erklärung</span> ${escapeHtml(item.explanation || "Keine Erklärung hinterlegt.")}</div>`;
    return `
      <div class="card bg-dark text-light border ${statusCls} mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h3 class="h6 mb-2">Frage ${i + 1} von ${total}</h3>
            <span class="badge ${item.isCorrect ? "bg-success" : "bg-danger"}">
              ${item.isCorrect ? "Richtig" : "Falsch"}
            </span>
          </div>
          <p class="mb-2">${escapeHtml(item.question)}</p>
          <p class="mb-1">Deine Antwort: <span class="${yourCls}">${escapeHtml(item.yourAnswer)}</span></p>
          <p class="mb-0">Korrekte Antwort: <span class="text-success">${escapeHtml(item.correctAnswer)}</span></p>
          ${explHtml}
        </div>
      </div>
    `;
  }).join("");

  const actionsHtml = `
    <div class="d-flex gap-2 mt-3">
      <button id="retry-all" class="btn btn-primary">Neu starten (30 Zufallsfragen)</button>
      <button id="retry-wrong" class="btn btn-outline-warning">Nur falsche wiederholen</button>
    </div>
  `;

  container.innerHTML = headerHtml + itemsHtml + actionsHtml;

  document.getElementById("retry-all").onclick = () => {
    // new random 30 from whole pool
    buildQuizScaffold();
    questions = shuffle(originalPool).slice(0, 30);
    resetRun();
    renderQuestion();
  };

  document.getElementById("retry-wrong").onclick = () => {
    const wrongTexts = answeredQuestions.filter(x => !x.isCorrect).map(x => x.question);
    const subset = originalPool.filter(q => wrongTexts.includes(q.question));
    buildQuizScaffold();
    questions = subset.length ? shuffle(subset).slice(0, Math.min(30, subset.length))
                              : shuffle(originalPool).slice(0, 30);
    resetRun();
    renderQuestion();
  };
}

// ---------- boot ----------
buildQuizScaffold(); // build initial UI + bind handlers

fetch("questions.json")
  .then((res) => res.json())
  .then((data) => {
    originalPool = Array.isArray(data) ? data : [];
    questions = shuffle(originalPool).slice(0, 30);
    renderQuestion();
  })
  .catch((err) => {
    questionText.textContent = "Fehler beim Laden der Fragen 😵";
    console.error("Ladefehler:", err);
  });
