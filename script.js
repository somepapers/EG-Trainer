/* ============================================
   EG-Trainer — script.js
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
},

EG2: {
  // EG-2: 底层对角交换, 5组34条公式
  S_show_correct: [
    "F U' R2 U' R' U2 R U' R2 F'",
    "R U R' U R U2 R B2 R2",
    "R U' R' F R F' R' F2 R2",
    "F R' F' R U2 R U2 R B2 R2'",
    "L' U2 L U2 L F' L' F R2 B2",
    "R2 B2 R' U' L' U R' U' L"
  ],
  AS_show_correct: [
    "R' U R U' R2 F R F' R U R' U' R' F2 R2",
    "R' U' R U R' U2 R' F2 R2",
    "L' U L F' R U R B2 R2'",
    "F' L F L' U2 R' F2 R' F2 R2",
    "R U2 R' U2 R' F R F R2 B2",
    "R2 F2 R F R F' R U R'"
  ],
  Pi_show_correct: [
    "F U' R U2 R U' R' U R' F'",
    "R' U2' R2 U' R' F2 R2 F'",
    "R' F' U R' F R2 U2 R' U R",
    "R' F U R U' R' F2 U2' R",
    "R' U' R' F2 R2 U R' F2 R",
    "R' U2 R U R2 F2 R F R"
  ],
  U_show_correct: [
    "R' U R' F U' R U R' U R2",
    "F U R U2 R U R' U2 R' U F'",
    "F R U R' U' F R2 F2",
    "R' U F R F' R U R F2 R2",
    "R U R' U' R B2 R' U R U' R'",
    "R2' F2 R U R U2' R2' F R F' R",
    "R U' R' U2 L U L' U2 R' U R'",
    "R2 B2 R U R' U R' F R F",
    "L' U L U2 R' U' R U2 L' U L",
    "R2' F2 R F' R U L F' L' F"
  ],
  L_show_correct: [
    "R2 B2 R2 F R' F' R U R' F'",
    "R2 B2 R2' F R U R' F'",
    "R' U' F2 R U2 R' U2 F R",
    "R' U R U' R' F R U R' F'",
    "F R' F' R U R' F",
    "F' R U R' F"
  ],
  S_cases: [
    {name:"S1",algs:["F U' R2 U' R' U2 R U' R2 F'"]},
    {name:"S2",algs:["R U R' U R U2 R B2 R2"]},
    {name:"S3",algs:["R U' R' F R F' R' F2 R2"]},
    {name:"S4",algs:["F R' F' R U2 R U2 R B2 R2'"]},
    {name:"S5",algs:["L' U2 L U2 L F' L' F R2 B2"]},
    {name:"S6",algs:["R2 B2 R' U' L' U R' U' L"]}
  ],
  AS_cases: [
    {name:"AS1",algs:["R' U R U' R2 F R F' R U R' U' R' F2 R2"]},
    {name:"AS2",algs:["R' U' R U R' U2 R' F2 R2"]},
    {name:"AS3",algs:["L' U L F' R U R B2 R2'"]},
    {name:"AS4",algs:["F' L F L' U2 R' F2 R' F2 R2"]},
    {name:"AS5",algs:["R U2 R' U2 R' F R F R2 B2"]},
    {name:"AS6",algs:["R2 F2 R F R F' R U R'"]}
  ],
  Pi_cases: [
    {name:"Pi1",algs:["F U' R U2 R U' R' U R' F'"]},
    {name:"Pi2",algs:["R' U2' R2 U' R' F2 R2 F'"]},
    {name:"Pi3",algs:["R' F' U R' F R2 U2 R' U R"]},
    {name:"Pi4",algs:["R' F U R U' R' F2 U2' R"]},
    {name:"Pi5",algs:["R' U' R' F2 R2 U R' F2 R"]},
    {name:"Pi6",algs:["R' U2 R U R2 F2 R F R"]}
  ],
  U_cases: [
    {name:"U1",algs:["R' U R' F U' R U R' U R2"]},
    {name:"U2",algs:["F U R U2 R U R' U2 R' U F'"]},
    {name:"U3",algs:["F R U R' U' F R2 F2"]},
    {name:"U4",algs:["R' U F R F' R U R F2 R2"]},
    {name:"U5",algs:["R U R' U' R B2 R' U R U' R'"]},
    {name:"U6",algs:["R2' F2 R U R U2' R2' F R F' R"]},
    {name:"U7",algs:["R U' R' U2 L U L' U2 R' U R'"]},
    {name:"U8",algs:["R2 B2 R U R' U R' F R F"]},
    {name:"U9",algs:["L' U L U2 R' U' R U2 L' U L"]},
    {name:"U10",algs:["R2' F2 R F' R U L F' L' F"]}
  ],
  L_cases: [
    {name:"L1",algs:["R2 B2 R2 F R' F' R U R' F'"]},
    {name:"L2",algs:["R2 B2 R2' F R U R' F'"]},
    {name:"L3",algs:["R' U' F2 R U2 R' U2 F R"]},
    {name:"L4",algs:["R' U R U' R' F R U R' F'"]},
    {name:"L5",algs:["F R' F' R U R' F"]},
    {name:"L6",algs:["F' R U R' F"]}
  ]
}

};

// ==================== 模式配置 ====================
const MODE_CASE_KEYS = {
  EG0: ["H","Pi","T","L","U","S","AS"],
  EG1: ["H","Pi","T","L","U","S","AS"],
  EG2: ["S","AS","Pi","U","L"]
};

// ==================== 运行时状态 ====================
let currentMode = "";
function caseKeys() { return MODE_CASE_KEYS[currentMode] || []; }

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

/** 生成WCA标准的二阶魔方打乱公式（随机步数法） */
function generateWCAScramble() {
  const faces = [
    { name: 'R', axis: 0 },
    { name: 'U', axis: 1 },
    { name: 'F', axis: 2 },
  ];
  const mods = ['', "'", '2'];
  const length = 9; // WCA 二阶标准 9 步

  let moves = [];
  let lastAxis = -1;

  for (let i = 0; i < length; i++) {
    let f;
    do {
      f = faces[Math.floor(Math.random() * faces.length)];
    } while (f.axis === lastAxis);
    lastAxis = f.axis;

    let mod = mods[Math.floor(Math.random() * mods.length)];
    moves.push(f.name + mod);
  }

  return moves.join(' ');
}

