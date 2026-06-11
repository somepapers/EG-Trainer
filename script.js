/* ============================================
   EG Trainer — script.js
   二阶EG法公式训练工具 — 全部业务逻辑
   ============================================ */

// ==================== 公式数据 ====================
const DATA = {

EG0: {
  H_show_correct: [
    "F R2 U' R2 U' R2 U R2 F'",
    "R U R' U R U R' F R' F' R",
    "F R U R' U' R U R' U' R U R' U' F'",
    "R2 U2 R' U2 R2"
  ],
  Pi_show_correct: [
    "F R' F' R U2 R U' R' U R U2 R'",
    "R U2 R' U' R U R' U2 R' F R F'",
    "F R2 U' R2 U R2 U R2 F'",
    "R U' R' F R' F R U R' F R",
    "R2 U R' U' F R F' R U' R2",
    "F R U R' U' R U R' U' F'"
  ],
  T_show_correct: [
    "R U R' U' R' F R F'",
    "R' F' R U R U' R' F",
    "F U' R U2 R' U' F2 R U R'",
    "R' U R U2 R2 F' R U' R' F2 R2",
    "F R U R' U' R U' R' U' R U R' F'",
    "R' U R U2 R2 F R F' R"
  ],
  L_show_correct: [
    "R U2 R' F' R U2 R' U R' F2 R",
    "R U2 R2 F2 R U R' F2 R F'",
    "R' U R' U2 R U' R' U R U' R2",
    "R U2 R2 F R F' R U2 R'",
    "F R' F' R U R U' R'",
    "F' R U R' U' R' F R"
  ],
  U_show_correct: [
    "F R U R' U' F'",
    "R' U' R2 U R' U2 R U2 R' U R'",
    "F R U R' U2 F' R U' R' F",
    "F R U' R' U R U R' U R U' R' F'",
    "R U' R2 F R F' R U R' U' R U R'",
    "R' U R' F R F' R U2 R' U R"
  ],
  S_show_correct: [
    "R' F2 R U2 R U' R' F",
    "R U2 R' F R U2 R' U R U' R' F",
    "R U' R' F R' F' R",
    "F R' F' R U2 R U2 R'",
    "R U R' U R' F R F' R U2 R'",
    "R U R' U R U2 R'"
  ],
  AS_show_correct: [
    "R U2 R' U' R U' R'",
    "R U2 R' F R' F' R U' R U' R'",
    "F' R U R' U2 R' F2 R",
    "R' F R F' R U R'",
    "R U2 R' F2 R' F R U'",
    "R2 F' U' R2 F' R2 U F R2"
  ],
  H_cases: [
    {name:"H1",algs:["F R2 U' R2 U' R2 U R2 F'","F R U' R' U R U2 R' U' R U R' U' F'","F R U R' U' R F' R U R' U' R'"]},
    {name:"H2",algs:["R U R' U R U R' F R' F' R","R' F' R U' R' F' R F' R U R'"]},
    {name:"H3",algs:["F R U R' U' R U R' U' R U R' U' F'","R U' R' F R' F' R2 U' R' F R' F' R","R2 F' U2 F2 R2 F' R2"]},
    {name:"H4",algs:["R2 U2 R' U2 R2","R U R' U R U' R' U R U2 R'","R U2 R' U' R U R' U' R U' R'"]}
  ],
  Pi_cases: [
    {name:"Pi1",algs:["F R' F' R U2 R U' R' U R U2 R'","R' F2 R F' U2 R U' R' U' F","U F U R U' R' U R U' R2 F' R U R U' R'"]},
    {name:"Pi2",algs:["R U2 R' U' R U R' U2 R' F R F'","F' R U R' U2 R' F R U' R' F2 R","R U R' U' R' F R2 U R' U' R U R' U' F'","R2 U' R' U' F R2 U2 F' R2 F"]},
    {name:"Pi3",algs:["F R2 U' R2 U R2 U R2 F'","R U' R U' R' U R' F R2 F'","U' R' F R U F U' R U R' U' F'"]},
    {name:"Pi4",algs:["R U' R' F R' F R U R' F R","R' F R F' R U' R' U' R U' R'"]},
    {name:"Pi5",algs:["R2 U R' U' F R F' R U' R2","R' U' R' F R F' R U' R' U2 R","U' R' U' R' F R F' R U' R' U2 R"]},
    {name:"Pi6",algs:["F R U R' U' R U R' U' F'","R U' R2 U R2 U R2 U' R","R' U R2 U' R2 U' R2 U R'","R U2 R2 U' R2 U' R2 U2 R"]}
  ],
  T_cases: [
    {name:"T1",algs:["R U R' U' R' F R F'","R' U' R U F R F'"]},
    {name:"T2",algs:["R' F' R U R U' R' F","F R U' R' U R U R' F'"]},
    {name:"T3",algs:["F U' R U2 R' U' F2 R U R'","R U2 R2 F R F' R U' R' U R U2 R'","R U F R' F' R U2 R U2 R2"]},
    {name:"T4",algs:["R' U R U2 R2 F' R U' R' F2 R2","R' U R' F U' R U F2 R2","R' U R' U2 R U2 R' U R2 U' R'"]},
    {name:"T5",algs:["F R U R' U' R U' R' U' R U R' F'","R U R' U' R U' R' F' U' F R U R'","R U R' U2 R U R' U R' F R F'"]},
    {name:"T6",algs:["R' U R U2 R2 F R F' R","R' F R U2 R2 F R U' R"]}
  ],
  L_cases: [
    {name:"L1",algs:["R U2 R' F' R U2 R' U R' F2 R","R' U' R U2 R' F R' F' R U' R","U' R U R' U R' F R F' U2 R' F R F'"]},
    {name:"L2",algs:["R U2 R2 F2 R U R' F2 R F'","R U' R' U R U' R' F R' F' R2 U R'","R' U2 R' U' F R2 F' U R2"]},
    {name:"L3",algs:["R' U R' U2 R U' R' U R U' R2","R2 U' R U2 R' U2 R U' R2","R U' R U' R U2 R' U R' U R'"]},
    {name:"L4",algs:["R U2 R2 F R F' R U2 R'","R U2 R' F R' F' R2 U2 R'","R' U' R U R' F' R U R' U' R' F R2"]},
    {name:"L5",algs:["F R' F' R U R U' R'","F' U R U' R' F2 R U' R'"]},
    {name:"L6",algs:["F' R U R' U' R' F R","R U R U' R' F R' F'","R' F R U F U' F'"]}
  ],
  U_cases: [
    {name:"U1",algs:["F R U R' U' F'","R' F' U' F U R","R' U' F R' F' R U R"]},
    {name:"U2",algs:["R' U' R2 U R' U2 R U2 R' U R'","R' F U' R U' R' U2 F2 R","R2 F2 R U R' F U' R U R2"]},
    {name:"U3",algs:["F R U R' U2 F' R U' R' F","R U2 R U' R' F R' F2 U' F"]},
    {name:"U4",algs:["F R U' R' U R U R' U R U' R' F'","R2 F R F' R' F2 R U R' F R2","F R' F' R U' R U' R' U2 R U' R'"]},
    {name:"U5",algs:["R U' R2 F R F' R U R' U' R U R'","R U2 R' U R' F2 R F' R' F2 R"]},
    {name:"U6",algs:["R' U R' F R F' R U2 R' U R","R F' U' R' U' R2 U R' U' R' F R"]}
  ],
  S_cases: [
    {name:"S1",algs:["R' F2 R U2 R U' R' F"]},
    {name:"S2",algs:["R U2 R' F R U2 R' U R U' R' F","R2 F' U' R2 F R2 U F R2","R U R' U' R' F R F' R U R' U R U2 R'"]},
    {name:"S3",algs:["R U' R' F R' F' R"]},
    {name:"S4",algs:["F R' F' R U2 R U2 R'","R U' R' F R' F2 R U R U' R' F"]},
    {name:"S5",algs:["R U R' U R' F R F' R U2 R'","R' F R2 F' U' R' U' R2 U R'","U2 R U R' U R' F R F' R U2 R'"]},
    {name:"S6",algs:["R U R' U R U2 R'","R U R2 U' R2 U R","R' U2 R U R' U R"]}
  ],
  AS_cases: [
    {name:"AS1",algs:["R U2 R' U' R U' R'","R' U' R U' R' U2 R"]},
    {name:"AS2",algs:["R U2 R' F R' F' R U' R U' R'","R' U R U' R2 F R F' R U R' U' R"]},
    {name:"AS3",algs:["F' R U R' U2 R' F2 R"]},
    {name:"AS4",algs:["R' F R F' R U R'"]},
    {name:"AS5",algs:["R U2 R' F2 R' F R U'","R U2 R' U2 R' F R F'"]},
    {name:"AS6",algs:["R2 F' U' R2 F' R2 U F R2","R U R2 F' R F R U' R2 F R","R2 F R U2 R U' R' U2 F' R"]}
  ]
},

EG1: {
  H_show_correct: [
    "R' F R2 U' R' F R U R' F'",
    "F' U R U' R2 F2 R U' F",
    "R' F R F' U2 F R U2 R' F",
    "R U R' F' R U R' U' R U R'"
  ],
  Pi_show_correct: [
    "F2 R U R' U2 R U R' U' F",
    "R' F R2 U' R2 F R",
    "F R' F U' F2 R U R",
    "R U' R' U R U' R' F R U' R'",
    "R U R' U R U' R2 F' R F R' F' R",
    "L' U' L U' L' U L2 F L' F' L F L'"
  ],
  T_show_correct: [
    "F L F' L2 U' L U L' U' L",
    "F' R' F R2 U R' U' R U R'",
    "R U' R2 F R U R U2 R'",
    "R U' R' F' U' F R' F' R F",
    "R U R2 F' R F R' F' R",
    "R U' R' U2 F R U2 R' F"
  ],
  L_show_correct: [
    "R U' R' U R U' R2 F' R F",
    "L' U L U' L' U L2 F L' F'",
    "R' U R2 U' R2 U' F R2 U' R'",
    "R U2 R' F R U' R2 F' R",
    "R U R' F' R U R' U' F R' F' R",
    "L' U' L F L' U' L U F' L F L'"
  ],
  U_show_correct: [
    "R U' R2 F R2 U R' U' R U' R'",
    "R U' R' U R U' R' F R U2 R' F R' F' R",
    "R U' R2 F2 R F' U R U R'",
    "R' F R F' R' F R2 U' R'",
    "R U' R' U R U' R' U R' F' R F",
    "L' U L U' L' U L U' L F L' F'"
  ],
  S_show_correct: [
    "R U R' U F R U' R2 F' R",
    "F R' F' R F R U' R' U R' F' R",
    "F R' F' R U R' F' R2 U R'",
    "F' R' F R2 U R' U' F R' F' R",
    "R U2 R' U R' F' R F R' F R",
    "R' F R2 U' R' U R U' R' F"
  ],
  AS_show_correct: [
    "R' F R2 U R' F' U' R U' R'",
    "R' F R U' R U R' F' R' F R F'",
    "F' R U R' U' R U R2 F' R",
    "R' F R F' U R U' R2 F' R F",
    "R' F2 R U' R U R' F' R U' R'",
    "R U' R2 F R U' R' F R F'"
  ],
  H_cases: [
    {name:"H1",algs:["F' R' F R F R' F' R2 U R'","R U' R2 F R F' R' F' R F","R' F R2 U' R' F R U R' F'","F R U' R' F' R U R2 F' R"]},
    {name:"H2",algs:["F' U R U' R2 F2 R U' F","R U' R' U' R U' R2 F2 R U R U R'","F U' R' F R2 U2 R' U F'"]},
    {name:"H3",algs:["R' F R F' U2 F R U2 R' F","R' U' R' F2 U F' R F'","R U' R' F U2 F' R' F2 R F'"]},
    {name:"H4",algs:["R U R' F' R U R' U' R U R'","F2 U' R U R2 F' R U' F","R' F R F' R' F R U' R' F R F'","F' R' F R U2 R U R' U' R U R'","F2 U R' F' R2 U R' U F'"]}
  ],
  Pi_cases: [
    {name:"Pi1",algs:["F U' R' F R U' F2 R U R'"]},
    {name:"Pi2",algs:["R U R2 F' R2 U R'","R U' R2 F R2 U' R'"]},
    {name:"Pi3",algs:["F' R U2 R' F' U2 F R' F' R"]},
    {name:"Pi4",algs:["R' F R U' R' F R F' R' F R","F' R U R' U' R U R' F' R U R'","F R' F' R U R' F' R F R' F' R"]},
    {name:"Pi5",algs:["F R U' R' U' F' R U R2 F' R","F U' R U2 R' F' R U R' F'","F' R' F R F' R' F2 R U' F"]},
    {name:"Pi6",algs:["F R U' R' F R U2 R' U F'","F' U R' F2 R F R' F' R F","F' R' F R U F R' F' R2 U R'"]}
  ],
  T_cases: [
    {name:"T1",algs:["R U' R2 F R2 U R' U2 R' F R F'","R U2 R' U' R' F' R F R' F' R"]},
    {name:"T2",algs:["R U' R' U2 R U2 R' F R U' R'","R U R' F' U2 R U R' U' R U R'"]},
    {name:"T3",algs:["R U2 R' U' R' F' R2 U R'","R' F R2 U' R' U' R' F2 R","R' F2 R U R U R2 F' R"]},
    {name:"T4",algs:["R' F R F' U R U' R' U' R' F' R F"]},
    {name:"T5",algs:["R U2 R2 F R2 U' R' F' R U R'","R' F' R2 U R' F' R U R'","R' F2 R2 U' R2 F R F R' F' R"]},
    {name:"T6",algs:["F' R U2 R' F' U2 R U R'","R' F R U2 F' R' F2 R F'","F R' F2 R F U2 R' F' R"]}
  ],
  L_cases: [
    {name:"L1",algs:["R U R' F' R U2 R' U2 R U R'","R U' R' F R U' R' U' R' F2 R"]},
    {name:"L2",algs:["F' R' F R F R' F' R F R' F' R","R' F R F' R' F R U R U2 R'"]},
    {name:"L3",algs:["R U R2 F' U R2 U R2 U' R"]},
    {name:"L4",algs:["R' F R2 U R' F' R U2 R'","R' F2 R F' R' F R2 U R'"]},
    {name:"L5",algs:["R U R' F' R U R' U' F R' F' R","F' R' F R U' R U R' U' R U R'"]},
    {name:"L6",algs:["R' F' R F U' R' F' R U R' F' R","F R U' R' U R' F' R U R' F' R"]}
  ],
  U_cases: [
    {name:"U1",algs:["R U R' U R U' R2 F' R2 U R'","R U R2 F' R U' R U' R' U R U R'","R U' R' U' R U R' U R' F R2 U' R'"]},
    {name:"U2",algs:["R U R' F' U' R U R' U' F R' F' R","F' R' F R U R U R' U' F R' F' R"]},
    {name:"U3",algs:["R U' R' U' F R' F2 R2 U R'","F' U2 R U2 R' U2 F"]},
    {name:"U4",algs:["R U' R' F R U' R2 F R"]},
    {name:"U5",algs:["R' F R F' U R U' R' F R U' R'","R U' R' U R U' R' U' F R U' R'"]},
    {name:"U6",algs:["R U' R' F U' R' F R F' R' F R","R' F R U' R' F R U F' R' F R"]}
  ],
  S_cases: [
    {name:"S1",algs:["R U' R2 F' R F U R' F R"]},
    {name:"S2",algs:["R U R' F2 U F R U R'","F' R' F R U' R U R' U' F R' F' R","R' F' R F R' U2 R U' R2 F R2"]},
    {name:"S3",algs:["R' F R U2 R U' R2 F2 R F'"]},
    {name:"S4",algs:["F' U R U' R' U F R U R'","R U' R' F U' R' F R2 U R' F'","R' F' R U2 R U R' F' R U' R'"]},
    {name:"S5",algs:["F' R' F R2 U2 R U2 R U R'"]},
    {name:"S6",algs:["R' F' R U' F' R' F R2 U R'"]}
  ],
  AS_cases: [
    {name:"AS1",algs:["R' F' R U' F' R' F R2 U R'"]},
    {name:"AS2",algs:["R U' R' F' U' F2 R U' R'","F R U' R' U R' F' R U F' R U R'","F' U' F2 R' F2 R2 U R'"]},
    {name:"AS3",algs:["R U' R' U2 R U2 R2 F' R F"]},
    {name:"AS4",algs:["R U' R' F' U' R U R' U' F","F R U' R2 F' R U F' R U R'","R U R' F R U' R' U2 R' F R"]},
    {name:"AS5",algs:["F' R' F R U R U R' U' R U R'","R U F' R U R2 U' R U R'","R U R' U2 R' F' R F R' F R"]},
    {name:"AS6",algs:["R U R' F' U' R U R' U' R U R'"]}
  ]
}

};

