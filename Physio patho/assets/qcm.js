// Engine QCM partagé
let mode = "study";
let lockedQuestions = new Set();
let score = 0;
const LETTERS = ["A","B","C","D","E","F"];

function setupIntro() {
  const total = QCM_DATA.questions.length;
  const qcs = QCM_DATA.questions.filter(q => q.type === "QCS").length;
  const qcm = QCM_DATA.questions.filter(q => q.type === "QCM").length;
  document.getElementById("totalPill").textContent = total + " questions";
  document.getElementById("qcsPill").textContent = qcs + " QCS";
  document.getElementById("qcmPill").textContent = qcm + " QCM";
  document.getElementById("qTotal").textContent = total;
  document.getElementById("finalTotal").textContent = total;
  document.getElementById("qcmCount").textContent = total;
}

document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    mode = btn.dataset.mode;
  });
});

document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("restartBtn").addEventListener("click", () => location.reload());

function startQuiz() {
  document.getElementById("introCard").style.display = "none";
  document.getElementById("progressBar").classList.add("visible");
  renderQuestions();
}

function renderQuestions() {
  const container = document.getElementById("questionsContainer");
  container.innerHTML = "";
  QCM_DATA.questions.forEach((q, idx) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.dataset.idx = idx;
    const isQCM = q.type === "QCM";
    const inputType = isQCM ? "checkbox" : "radio";
    const optionsHtml = q.options.map((opt, i) => `<label class="opt" data-opt="${i}"><input type="${inputType}" name="q${idx}" value="${i}"><span class="opt-letter">${LETTERS[i]}.</span><span class="opt-text">${opt}</span></label>`).join("");
    card.innerHTML = `<div class="q-header"><div class="q-num">Question ${idx+1}/${QCM_DATA.questions.length}</div><div class="q-type ${isQCM?'qcm':'qcs'}">${isQCM?'QCM (plusieurs réponses)':'QCS (1 réponse)'}</div></div><div class="q-text">${q.question}</div><div class="options">${optionsHtml}</div><button class="check-btn" data-action="check">Valider</button><div class="feedback"></div>`;
    container.appendChild(card);
    card.querySelectorAll(".opt").forEach(opt => {
      opt.addEventListener("click", () => {
        if (lockedQuestions.has(idx)) return;
        setTimeout(() => updateSelectedVisual(idx), 0);
      });
    });
    card.querySelector("[data-action='check']").addEventListener("click", () => checkQuestion(idx));
  });
  if (mode === "exam") {
    container.querySelectorAll(".check-btn").forEach(b => b.style.display = "none");
    const submitDiv = document.createElement("div");
    submitDiv.style.textAlign = "center";
    submitDiv.style.margin = "24px 0";
    submitDiv.innerHTML = '<button class="start-btn" id="submitAllBtn">✓ Soumettre toutes les réponses</button>';
    container.appendChild(submitDiv);
    document.getElementById("submitAllBtn").addEventListener("click", submitAll);
  }
  updateProgress();
  setTimeout(() => container.querySelector(".question-card")?.scrollIntoView({behavior:"smooth", block:"start"}), 100);
}

function updateSelectedVisual(idx) {
  const card = document.querySelector(`.question-card[data-idx="${idx}"]`);
  card.querySelectorAll(".opt").forEach(opt => {
    const input = opt.querySelector("input");
    if (input.checked) opt.classList.add("selected");
    else opt.classList.remove("selected");
  });
}

function getSelected(idx) {
  const card = document.querySelector(`.question-card[data-idx="${idx}"]`);
  return Array.from(card.querySelectorAll("input:checked")).map(i => parseInt(i.value));
}

function lockAndShow(idx) {
  const q = QCM_DATA.questions[idx];
  const selected = new Set(getSelected(idx));
  const correct = new Set(q.correct);
  let isCorrect = selected.size > 0 && selected.size === correct.size && [...correct].every(c => selected.has(c));
  if (isCorrect) score++;
  lockedQuestions.add(idx);
  const card = document.querySelector(`.question-card[data-idx="${idx}"]`);
  card.querySelectorAll(".opt").forEach((opt, i) => {
    opt.classList.add("locked");
    opt.querySelector("input").disabled = true;
    if (correct.has(i) && selected.has(i)) opt.classList.add("correct");
    else if (!correct.has(i) && selected.has(i)) opt.classList.add("wrong");
    else if (correct.has(i) && !selected.has(i)) opt.classList.add("missed");
  });
  const fb = card.querySelector(".feedback");
  fb.classList.add("visible", isCorrect ? "ok" : "ko");
  const correctLetters = q.correct.map(c => LETTERS[c]).join(", ");
  fb.innerHTML = `<strong>${isCorrect ? "✓ Bonne réponse" : "✗ Mauvaise réponse"}</strong><div style="margin-bottom:6px;"><strong style="font-size:13px; text-transform:none; letter-spacing:0; display:inline; color: var(--dark);">Réponse${q.correct.length>1?'s':''} attendue${q.correct.length>1?'s':''} : </strong>${correctLetters}</div>${q.explanation ? `<div style="margin-top:6px;"><em>${q.explanation}</em></div>` : ""}`;
  const btn = card.querySelector(".check-btn");
  if (btn) btn.style.display = "none";
  return isCorrect;
}

function checkQuestion(idx) {
  if (lockedQuestions.has(idx)) return;
  const selected = getSelected(idx);
  if (selected.length === 0) { alert("Sélectionne au moins une réponse !"); return; }
  lockAndShow(idx);
  updateProgress();
  if (mode === "study") {
    setTimeout(() => {
      const next = document.querySelector(`.question-card[data-idx="${idx+1}"]`);
      if (next) next.scrollIntoView({behavior:"smooth", block:"start"});
      else showFinalScore();
    }, 700);
  }
  if (lockedQuestions.size === QCM_DATA.questions.length) setTimeout(showFinalScore, 800);
}

function submitAll() {
  QCM_DATA.questions.forEach((q, idx) => { if (!lockedQuestions.has(idx)) lockAndShow(idx); });
  document.getElementById("submitAllBtn").style.display = "none";
  updateProgress();
  showFinalScore();
}

function updateProgress() {
  const total = QCM_DATA.questions.length;
  document.getElementById("qCurrent").textContent = lockedQuestions.size;
  document.getElementById("liveScore").textContent = score;
  document.getElementById("progressFill").style.width = (100*lockedQuestions.size/total) + "%";
}

function showFinalScore() {
  const total = QCM_DATA.questions.length;
  const pct = Math.round(100*score/total);
  document.getElementById("finalScore").textContent = score;
  document.getElementById("finalPct").textContent = pct;
  let msg;
  if (pct >= 80) msg = "Excellent ! Tu maîtrises bien cette fiche, tu es prêt·e pour le partiel sur ce sujet.";
  else if (pct >= 60) msg = "Bon niveau, relis les questions ratées pour consolider.";
  else if (pct >= 40) msg = "Pas mal, mais il faut retravailler la fiche avant le partiel. Reviens-y dans quelques jours !";
  else msg = "Cette fiche n'est pas encore acquise — relis-la attentivement et refais le QCM.";
  document.getElementById("finalMsg").textContent = msg;
  document.getElementById("finalCard").classList.add("visible");
  setTimeout(() => document.getElementById("finalCard").scrollIntoView({behavior:"smooth", block:"center"}), 300);
}

setupIntro();
