/* Run with `node check.js` after touching program.js.

   The training rules that are not visible in the file. Block order and rep
   ranges are readable at a glance, but the spacing rules live across days and
   go quiet when they break: a movement landing on two days in a row still runs
   fine, it just stops being the program that was designed. These assert the
   ones that matter, and the cycle is checked as a loop, so day 5 running back
   into day 1 counts as adjacent. */
"use strict";
const fs = require("fs");
/* program.js is a plain browser script, so its top-level `const` bindings are
   not module exports and eval() will not surface them. Run it as a function
   body and have it hand back what it declared. */
const { M, CYCLE, ONRAMP_RIR, buildPhases } = new Function(
  fs.readFileSync(__dirname + "/program.js", "utf8") +
  "\nreturn { M, CYCLE, ONRAMP_RIR, buildPhases };")();

const LEAD = 5;                       /* app.js unshifts a lead-in of this length */
const fail = [], note = [];
const names = CYCLE.map((d, i) => (i + 1) + ". " + d.name);
const moves = CYCLE.map(d => d.blocks.map(b => b.m));

/* Distance around a five-day loop, so 1 and 5 are neighbours. */
const apart = (a, b) => { const d = Math.abs(a - b); return Math.min(d, CYCLE.length - d); };

/* No movement on two days in a row, anywhere in the loop. */
for (let i = 0; i < CYCLE.length; i++) {
  const j = (i + 1) % CYCLE.length;
  moves[i].filter(m => moves[j].includes(m))
          .forEach(m => fail.push(m + " runs on " + names[i] + " and again on " + names[j] + ", which are adjacent"));
}

/* The two knee holds stay at least two days apart. */
const holds = ["wallsit", "splitsq"];
const at = m => moves.findIndex(day => day.includes(m));
if (holds.every(m => at(m) >= 0) && apart(at(holds[0]), at(holds[1])) < 2)
  fail.push("the knee holds are " + apart(at(holds[0]), at(holds[1])) + " day(s) apart, minimum is 2");

/* Every movement the cycle names has to exist. */
moves.flat().filter(m => !M[m]).forEach(m => fail.push("unknown movement: " + m));

/* Holds get no RIR target, everything else gets one. The app reads rir to
   decide whether to ask her how hard the set was. */
CYCLE.forEach((d, i) => buildPhases(i, false).filter(p => p.type === "work").forEach(p => {
  if (!!M[p.m].hold !== (p.rir === null))
    fail.push(names[i] + ": " + p.m + " has the wrong rir shape for a " + (M[p.m].hold ? "hold" : "rep") + " movement");
}));

/* The on-ramp has to override every rep movement, or the first two weeks are
   only nominally easy. */
CYCLE.forEach((d, i) => buildPhases(i, true).filter(p => p.type === "work" && !M[p.m].hold)
  .forEach(p => { if (String(p.rir) !== String(ONRAMP_RIR)) fail.push(names[i] + ": " + p.m + " ignores the on-ramp"); }));

/* Anything the user reads is French, and the punctuation rules that go with it. */
Object.entries(M).forEach(([k, m]) => {
  ["cue", "next", "load", "side"].forEach(f => {
    const t = m[f];
    if (typeof t !== "string" || !t) return;
    if (/[, ;…’]/.test(t)) fail.push(k + "." + f + " uses a banned character");
    if (/\s[?!,]|\S:|:\S/.test(t)) fail.push(k + "." + f + " breaks Quebec punctuation spacing");
  });
  if (!m.next) note.push(k + " has no progression, so the routine page shows nothing under it");
});

/* Sessions are meant to land near fifteen minutes. */
CYCLE.forEach((d, i) => {
  const ph = buildPhases(i, false);
  const total = LEAD + ph.reduce((a, p) => a + p.dur, 0);
  const sets = ph.filter(p => p.type === "work").length;
  const mins = Math.floor(total / 60) + "m" + String(total % 60).padStart(2, "0");
  note.push(names[i].padEnd(17) + sets + " sets  " + mins + "  " + moves[i].join(" · "));
  if (total < 12 * 60 || total > 18 * 60) fail.push(names[i] + " runs " + mins + ", which is outside 12 to 18 minutes");
});
note.push("total: " + moves.flat().length + " blocks, " +
  CYCLE.reduce((a, d) => a + d.blocks.reduce((x, b) => x + b.sets, 0), 0) + " sets per cycle");

note.forEach(n => console.log("   " + n));
console.log("");
if (fail.length) { fail.forEach(f => console.log("FAIL  " + f)); process.exit(1); }
console.log("All checks pass.");