function percent(c, w) {
  const t = c + w;
  if (t === 0) return "0%";
  return (c / t * 100).toFixed(0) + "%";
}

function initStats() {
  statsCase = {};
  caseKeys().forEach(c => statsCase[c] = { correct: 0, wrong: 0 });
}

/** 获取当前模式的数据 */
function D() { return DATA[currentMode]; }

// ==================== 页面导航 ====================
function startTraining(mode) {
  currentMode = mode;

  document.getElementById("page0").classList.add("hidden");
  document.getElementById("page2").classList.add("hidden");
  document.getElementById("page3").classList.add("hidden");
  document.getElementById("page1").classList.remove("hidden");

  document.getElementById("modeLabel").textContent = mode + " 模式";
  document.getElementById("modeLabel").className = "mode-badge " + mode.toLowerCase() + "-badge";
  document.getElementById("titleTrain").textContent = mode + " Training";
  document.getElementById("titleStats").textContent = mode + " Case统计";

  // 动态生成case勾选框
  const casebox = document.getElementById("casebox");
  casebox.innerHTML = caseKeys().map(k =>
    `<label><input type="checkbox" checked value="${k}" onchange="nextScramble()">${k}</label>`
  ).join("");

  loadStats();
  updateStats();
  showPage(1);
  nextScramble();
}