// ==================== 运行时状态 ====================
let currentMode = "";
const CASE_KEYS = ["H","Pi","T","L","U","S","AS"];

let statsCase = {};
let lastHCase = "", lastPiCase = "", lastTCase = "", lastLCase = "";
let lastUCase = "", lastSCase = "", lastASCase = "";
let currentAlg = "", currentCase = "", currentScramble = "";
let lastSubCase = "";

// ==================== 工具函数 ====================
function invertAlg(alg) {
  return alg.split(" ").reverse().map(m => {
    if (m.includes("'")) return m.replace("'", "");
    if (m.includes("2")) return m;
    return m + "'";
  }).join(" ");
}

function percent(c, w) {
  const t = c + w;
  if (t === 0) return "0%";
  return (c / t * 100).toFixed(0) + "%";
}

function initStats() {
  statsCase = {};
  CASE_KEYS.forEach(c => statsCase[c] = { correct: 0, wrong: 0 });
}

/** 获取当前模式的数据 */
function D() { return DATA[currentMode]; }

// ==================== 页面导航 ====================
function startTraining(mode) {
  currentMode = mode;

  document.getElementById("page0").classList.add("hidden");
  document.getElementById("page1").classList.remove("hidden");

  document.getElementById("modeLabel").textContent = mode + " 模式";
  document.getElementById("modeLabel").className = "mode-badge " + mode.toLowerCase() + "-badge";
  document.getElementById("titleTrain").textContent = mode + " Training";
  document.getElementById("titleStats").textContent = mode + " Case统计";

  // 重置所有 checkbox 为选中
  document.querySelectorAll("#casebox input[type=checkbox]").forEach(b => b.checked = true);

  loadStats();
  updateStats();
  showPage(1);
  nextScramble();
}

