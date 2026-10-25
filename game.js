/**
 * SENTINEL SOC — CompTIA Security+ (SY0-701) Cyber Defense & Exam Simulator
 * Core Game Loop, Canvas Telemetry Renderer, Spaced-Repetition Engine, Web Audio SFX & PBQ Labs
 */

(function () {
  "use strict";

  const STORAGE_KEY = "sentinel_soc_secplus_v1";

  // ==========================================================================
  // STATE & PERSISTENCE
  // ==========================================================================
  const defaultState = {
    credits: 150,
    integrity: 100,
    streak: 0,
    bestStreak: 0,
    audioEnabled: true,
    currentMode: "defense", // "defense" | "pbq" | "codex"
    domainFilter: "ALL",
    answeredMap: {}, // questionId -> { attempts, correct, lastCorrect }
    pbqCompleted: {}, // pbqId -> boolean
    domainStats: {
      "1.0": { correct: 0, total: 0 },
      "2.0": { correct: 0, total: 0 },
      "3.0": { correct: 0, total: 0 },
      "4.0": { correct: 0, total: 0 },
      "5.0": { correct: 0, total: 0 }
    }
  };

  let state = loadState();
  let questionQueue = [];
  let currentQuestion = null;
  let currentShuffledOptions = [];
  let isQuestionAnswered = false;
  let activePbqIndex = 0;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(defaultState);
      const parsed = JSON.parse(raw);
      return {
        ...structuredClone(defaultState),
        ...parsed,
        domainStats: { ...structuredClone(defaultState.domainStats), ...(parsed.domainStats || {}) }
      };
    } catch {
      return structuredClone(defaultState);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in private browsing
    }
  }

  // ==========================================================================
  // ZERO-ASSET WEB AUDIO SYNTHESIZER (TACTICAL SFX)
  // ==========================================================================
  let audioCtx = null;

  function playTone(type) {
    if (!state.audioEnabled) return;
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === "success") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.14); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc.start(now);
        osc.stop(now + 0.32);
      } else if (type === "breach") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(190, now);
        osc.frequency.linearRampToValueAtTime(115, now + 0.28);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "powerup") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch {
      // Ignore audio errors if blocked by browser autoplay policy
    }
  }

  // ==========================================================================
  // LIVE 60FPS HTML5 CANVAS NETWORK TOPOLOGY & THREAT RADAR
  // ==========================================================================
  const canvas = document.getElementById("socCanvas");
  const ctx = canvas.getContext("2d");

  const nodes = [
    { name: "Perimeter FW", x: 62, y: 125, radius: 16, color: "#38bdf8" },
    { name: "Web Gateway", x: 155, y: 55, radius: 15, color: "#a855f7" },
    { name: "Zero Trust PEP", x: 155, y: 195, radius: 15, color: "#10b981" },
    { name: "Auth / IdP", x: 255, y: 65, radius: 15, color: "#f59e0b" },
    { name: "Endpoint Fleet", x: 255, y: 185, radius: 15, color: "#38bdf8" },
    { name: "Internal App", x: 325, y: 60, radius: 15, color: "#a855f7" },
    { name: "Core DB", x: 325, y: 145, radius: 18, color: "#10b981" }
  ];

  const links = [
    [0, 1], [0, 2], [1, 3], [2, 4], [1, 5], [3, 6], [2, 6], [4, 6], [5, 6]
  ];

  let particles = [];
  let interceptPulses = [];
  let radarSweepAngle = 0;

  function spawnThreatParticle(statusType) {
    const targetName = currentQuestion ? currentQuestion.targetNode : "Core DB";
    const targetIdx = Math.max(0, nodes.findIndex(n => n.name === targetName));
    const target = nodes[targetIdx] || nodes[6];

    particles.push({
      x: 12,
      y: 30 + Math.random() * 190,
      tx: target.x,
      ty: target.y,
      progress: 0,
      speed: 0.008 + Math.random() * 0.006,
      color: statusType === "mitigated" ? "#10b981" : "#f43f5e"
    });
  }

  function triggerRadarBurst(color, targetName) {
    const target = nodes.find(n => n.name === targetName) || nodes[6];
    interceptPulses.push({
      x: target.x,
      y: target.y,
      r: 6,
      maxR: 58,
      alpha: 1,
      color
    });
  }

  function renderRadar() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Subtle tactical grid
    ctx.strokeStyle = "rgba(56, 189, 248, 0.06)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Subtle radar sweep in background
    radarSweepAngle = (radarSweepAngle + 0.015) % (Math.PI * 2);
    ctx.save();
    ctx.translate(190, 125);
    ctx.beginPath();
    ctx.arc(0, 0, 110, radarSweepAngle, radarSweepAngle + 0.45);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Draw topology edges
    ctx.lineWidth = 1.5;
    for (const [a, b] of links) {
      const na = nodes[a];
      const nb = nodes[b];
      ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
      ctx.beginPath();
      ctx.moveTo(na.x, na.y);
      ctx.lineTo(nb.x, nb.y);
      ctx.stroke();
    }

    // Spawn ambient attack telemetry packets
    if (Math.random() < 0.04 && particles.length < 10) {
      spawnThreatParticle(isQuestionAnswered ? "mitigated" : "attack");
    }

    // Update & draw packets
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.progress += p.speed;
      if (p.progress >= 1) {
        particles.splice(i, 1);
        continue;
      }
      const cx = p.x + (p.tx - p.x) * p.progress;
      const cy = p.y + (p.ty - p.y) * p.progress;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(cx, cy, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw nodes
    const activeTargetName = currentQuestion ? currentQuestion.targetNode : "Core DB";
    for (const node of nodes) {
      const isTarget = node.name === activeTargetName && !isQuestionAnswered;

      if (isTarget) {
        const pulse = 20 + Math.sin(Date.now() * 0.008) * 5;
        ctx.strokeStyle = "rgba(244, 63, 94, 0.55)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulse, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = "#0f172a";
      ctx.strokeStyle = isTarget ? "#f43f5e" : node.color;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "600 9.5px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText(node.name, node.x, node.y + node.radius + 12);
    }

    // Draw intercept/breach shockwaves
    for (let i = interceptPulses.length - 1; i >= 0; i--) {
      const pulse = interceptPulses[i];
      pulse.r += 1.8;
      pulse.alpha -= 0.032;
      if (pulse.alpha <= 0) {
        interceptPulses.splice(i, 1);
        continue;
      }
      ctx.strokeStyle = pulse.color;
      ctx.globalAlpha = Math.max(0, pulse.alpha);
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(pulse.x, pulse.y, pulse.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(renderRadar);
  }

  // ==========================================================================
  // QUESTION QUEUE & SPACED REPETITION PRIORITIZATION
  // ==========================================================================
  function buildQuestionQueue() {
    const allQuestions = window.SECPLUS_QUESTIONS || [];
    let filtered = allQuestions;

    if (state.domainFilter === "WEAK") {
      filtered = allQuestions.filter(q => {
        const record = state.answeredMap[q.id];
        if (!record) return true; // Unseen questions included
        return record.lastCorrect === false || (record.correct / record.attempts) < 0.75;
      });
      if (filtered.length === 0) filtered = allQuestions;
    } else if (state.domainFilter !== "ALL") {
      filtered = allQuestions.filter(q => q.domain === state.domainFilter);
    }

    // Sort with spaced repetition weighting:
    // 1. Previously missed questions first
    // 2. Unseen questions second
    // 3. Previously mastered questions last (with slight random jitter)
    const scored = filtered.map(q => {
      const rec = state.answeredMap[q.id];
      let priority = 1;
      if (!rec) {
        priority = 2; // Unseen
      } else if (!rec.lastCorrect) {
        priority = 3; // Missed recently -> highest priority
      } else {
        priority = 1; // Already mastered
      }
      return { q, score: priority + Math.random() * 0.85 };
    });

    scored.sort((a, b) => b.score - a.score);
    questionQueue = scored.map(item => item.q);
  }

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // ==========================================================================
  // HUD & DOMAIN MASTERY RENDERING
  // ==========================================================================
  function calculateExamScore() {
    let totalCorrect = 0;
    let totalAttempted = 0;
    for (const d of Object.values(state.domainStats)) {
      totalCorrect += d.correct;
      totalAttempted += d.total;
    }
    if (totalAttempted === 0) return 0;

    // CompTIA scale is 100–900 (750 passing). Scale dynamically by accuracy & coverage
    const uniqueAnswered = Object.keys(state.answeredMap).length;
    const totalBank = (window.SECPLUS_QUESTIONS || []).length;
    const coverageFactor = Math.min(1, uniqueAnswered / Math.max(10, totalBank * 0.6));
    const accuracy = totalCorrect / totalAttempted;
    const rawScore = Math.round(100 + (accuracy * 650) + (coverageFactor * accuracy * 150));
    return Math.min(900, rawScore);
  }

  function getAnalystRank(score) {
    if (score >= 820) return "CISO / Principal Architect";
    if (score >= 750) return "Sec+ Certified Lead (PASS)";
    if (score >= 600) return "L3 Threat Hunter";
    if (score >= 400) return "L2 Incident Responder";
    return "L1 SOC Analyst";
  }

  function updateHUD() {
    const examScore = calculateExamScore();
    document.getElementById("hudRank").textContent = getAnalystRank(examScore);
    const scoreEl = document.getElementById("hudScore");
    scoreEl.textContent = `${examScore} / 900`;
    scoreEl.className = "stat-value " + (examScore >= 750 ? "emerald" : examScore >= 600 ? "amber" : "cyan");

    document.getElementById("hudStreak").textContent = `${state.streak}x`;
    document.getElementById("hudCredits").textContent = `${state.credits} CR`;

    // Integrity bar
    const integrityEl = document.getElementById("integrityValue");
    const fillEl = document.getElementById("integrityFill");
    integrityEl.textContent = `${state.integrity}%`;
    fillEl.style.width = `${state.integrity}%`;
    if (state.integrity > 60) {
      fillEl.style.background = "linear-gradient(90deg, var(--accent-emerald), var(--accent-cyan))";
    } else if (state.integrity > 30) {
      fillEl.style.background = "linear-gradient(90deg, var(--accent-amber), #f97316)";
    } else {
      fillEl.style.background = "var(--accent-rose)";
    }

    // Countermeasure button states
    document.getElementById("btnCmFilter").disabled = isQuestionAnswered || state.credits < 50;
    document.getElementById("btnCmIntel").disabled = isQuestionAnswered || state.credits < 35;
    document.getElementById("btnCmPatch").disabled = state.integrity >= 100 || state.credits < 60;

    // Render Domain Mastery Bars
    const container = document.getElementById("domainMasteryList");
    container.innerHTML = "";
    for (const [domId, meta] of Object.entries(window.SECPLUS_DOMAINS)) {
      const st = state.domainStats[domId] || { correct: 0, total: 0 };
      const pct = st.total > 0 ? Math.round((st.correct / st.total) * 100) : 0;

      const row = document.createElement("div");
      row.className = "domain-row";
      row.innerHTML = `
        <div class="domain-row-top">
          <span class="domain-row-name">D${domId}: ${meta.name}</span>
          <span class="domain-row-pct">${st.correct}/${st.total} (${pct}%)</span>
        </div>
        <div class="domain-mini-track">
          <div class="domain-mini-fill" style="width: ${pct}%; background: ${meta.color};"></div>
        </div>
      `;
      container.appendChild(row);
    }
  }

  // ==========================================================================
  // INCIDENT MCQ PRESENTATION & EVALUATION
  // ==========================================================================
  function loadNextQuestion() {
    if (questionQueue.length === 0) {
      buildQuestionQueue();
    }
    currentQuestion = questionQueue.shift();
    if (!currentQuestion) return;

    isQuestionAnswered = false;
    const domMeta = window.SECPLUS_DOMAINS[currentQuestion.domain];

    // Update header badges
    const domBadge = document.getElementById("qDomainBadge");
    domBadge.textContent = `Domain ${currentQuestion.domain} (${domMeta ? domMeta.weight : ""})`;
    document.getElementById("qSubdomainBadge").textContent = currentQuestion.subdomain;
    document.getElementById("qDifficultyBadge").textContent = currentQuestion.difficulty;

    const totalCompleted = Object.keys(state.answeredMap).length;
    const totalCount = (window.SECPLUS_QUESTIONS || []).length;
    document.getElementById("qProgressCounter").textContent = `Mastered ${totalCompleted} of ${totalCount} Scenarios`;

    document.getElementById("qThreatName").textContent = currentQuestion.threatName;
    document.getElementById("qTargetNode").textContent = `Node: ${currentQuestion.targetNode}`;
    document.getElementById("activeTargetLabel").textContent = `TARGET: ${currentQuestion.targetNode.toUpperCase()}`;
    document.getElementById("radarStatusDot").className = "status-dot alert";

    document.getElementById("qPromptText").textContent = currentQuestion.question;
    document.getElementById("preAnswerIntelBox").classList.add("hidden");
    document.getElementById("qFeedbackBox").classList.add("hidden");
    document.getElementById("btnNextQuestion").textContent = "Skip / Next Incident →";

    // Shuffle options so the correct answer is evenly distributed across 1-4
    const indexedOptions = currentQuestion.options.map((text, idx) => ({
      text,
      isCorrect: idx === currentQuestion.correct
    }));
    currentShuffledOptions = shuffleArray(indexedOptions);

    const optionsList = document.getElementById("qOptionsList");
    optionsList.innerHTML = "";

    currentShuffledOptions.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      btn.dataset.index = i;
      btn.innerHTML = `
        <span class="option-key">${i + 1}</span>
        <span>${escapeHtml(opt.text)}</span>
      `;
      btn.addEventListener("click", () => handleSelectOption(i));
      optionsList.appendChild(btn);
    });

    updateHUD();
  }

  function handleSelectOption(selectedIndex) {
    if (isQuestionAnswered || !currentQuestion) return;
    isQuestionAnswered = true;

    const chosen = currentShuffledOptions[selectedIndex];
    const isCorrect = chosen.isCorrect;

    // Update option visual states
    const buttons = document.querySelectorAll("#qOptionsList .option-btn");
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (currentShuffledOptions[idx].isCorrect) {
        btn.classList.add("correct");
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add("wrong");
      }
    });

    // Update statistics & spaced repetition history
    const prevRec = state.answeredMap[currentQuestion.id] || { attempts: 0, correct: 0, lastCorrect: false };
    prevRec.attempts += 1;
    if (isCorrect) prevRec.correct += 1;
    prevRec.lastCorrect = isCorrect;
    state.answeredMap[currentQuestion.id] = prevRec;

    const domStat = state.domainStats[currentQuestion.domain] || { correct: 0, total: 0 };
    domStat.total += 1;

    if (isCorrect) {
      domStat.correct += 1;
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      const earnedCredits = 25 + Math.min(25, state.streak * 5);
      state.credits += earnedCredits;
      state.integrity = Math.min(100, state.integrity + 4);

      playTone("success");
      triggerRadarBurst("#10b981", currentQuestion.targetNode);
      document.getElementById("radarStatusDot").className = "status-dot";
      showFeedback(true, `THREAT MITIGATED (+${earnedCredits} CR • Streak ${state.streak}x)`);
    } else {
      state.streak = 0;
      state.integrity = Math.max(5, state.integrity - 15);
      playTone("breach");
      triggerRadarBurst("#f43f5e", currentQuestion.targetNode);
      showFeedback(false, "BREACH DETECTED — SLA Integrity Degraded (-15%)");
    }

    state.domainStats[currentQuestion.domain] = domStat;
    saveState();
    updateHUD();
    document.getElementById("btnNextQuestion").textContent = "Next Incident [Enter] →";
  }

  function showFeedback(isCorrect, headline) {
    const box = document.getElementById("qFeedbackBox");
    const header = document.getElementById("qFeedbackHeader");
    const explanation = document.getElementById("qExplanationText");
    const tip = document.getElementById("qExamTipText");

    box.className = `feedback-box ${isCorrect ? "correct" : "wrong"}`;
    header.style.color = isCorrect ? "var(--accent-emerald)" : "var(--accent-rose)";
    header.textContent = headline;
    explanation.textContent = currentQuestion.explanation;
    tip.innerHTML = `<strong>💡 CompTIA SY0-701 Exam Tip:</strong> ${escapeHtml(currentQuestion.examTip)}`;
  }

  // ==========================================================================
  // SOAR COUNTERMEASURES (POWER-UPS)
  // ==========================================================================
  function useDeepPacketFilter() {
    if (isQuestionAnswered || state.credits < 50) return;
    const buttons = Array.from(document.querySelectorAll("#qOptionsList .option-btn"));
    const wrongIndices = currentShuffledOptions
      .map((opt, idx) => ({ opt, idx }))
      .filter(item => !item.opt.isCorrect && !buttons[item.idx].classList.contains("eliminated"))
      .map(item => item.idx);

    if (wrongIndices.length < 2) return;
    state.credits -= 50;
    playTone("powerup");

    const toEliminate = shuffleArray(wrongIndices).slice(0, 2);
    toEliminate.forEach(idx => {
      buttons[idx].classList.add("eliminated");
      buttons[idx].disabled = true;
    });

    document.getElementById("cmHintStatus").textContent = "2 Distractors Filtered";
    saveState();
    updateHUD();
  }

  function useThreatIntelHint() {
    if (isQuestionAnswered || state.credits < 35 || !currentQuestion) return;
    const intelBox = document.getElementById("preAnswerIntelBox");
    if (!intelBox.classList.contains("hidden")) return;

    state.credits -= 35;
    playTone("powerup");
    intelBox.innerHTML = `<strong>🧠 SOAR Threat Intel Feed:</strong> ${escapeHtml(currentQuestion.examTip)}`;
    intelBox.classList.remove("hidden");
    document.getElementById("cmHintStatus").textContent = "Intel Decrypted";
    saveState();
    updateHUD();
  }

  function useHotfixPatch() {
    if (state.integrity >= 100 || state.credits < 60) return;
    state.credits -= 60;
    state.integrity = Math.min(100, state.integrity + 25);
    playTone("powerup");
    triggerRadarBurst("#38bdf8", "Core DB");
    document.getElementById("cmHintStatus").textContent = "+25% SLA Patched";
    saveState();
    updateHUD();
  }

  // ==========================================================================
  // INTERACTIVE PBQ SIMULATION LABS
  // ==========================================================================
  function renderPbqView() {
    const pbqs = window.SECPLUS_PBQS || [];
    const selectorBar = document.getElementById("pbqSelectorBar");
    const container = document.getElementById("pbqContainer");
    selectorBar.innerHTML = "";

    pbqs.forEach((pbq, idx) => {
      const done = state.pbqCompleted[pbq.id] ? "✅ " : "";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `filter-chip ${idx === activePbqIndex ? "active" : ""}`;
      btn.textContent = `${done}${pbq.title}`;
      btn.addEventListener("click", () => {
        activePbqIndex = idx;
        renderPbqView();
      });
      selectorBar.appendChild(btn);
    });

    const pbq = pbqs[activePbqIndex];
    if (!pbq) return;

    let labBodyHtml = "";

    if (pbq.type === "firewall") {
      labBodyHtml = `
        <table class="pbq-table">
          <thead>
            <tr>
              <th>Rule #</th>
              <th>Requirement</th>
              <th>Source IP</th>
              <th>Destination IP</th>
              <th>Port / Protocol</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${pbq.rules.map((r, i) => `
              <tr>
                <td style="font-family: var(--font-mono); font-weight:700;">#${r.ruleNum}</td>
                <td>${escapeHtml(r.description)}</td>
                <td style="font-family: var(--font-mono);">${escapeHtml(r.source)}</td>
                <td style="font-family: var(--font-mono);">${escapeHtml(r.dest)}</td>
                <td>
                  <select class="pbq-select" id="fw_port_${i}">
                    <option value="">-- Select Port --</option>
                    ${r.portOptions.map(p => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`).join("")}
                  </select>
                </td>
                <td>
                  <select class="pbq-select" id="fw_act_${i}">
                    <option value="">-- Action --</option>
                    ${r.actionOptions.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join("")}
                  </select>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (pbq.type === "log_triage") {
      labBodyHtml = pbq.logs.map((log, i) => `
        <div class="log-card">
          <div style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);">
            SOURCE ARTIFACT: ${escapeHtml(log.source)}
          </div>
          <code class="log-code">${escapeHtml(log.snippet)}</code>
          <div class="log-controls">
            <div>
              <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.25rem;">Identify Attack Vector:</label>
              <select class="pbq-select" id="log_atk_${i}">
                <option value="">-- Classify Attack --</option>
                ${log.attackOptions.map(a => `<option value="${escapeHtml(a)}">${escapeHtml(a)}</option>`).join("")}
              </select>
            </div>
            <div>
              <label style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:0.25rem;">Select Primary Remediation:</label>
              <select class="pbq-select" id="log_rem_${i}">
                <option value="">-- Select RemediationControl --</option>
                ${log.remediationOptions.map(r => `<option value="${escapeHtml(r)}">${escapeHtml(r)}</option>`).join("")}
              </select>
            </div>
          </div>
        </div>
      `).join("");
    } else if (pbq.type === "architecture_match") {
      labBodyHtml = pbq.items.map((item, i) => `
        <div class="log-card">
          <p style="font-size: 0.9rem; margin-bottom: 0.65rem;">${escapeHtml(item.prompt)}</p>
          <select class="pbq-select" id="arch_item_${i}">
            <option value="">-- Select Matching Standard / Protocol --</option>
            ${item.options.map(o => `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join("")}
          </select>
        </div>
      `).join("");
    }

    container.innerHTML = `
      <div class="incident-meta">
        <div class="badge-row">
          <span class="domain-badge">Domain ${pbq.domain} PBQ</span>
          <span class="subdomain-badge">${escapeHtml(pbq.threatName)}</span>
        </div>
      </div>
      <h2 style="font-size: 1.15rem; margin-bottom: 0.65rem;">${escapeHtml(pbq.title)}</h2>
      <div class="question-prompt" style="font-size: 0.94rem;">${escapeHtml(pbq.briefing)}</div>
      ${labBodyHtml}
      <div id="pbqResultBox" class="feedback-box hidden"></div>
      <div class="action-footer">
        <span style="font-size: 0.8rem; color: var(--text-muted);">Reward: +100 SOC Credits &amp; Domain Mastery Boost</span>
        <button type="button" class="primary-btn" id="btnVerifyPbq">Verify Configuration &amp; Deploy</button>
      </div>
    `;

    document.getElementById("btnVerifyPbq").addEventListener("click", () => evaluatePbq(pbq));
  }

  function evaluatePbq(pbq) {
    let correctCount = 0;
    let totalChecks = 0;

    if (pbq.type === "firewall") {
      pbq.rules.forEach((r, i) => {
        totalChecks += 2;
        const portVal = document.getElementById(`fw_port_${i}`).value;
        const actVal = document.getElementById(`fw_act_${i}`).value;
        if (portVal === r.correctPort) correctCount++;
        if (actVal === r.correctAction) correctCount++;
      });
    } else if (pbq.type === "log_triage") {
      pbq.logs.forEach((log, i) => {
        totalChecks += 2;
        const atkVal = document.getElementById(`log_atk_${i}`).value;
        const remVal = document.getElementById(`log_rem_${i}`).value;
        if (atkVal === log.correctAttack) correctCount++;
        if (remVal === log.correctRemediation) correctCount++;
      });
    } else if (pbq.type === "architecture_match") {
      pbq.items.forEach((item, i) => {
        totalChecks += 1;
        const val = document.getElementById(`arch_item_${i}`).value;
        if (val === item.correct) correctCount++;
      });
    }

    const passed = correctCount === totalChecks;
    const resBox = document.getElementById("pbqResultBox");
    resBox.className = `feedback-box ${passed ? "correct" : "wrong"}`;

    if (passed) {
      playTone("success");
      triggerRadarBurst("#10b981", "Perimeter FW");
      if (!state.pbqCompleted[pbq.id]) {
        state.pbqCompleted[pbq.id] = true;
        state.credits += 100;
        state.domainStats[pbq.domain].correct += 2;
        state.domainStats[pbq.domain].total += 2;
        saveState();
      }
      resBox.innerHTML = `
        <div class="feedback-header" style="color: var(--accent-emerald);">
          ✅ PBQ VALIDATED (${correctCount}/${totalChecks} Checks Passed • +100 CR)
        </div>
        <div class="feedback-text">${escapeHtml(pbq.explanation)}</div>
      `;
    } else {
      playTone("breach");
      resBox.innerHTML = `
        <div class="feedback-header" style="color: var(--accent-rose);">
          ⚠️ CONFIGURATION INCOMPLETE (${correctCount}/${totalChecks} Checks Correct)
        </div>
        <div class="feedback-text">Review each requirement carefully and verify ports, protocols, and least-privilege actions before redeploying.</div>
      `;
    }
    updateHUD();
  }

  // ==========================================================================
  // ACRONYM & PORT CODEX
  // ==========================================================================
  function renderCodex(query = "") {
    const grid = document.getElementById("codexGrid");
    const items = window.SECPLUS_REFERENCE || [];
    const normalized = query.trim().toLowerCase();

    const filtered = items.filter(item => {
      const matchesDomain = state.domainFilter === "ALL" || state.domainFilter === "WEAK" || item.domain === state.domainFilter;
      const matchesQuery = !normalized ||
        item.term.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized) ||
        item.desc.toLowerCase().includes(normalized);
      return matchesDomain && matchesQuery;
    });

    grid.innerHTML = filtered.map(item => `
      <article class="codex-item">
        <div class="codex-item-top">
          <span class="codex-term">${escapeHtml(item.term)}</span>
          <span class="subdomain-badge">D${escapeHtml(item.domain)} • ${escapeHtml(item.category)}</span>
        </div>
        <p class="codex-desc">${escapeHtml(item.desc)}</p>
      </article>
    `).join("");
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  // ==========================================================================
  // EVENT LISTENERS & KEYBOARD SHORTCUTS
  // ==========================================================================
  function switchMode(mode) {
    state.currentMode = mode;
    document.querySelectorAll(".mode-tabs .tab-btn").forEach(btn => {
      const active = btn.dataset.mode === mode;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", String(active));
    });

    document.getElementById("viewDefense").classList.toggle("hidden", mode !== "defense");
    document.getElementById("viewPbq").classList.toggle("hidden", mode !== "pbq");
    document.getElementById("viewCodex").classList.toggle("hidden", mode !== "codex");

    if (mode === "pbq") renderPbqView();
    if (mode === "codex") renderCodex(document.getElementById("codexSearchInput").value);
  }

  function initEvents() {
    // Mode tabs
    document.querySelectorAll(".mode-tabs .tab-btn").forEach(btn => {
      btn.addEventListener("click", () => switchMode(btn.dataset.mode));
    });

    // Domain filter chips
    document.querySelectorAll("#domainFilterBar .filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        state.domainFilter = chip.dataset.domain;
        document.querySelectorAll("#domainFilterBar .filter-chip").forEach(c => {
          c.classList.toggle("active", c === chip);
        });
        buildQuestionQueue();
        if (state.currentMode === "defense") {
          loadNextQuestion();
        } else if (state.currentMode === "codex") {
          renderCodex(document.getElementById("codexSearchInput").value);
        }
      });
    });

    // Next Question Button
    document.getElementById("btnNextQuestion").addEventListener("click", loadNextQuestion);

    // SOAR Countermeasure Buttons
    document.getElementById("btnCmFilter").addEventListener("click", useDeepPacketFilter);
    document.getElementById("btnCmIntel").addEventListener("click", useThreatIntelHint);
    document.getElementById("btnCmPatch").addEventListener("click", useHotfixPatch);

    // Codex live search
    document.getElementById("codexSearchInput").addEventListener("input", e => {
      renderCodex(e.target.value);
    });

    // Audio Toggle
    const btnAudio = document.getElementById("btnAudioToggle");
    btnAudio.addEventListener("click", () => {
      state.audioEnabled = !state.audioEnabled;
      btnAudio.setAttribute("aria-pressed", String(state.audioEnabled));
      document.getElementById("audioIcon").textContent = state.audioEnabled ? "🔊" : "🔇";
      saveState();
    });

    // Native <dialog> Modal
    const helpDialog = document.getElementById("helpDialog");
    document.getElementById("btnHelpModal").addEventListener("click", () => {
      helpDialog.showModal();
    });
    document.getElementById("btnCloseDialog").addEventListener("click", () => {
      helpDialog.close();
    });
    helpDialog.addEventListener("click", e => {
      const rect = helpDialog.getBoundingClientRect();
      const clickedInDialog =
        rect.top <= e.clientY && e.clientY <= rect.bottom &&
        rect.left <= e.clientX && e.clientX <= rect.right;
      if (!clickedInDialog) helpDialog.close();
    });

    // Reset telemetry button
    document.getElementById("btnResetStats").addEventListener("click", () => {
      if (confirm("Reset all CompTIA Security+ progress, domain stats, and SOC credits?")) {
        state = structuredClone(defaultState);
        saveState();
        buildQuestionQueue();
        loadNextQuestion();
      }
    });

    // Global Keyboard Shortcuts (1-4, Enter/Space, F, T, R)
    window.addEventListener("keydown", e => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || helpDialog.open) return;
      if (state.currentMode !== "defense") return;

      if (["1", "2", "3", "4"].includes(e.key) && !isQuestionAnswered) {
        const idx = parseInt(e.key, 10) - 1;
        const btn = document.querySelectorAll("#qOptionsList .option-btn")[idx];
        if (btn && !btn.disabled) {
          e.preventDefault();
          handleSelectOption(idx);
        }
      } else if ((e.key === "Enter" || e.key === " ") && isQuestionAnswered) {
        e.preventDefault();
        loadNextQuestion();
      } else if (e.key.toLowerCase() === "f") {
        useDeepPacketFilter();
      } else if (e.key.toLowerCase() === "t") {
        useThreatIntelHint();
      } else if (e.key.toLowerCase() === "r") {
        useHotfixPatch();
      }
    });
  }

  // Boot the SOC simulator
  initEvents();
  buildQuestionQueue();
  loadNextQuestion();
  renderCodex();
  requestAnimationFrame(renderRadar);
})();