function goHome() {
  document.getElementById("page1").classList.add("hidden");
  document.getElementById("page2").classList.add("hidden");
  document.getElementById("page3").classList.add("hidden");
  document.getElementById("page0").classList.remove("hidden");
  currentMode = "";
  stopTimerIfRunning();
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
  for (const c of caseKeys()) {
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
    // 确保当前模式的所有key都存在（兼容旧数据）
    caseKeys().forEach(c => {
      if (!statsCase[c]) statsCase[c] = { correct: 0, wrong: 0 };
    });
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

// ==================== 计时器 ====================
let timerState = 'idle'; // 'idle' | 'ready' | 'inspecting' | 'running' | 'judging' | 'stopped'
let timerStartTime = 0;
let timerElapsed = 0;
let timerInterval = null;
let timerScramble = '';
let timerRecords = [];
let inspectionEnabled = false;
let inspectionTimeLeft = 15;
let inspectionInterval = null;
let currentPenalty = 0; // 0 = 无, 2000 = +2, -1 = DNF

function loadTimerRecords() {
  const raw = localStorage.getItem("eg_timer_records");
  if (raw) {
    try { timerRecords = JSON.parse(raw); } catch(e) { timerRecords = []; }
  }
}

function saveTimerRecords() {
  localStorage.setItem("eg_timer_records", JSON.stringify(timerRecords));
}

function stopTimerIfRunning() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  if (inspectionInterval) { clearInterval(inspectionInterval); inspectionInterval = null; }
  hidePenaltyButtons();
  timerState = 'idle';
}

function getEffectiveTime(r) {
  if (r.penalty === -1) return Infinity; // DNF
  return r.time + (r.penalty || 0);
}

function toggleInspection() {
  inspectionEnabled = document.getElementById("inspectCheck").checked;
  if (timerState === 'idle') updateTimerHint();
}

// ---- 计时器 Tab 切换 ----
function showTimerTab(n) {
  document.getElementById("timerTab1").classList.toggle("hidden", n !== 1);
  document.getElementById("timerTab2").classList.toggle("hidden", n !== 2);
  document.getElementById("navTimerTab1").classList.toggle("active", n === 1);
  document.getElementById("navTimerTab2").classList.toggle("active", n === 2);
}

// ---- 罚时按钮 ----
function hidePenaltyButtons() {
  document.getElementById("penaltyRow").classList.add("hidden");
}
function showPenaltyButtons() {
  document.getElementById("penaltyRow").classList.remove("hidden");
}

function highlightPenalty() {
  const btnOK = document.getElementById("btnPenaltyOK");
  const btnPlus2 = document.getElementById("btnPenaltyPlus2");
  const btnDNF = document.getElementById("btnPenaltyDNF");
  btnOK.classList.remove("selected");
  btnPlus2.classList.remove("selected");
  btnDNF.classList.remove("selected");
  if (currentPenalty === -1) btnDNF.classList.add("selected");
  else if (currentPenalty === 2000) btnPlus2.classList.add("selected");
  else btnOK.classList.add("selected");
}

function setNoPenalty() {
  currentPenalty = 0;
  finishRecord();
}
function setPlus2() {
  currentPenalty = 2000;
  finishRecord();
}
function setDNF() {
  currentPenalty = -1;
  finishRecord();
}

/** 键盘左右键循环切换罚时选项 */
function cyclePenalty(direction) {
  // direction: 1 = 右箭头, -1 = 左箭头
  // 罚时顺序: 无罚时(0) → +2(2000) → DNF(-1) → 无罚时(0) ...
  const options = [0, 2000, -1];
  const idx = options.indexOf(currentPenalty);
  const newIdx = (idx + direction + options.length) % options.length;
  currentPenalty = options[newIdx];
  highlightPenalty();
}

function finishRecord() {
  recordTime(timerElapsed);
  hidePenaltyButtons();
  // 确认罚时后立即生成新打乱，保证统计打乱与计时时一致
  timerScramble = generateWCAScramble();
  document.getElementById("timerScramble").textContent = timerScramble;
  timerState = 'stopped';
  document.getElementById("timerDisplay").className = "timer-display stopped";
  timerElapsed = 0;
  document.getElementById("timerTime").textContent = formatTime(timerRecords[0].time);
  if (timerRecords[0].penalty === -1) {
    document.getElementById("timerTime").textContent = "DNF";
  } else if (timerRecords[0].penalty) {
    document.getElementById("timerTime").textContent = formatTime(getEffectiveTime(timerRecords[0]));
  }
  updateTimerHint();
  updateTimerStats();
  updateTimeList();
}

// ---- 启动计时器页面 ----
function startTimer() {
  currentMode = "";
  stopTimerIfRunning();
  document.getElementById("page0").classList.add("hidden");
  document.getElementById("page1").classList.add("hidden");
  document.getElementById("page3").classList.add("hidden");
  document.getElementById("page2").classList.remove("hidden");

  loadTimerRecords();
  timerScramble = generateWCAScramble();
  timerState = 'idle';
  timerElapsed = 0;
  inspectionEnabled = false;
  currentPenalty = 0;
  document.getElementById("inspectCheck").checked = false;
  document.getElementById("timerScramble").textContent = timerScramble;
  document.getElementById("timerTime").textContent = "0.00";
  document.getElementById("timerDisplay").className = "timer-display";
  showTimerTab(1);
  hidePenaltyButtons();
  updateTimerHint();
  updateTimerStats();
  updateTimeList();
}

function updateTimerHint() {
  const hint = document.getElementById("timerHint");
  switch (timerState) {
    case 'idle':
      hint.textContent = inspectionEnabled
        ? "按空格键开始15秒观察，准备好后按住空格再松开计时"
        : "按住空格键准备，松开开始计时";
      break;
    case 'ready':
      hint.textContent = "松开空格键开始计时！";
      break;
    case 'inspecting':
      hint.textContent = "观察中... 准备好后按住空格再松开开始计时";
      break;
    case 'running':
      hint.textContent = "计时中... 按空格键停止";
      break;
    case 'judging':
      hint.textContent = "请选择罚时：← → 切换选项 · Enter 确认 · 无罚时 / +2 / DNF";
      break;
    case 'stopped':
      hint.textContent = "按空格键开始下一次";
      break;
  }
}

// ---- 按压 / 松开 事件 ----
function timerPress() {
  if (timerState === 'idle') {
    if (inspectionEnabled) {
      document.getElementById("timerDisplay").className = "timer-display ready";
    } else {
      timerState = 'ready';
      timerElapsed = 0;
      currentPenalty = 0;
      document.getElementById("timerTime").textContent = "0.00";
      document.getElementById("timerDisplay").className = "timer-display ready";
      updateTimerHint();
    }
  } else if (timerState === 'inspecting') {
    clearInterval(inspectionInterval);
    inspectionInterval = null;
    timerState = 'ready';
    timerElapsed = 0;
    document.getElementById("timerTime").textContent = "0.00";
    document.getElementById("timerDisplay").className = "timer-display ready";
    updateTimerHint();
  } else if (timerState === 'running') {
    // 停止计时 → 进入判罚
    timerState = 'judging';
    clearInterval(timerInterval);
    timerInterval = null;
    timerElapsed = performance.now() - timerStartTime;
    document.getElementById("timerTime").textContent = formatTime(timerElapsed);
    document.getElementById("timerDisplay").className = "timer-display stopped";
    highlightPenalty();
    showPenaltyButtons();
    updateTimerHint();
  } else if (timerState === 'stopped') {
    // 新打乱已在 finishRecord() 中生成，此处仅切换状态
    timerState = 'idle';
    timerElapsed = 0;
    currentPenalty = 0;
    document.getElementById("timerTime").textContent = "0.00";
    document.getElementById("timerDisplay").className = "timer-display";
    updateTimerHint();
  }
}

function timerRelease() {
  if (timerState === 'idle' && inspectionEnabled) {
    // 松开空格 → 开始15秒观察倒计时
    timerState = 'inspecting';
    inspectionTimeLeft = 15;
    currentPenalty = 0;
    document.getElementById("timerTime").textContent = inspectionTimeLeft;
    document.getElementById("timerDisplay").className = "timer-display inspecting";
    updateTimerHint();
    inspectionInterval = setInterval(function () {
      inspectionTimeLeft--;
      if (inspectionTimeLeft > 0) {
        // 倒计时：15, 14, ... 1
        document.getElementById("timerTime").textContent = inspectionTimeLeft;
      } else if (inspectionTimeLeft === 0) {
        // 15s 到，+2 罚时阶段 (+1, +2, +3)
        document.getElementById("timerTime").textContent = "+1";
        currentPenalty = 2000;
      } else {
        // 超时：inspectionTimeLeft = -1(16s), -2(17s), -3(18s)
        var ot = 1 - inspectionTimeLeft; // 2, 3, 4...
        var displayOT = Math.min(ot, 3); // 显示 +2 / +3 封顶
        document.getElementById("timerTime").textContent = "+" + displayOT;
        if (inspectionTimeLeft <= -3) {
          // 超过 18s → DNF
          clearInterval(inspectionInterval);
          inspectionInterval = null;
          currentPenalty = -1; // DNF
          startRunning();
        }
      }
    }, 1000);
  } else if (timerState === 'ready') {
    startRunning();
  }
}

function timerCancel() {
  if (timerState === 'ready') {
    timerState = 'idle';
    timerElapsed = 0;
    document.getElementById("timerTime").textContent = "0.00";
    document.getElementById("timerDisplay").className = "timer-display";
    updateTimerHint();
  } else if (timerState === 'inspecting') {
    clearInterval(inspectionInterval);
    inspectionInterval = null;
    timerState = 'idle';
    inspectionTimeLeft = 15;
    currentPenalty = 0;
    document.getElementById("timerTime").textContent = "0.00";
    document.getElementById("timerDisplay").className = "timer-display";
    updateTimerHint();
  } else if (timerState === 'idle' && inspectionEnabled) {
    document.getElementById("timerDisplay").className = "timer-display";
  }
}

function startRunning() {
  timerState = 'running';
  timerStartTime = performance.now();
  timerElapsed = 0;
  document.getElementById("timerDisplay").className = "timer-display running";
  hidePenaltyButtons();
  updateTimerHint();
  timerInterval = setInterval(updateTimerDisplay, 10);
  updateTimerDisplay();
}

function updateTimerDisplay() {
  if (timerState === 'running') {
    timerElapsed = performance.now() - timerStartTime;
  }
  document.getElementById("timerTime").textContent = formatTime(timerElapsed);
}

function formatTime(ms) {
  if (ms === Infinity || ms < 0) return "DNF";
  var totalSeconds = ms / 1000;
  if (totalSeconds < 60) {
    var sec = Math.floor(totalSeconds);
    var hundredths = Math.floor((ms % 1000) / 10);
    return sec + '.' + String(hundredths).padStart(2, '0');
  } else {
    var min = Math.floor(totalSeconds / 60);
    var sec = Math.floor(totalSeconds % 60);
    var hundredths = Math.floor((ms % 1000) / 10);
    return min + ':' + String(sec).padStart(2, '0') + '.' + String(hundredths).padStart(2, '0');
  }
}

function recordTime(ms) {
  timerRecords.unshift({
    time: ms,
    penalty: currentPenalty,
    scramble: timerScramble,
    date: Date.now()
  });
  if (timerRecords.length > 500) timerRecords.length = 500;
  saveTimerRecords();
}

/** 计算从最近 N 次成绩中去头去尾的均值（当前 aoN），不足 N 次或 DNF>=2 返回 null */
function computeCurrentAO(records, n) {
  if (records.length < n) return null;
  var last = records.slice(0, n).map(function(r) { return getEffectiveTime(r); });
  var dnfCount = last.filter(function(t) { return t === Infinity; }).length;
  if (dnfCount >= 2) return null; // DNF
  var sorted = last.slice().sort(function(a, b) { return a - b; });
  var sum = sorted.slice(1, -1).reduce(function(a, b) { return a + b; }, 0);
  return Math.round(sum / (n - 2));
}

/** 扫描全部记录找最佳滚动 aoN（去头去尾均值），不足 N 次返回 null */
function computeBestAO(records, n) {
  if (records.length < n) return null;
  var best = null;
  for (var i = 0; i <= records.length - n; i++) {
    var times = records.slice(i, i + n).map(function(r) { return getEffectiveTime(r); });
    var dnfCount = times.filter(function(t) { return t === Infinity; }).length;
    if (dnfCount >= 2) continue;
    var sorted = times.slice().sort(function(a, b) { return a - b; });
    var sum = sorted.slice(1, -1).reduce(function(a, b) { return a + b; }, 0);
    var avg = Math.round(sum / (n - 2));
    if (best === null || avg < best) best = avg;
  }
  return best;
}

function formatAO(val) {
  if (val === null) return "—";
  if (val === Infinity) return "DNF";
  return formatTime(val);
}

function updateTimerStats() {
  var total = timerRecords.length;
  var validTimes = timerRecords.map(function(r) { return getEffectiveTime(r); }).filter(function(t) { return t !== Infinity; });

  // ---- Tab 1 实时统计 ----
  var liveBestEl = document.getElementById("liveBest");
  var liveAO5El = document.getElementById("liveAO5");
  var liveAO12El = document.getElementById("liveAO12");
  var liveTotalEl = document.getElementById("liveTotal");

  liveTotalEl.textContent = total;

  if (total === 0) {
    liveBestEl.textContent = "—";
    liveAO5El.textContent = "—";
    liveAO12El.textContent = "—";
  } else {
    liveBestEl.textContent = validTimes.length > 0 ? formatTime(Math.min.apply(null, validTimes)) : "DNF";
    liveAO5El.textContent = formatAO(computeCurrentAO(timerRecords, 5));
    liveAO12El.textContent = formatAO(computeCurrentAO(timerRecords, 12));
  }

  // ---- Tab 2 历史最佳统计 ----
  var bestEl = document.getElementById("statBest");
  var ao5El = document.getElementById("statAO5");
  var ao12El = document.getElementById("statAO12");

  if (total === 0) {
    bestEl.textContent = "—";
    ao5El.textContent = "—";
    ao12El.textContent = "—";
    return;
  }

  // 最佳单次
  bestEl.textContent = validTimes.length > 0 ? formatTime(Math.min.apply(null, validTimes)) : "DNF";

  // 最佳 ao5 / ao12
  ao5El.textContent = formatAO(computeBestAO(timerRecords, 5));
  ao12El.textContent = formatAO(computeBestAO(timerRecords, 12));
}

/** 计算第 i 条记录（0=最新）当时的滚动 aoN（用 i..i+N-1） */
function computeAOAt(records, i, n) {
  if (records.length - i < n) return null;
  var times = records.slice(i, i + n).map(function(r) { return getEffectiveTime(r); });
  var dnfCount = times.filter(function(t) { return t === Infinity; }).length;
  if (dnfCount >= 2) return null;
  var sorted = times.slice().sort(function(a, b) { return a - b; });
  var sum = sorted.slice(1, -1).reduce(function(a, b) { return a + b; }, 0);
  return Math.round(sum / (n - 2));
}

function deleteTimeRecord(index) {
  timerRecords.splice(index, 1);
  saveTimerRecords();
  updateTimerStats();
  updateTimeList();
}

function updateTimeList() {
  var tbody = document.getElementById("timeList");
  var noTimes = document.getElementById("noTimes");

  if (timerRecords.length === 0) {
    tbody.innerHTML = "";
    noTimes.style.display = "block";
    return;
  }

  noTimes.style.display = "none";
  var valid = timerRecords.filter(function(r) { return r.penalty !== -1; });
  var bestTime = valid.length > 0 ? Math.min.apply(null, valid.map(function(r) { return getEffectiveTime(r); })) : null;

  tbody.innerHTML = timerRecords.map(function(r, i) {
    var isDNF = r.penalty === -1;
    var eff = getEffectiveTime(r);
    var isBest = !isDNF && bestTime !== null && eff === bestTime;
    var display;
    if (isDNF) {
      display = "DNF";
    } else if (r.penalty) {
      display = formatTime(eff) + ' <span class="penalty-mark">+2</span>';
    } else {
      display = formatTime(eff);
    }
    var ao5 = computeAOAt(timerRecords, i, 5);
    var ao12 = computeAOAt(timerRecords, i, 12);
    var ao5Html = formatAO(ao5);
    var ao12Html = formatAO(ao12);
    // Highlight ao's that match the best historical value
    var bestAO5 = computeBestAO(timerRecords, 5);
    var bestAO12 = computeBestAO(timerRecords, 12);
    var ao5Class = (ao5 === bestAO5 && ao5 !== null) ? 'ao-best' : '';
    var ao12Class = (ao12 === bestAO12 && ao12 !== null) ? 'ao-best' : '';
    return '<tr class="' + (isBest ? 'best-row' : '') + '">' +
      '<td>' + (i + 1) + '</td>' +
      '<td>' + display + '</td>' +
      '<td class="' + ao5Class + '">' + ao5Html + '</td>' +
      '<td class="' + ao12Class + '">' + ao12Html + '</td>' +
      '<td title="' + r.scramble + '">' + r.scramble + '</td>' +
      '<td><button class="btn-delete-time" onclick="deleteTimeRecord(' + i + ')" title="删除此记录">✕</button></td>' +
      '</tr>';
  }).join("");
}

function resetTimer() {
  localStorage.removeItem("eg_timer_records");
  timerRecords = [];
  updateTimerStats();
  updateTimeList();
}

// ==================== 预判练习器 ====================
let piStats = { correct: 0, wrong: 0 };
let currentPIScramble = "";

function loadPIStats() {
  const raw = localStorage.getItem("eg_preinspect_stats");
  if (raw) {
    try { piStats = JSON.parse(raw); } catch(e) { piStats = { correct: 0, wrong: 0 }; }
  }
}

function savePIStats() {
  localStorage.setItem("eg_preinspect_stats", JSON.stringify(piStats));
}

function startPreinspect() {
  currentMode = "";
  stopTimerIfRunning();
  document.getElementById("page0").classList.add("hidden");
  document.getElementById("page1").classList.add("hidden");
  document.getElementById("page2").classList.add("hidden");
  document.getElementById("page3").classList.remove("hidden");

  loadPIStats();
  currentPIScramble = generateWCAScramble();
  document.getElementById("piScramble").textContent = currentPIScramble;
  document.getElementById("piResult").textContent = "";
  document.getElementById("piResult").className = "";
  updatePIDisplay();
}

function piNext() {
  currentPIScramble = generateWCAScramble();
  document.getElementById("piScramble").textContent = currentPIScramble;
  document.getElementById("piResult").textContent = "";
  document.getElementById("piResult").className = "";
}

function piCorrect() {
  piStats.correct++;
  savePIStats();
  updatePIDisplay();
  document.getElementById("piResult").textContent = "蒸蚌 ✨";
  document.getElementById("piResult").className = "result-success pulse";
}

function piWrong() {
  piStats.wrong++;
  savePIStats();
  updatePIDisplay();
  document.getElementById("piResult").textContent = "菜就多练 💪";
  document.getElementById("piResult").className = "result-fail";
}

function updatePIDisplay() {
  document.getElementById("piCorrectCount").textContent = piStats.correct;
  document.getElementById("piWrongCount").textContent = piStats.wrong;
  document.getElementById("piRate").textContent = percent(piStats.correct, piStats.wrong);
}

function resetPI() {
  localStorage.removeItem("eg_preinspect_stats");
  piStats = { correct: 0, wrong: 0 };
  updatePIDisplay();
  document.getElementById("piResult").textContent = "";
  document.getElementById("piResult").className = "";
}

// ==================== 键盘快捷键（页面感知） ====================
document.addEventListener("keydown", function (e) {
  const page0Visible = !document.getElementById("page0").classList.contains("hidden");
  const page1Visible = !document.getElementById("page1").classList.contains("hidden");
  const page2Visible = !document.getElementById("page2").classList.contains("hidden");
  const page3Visible = !document.getElementById("page3").classList.contains("hidden");

  // 首页：无快捷键（允许空格翻页）
  if (page0Visible) return;

  // 训练页 (page1)：EG 公式训练快捷键
  if (page1Visible && currentMode) {
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
  }

  // 计时器 (page2) — 按下空格：准备/观察/停止/重置
  if (page2Visible) {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      timerPress();
    } else if (timerState === 'judging') {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        cyclePenalty(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        cyclePenalty(-1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        finishRecord();
      }
    }
  }

  // 预判练习器 (page3)
  if (page3Visible) {
    if (e.key === "ArrowRight" || e.key === "j") {
      e.preventDefault();
      piCorrect();
    } else if (e.key === "ArrowLeft" || e.key === "k") {
      e.preventDefault();
      piWrong();
    } else if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      piNext();
    }
  }
});

// 计时器 — 松开空格：开始计时
document.addEventListener("keyup", function (e) {
  const page2Visible = !document.getElementById("page2").classList.contains("hidden");
  if (page2Visible && (e.key === " " || e.key === "Spacebar")) {
    e.preventDefault();
    timerRelease();
  }
});