function goHome() {
  document.getElementById("page1").classList.add("hidden");
  document.getElementById("page0").classList.remove("hidden");
  currentMode = "";
}

function showPage(n) {
  document.getElementById("trainPage").classList.toggle("hidden", n !== 1);
  document.getElementById("statsPage").classList.toggle("hidden", n !== 2);
  document.getElementById("navTrain").classList.toggle("active", n === 1);
  document.getElementById("navStats").classList.toggle("active", n === 2);
}

// ==================== 训练核心逻辑 ====================
function getSelectedCases() {
  return Array.from(
    document.getElementById("casebox").querySelectorAll("input:checked")
  ).map(b => b.value);
}

function nextScramble() {
  const selected = getSelectedCases();
  if (selected.length === 0) return;

  const d = D();
  let r, tries = 0;

  do {
    const c = selected[Math.floor(Math.random() * selected.length)];
    let chosen, alg;

    if (c === "H") {
      chosen = d.H_cases[Math.floor(Math.random() * d.H_cases.length)];
      alg = chosen.algs[Math.floor(Math.random() * chosen.algs.length)];
      lastHCase = chosen.name;
    } else if (c === "Pi") {
      chosen = d.Pi_cases[Math.floor(Math.random() * d.Pi_cases.length)];
      alg = chosen.algs[Math.floor(Math.random() * chosen.algs.length)];
      lastPiCase = chosen.name;
    } else if (c === "T") {
      chosen = d.T_cases[Math.floor(Math.random() * d.T_cases.length)];
      alg = chosen.algs[Math.floor(Math.random() * chosen.algs.length)];
      lastTCase = chosen.name;
    } else if (c === "L") {
      chosen = d.L_cases[Math.floor(Math.random() * d.L_cases.length)];
      alg = chosen.algs[Math.floor(Math.random() * chosen.algs.length)];
      lastLCase = chosen.name;
    } else if (c === "U") {
      chosen = d.U_cases[Math.floor(Math.random() * d.U_cases.length)];
      alg = chosen.algs[Math.floor(Math.random() * chosen.algs.length)];
      lastUCase = chosen.name;
    } else if (c === "S") {
      chosen = d.S_cases[Math.floor(Math.random() * d.S_cases.length)];
      alg = chosen.algs[Math.floor(Math.random() * chosen.algs.length)];
      lastSCase = chosen.name;
    } else if (c === "AS") {
      chosen = d.AS_cases[Math.floor(Math.random() * d.AS_cases.length)];
      alg = chosen.algs[Math.floor(Math.random() * chosen.algs.length)];
      lastASCase = chosen.name;
    }

    r = { case: c, alg: alg, name: chosen.name };
    tries++;
  } while (r.name === lastSubCase && tries < 20);

  currentAlg = r.alg;
  currentCase = r.case;
  currentScramble = invertAlg(r.alg);
  lastSubCase = r.name;

  document.getElementById("shape").textContent = "形状: " + r.case;
  document.getElementById("scramble").textContent = currentScramble;
  setResult("", "");
}

function correct() {
  if (!currentCase) return;
  statsCase[currentCase].correct++;
  saveStats();
  setResult("蒸蚌 ✨", "result-success pulse");
  updateStats();
  setTimeout(nextScramble, 2500);
}

function wrong() {
  if (!currentCase) return;
  statsCase[currentCase].wrong++;
  saveStats();

  const d = D();
  let showAlg = currentAlg;

  if (currentCase === "H") {
    showAlg = d.H_show_correct[parseInt(lastHCase.replace("H", "")) - 1];
  } else if (currentCase === "Pi") {
    showAlg = d.Pi_show_correct[parseInt(lastPiCase.replace("Pi", "")) - 1];
  } else if (currentCase === "T") {
    showAlg = d.T_show_correct[parseInt(lastTCase.replace("T", "")) - 1];
  } else if (currentCase === "L") {
    showAlg = d.L_show_correct[parseInt(lastLCase.replace("L", "")) - 1];
  } else if (currentCase === "U") {
    showAlg = d.U_show_correct[parseInt(lastUCase.replace("U", "")) - 1];
  } else if (currentCase === "S") {
    showAlg = d.S_show_correct[parseInt(lastSCase.replace("S", "")) - 1];
  } else if (currentCase === "AS") {
    showAlg = d.AS_show_correct[parseInt(lastASCase.replace("AS", "")) - 1];
  }

  setResult("正确公式：\n" + showAlg + "\n菜就多练 💪", "result-fail");
  updateStats();
}

function setResult(text, className) {
  const el = document.getElementById("result");
  el.textContent = text;
  el.className = className;
}

function copyScramble() {
  if (!currentScramble) return;
  navigator.clipboard.writeText(currentScramble).then(() => {
    setResult("已复制 📋", "result-success");
    setTimeout(() => setResult("", ""), 1500);
  }).catch(() => {
    setResult("复制失败", "result-fail");
  });
}

// ==================== 统计 ====================
function updateStats() {
  let html = "";
  for (const c of CASE_KEYS) {
    const d = statsCase[c];
    html += `<tr>
      <td><strong>${c}</strong></td>
      <td>${d.correct}</td>
      <td>${d.wrong}</td>
      <td class="percent">${percent(d.correct, d.wrong)}</td>
    </tr>`;
  }
  document.getElementById("caseStats").innerHTML = html;
}

function saveStats() {
  localStorage.setItem(statsKey(), JSON.stringify(statsCase));
}

function loadStats() {
  const raw = localStorage.getItem(statsKey());
  if (raw) {
    statsCase = JSON.parse(raw);
  } else {
    initStats();
  }
}

function resetStats() {
  localStorage.removeItem(statsKey());
  initStats();
  updateStats();
}

function statsKey() {
  return currentMode.toLowerCase() + "_case";
}

// ==================== 键盘快捷键 ====================
document.addEventListener("keydown", function (e) {
  if (!currentMode) return;  // 不在训练模式中
  if (e.key === "ArrowRight" || e.key === "j") {
    e.preventDefault();
    correct();
  } else if (e.key === "ArrowLeft" || e.key === "k") {
    e.preventDefault();
    wrong();
  } else if (e.key === " " || e.key === "Spacebar") {
    e.preventDefault();
    nextScramble();
  } else if (e.key === "c" && !e.ctrlKey && !e.metaKey) {
    copyScramble();
  }
});
