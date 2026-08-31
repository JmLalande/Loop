/* The program. Edit here, everything else follows. ------------------------ */
"use strict";

/* Movements. `work` is the estimated seconds the set itself takes, both sides
   included when `side` is set. `hold` marks work measured in seconds. Nothing
   here is ever gripped: the band is anchored to furniture or held down by her
   own foot, and the vest is worn. */
const M = {
  slthrust: {short:"SL thrust",     name:"Single-leg hip thrust",              reps:"10–15", lo:10, hi:15, side:"chaque jambe", load:"élastique sur les hanches", work:60, def:12, next:"L'élastique aux chevilles au lieu d'au-dessus des genoux, ou une pause de deux secondes en haut de chaque rep.", cue:"Les épaules sur le sofa, l'élastique en travers des hanches, les deux bouts sous ton pied au sol. L'autre jambe tendue ou repliée, comme tu veux. Pousse dans le talon et serre les fesses en haut. Garde les côtes basses, va pas chercher de la hauteur en creusant le dos."},
  defrdl:   {short:"Deficit RDL",   name:"Deficit single-leg Romanian deadlift",reps:"8–10", lo:8,  hi:10, side:"chaque jambe", load:"veste 20 lb",     work:70, def:9,  next:"Un livre plus épais. L'amplitude en premier, toujours, avant tout le reste.", cue:"Debout sur un livre. Le poids sur une jambe, l'autre part vers l'arrière pendant que le torse descend. Pousse les hanches vers l'arrière, plie pas le genou. Descends jusqu'à ce que ça tire en arrière de la cuisse, puis remonte. Une main sur le mur, c'est correct, ça rend pas l'exercice plus facile."},
  rdl:      {short:"SL RDL",        name:"Single-leg Romanian deadlift",       reps:"10–12", lo:10, hi:12, side:"chaque jambe", load:"veste 20 lb",     work:70, def:11, cue:"Pareil que la version sur le livre, mais à plat. Lentement en descendant, vitesse normale en remontant. Cherche l'étirement, pas le nombre de reps."},
  frogpump: {short:"Frog pump",     name:"Frog pump",                          reps:"25–30", lo:25, hi:30, side:"",         load:"élastique sur les hanches", work:45, def:27, cue:"Sur le dos, les plantes de pieds collées ensemble, les genoux ouverts. L'élastique en travers des hanches. Petite amplitude, reps rapides, serre fort à chaque rep. Ça doit brûler."},

  wallsit:  {short:"Wall sit",      name:"Shallow wall sit",                   reps:"40s",   lo:40, hi:40, side:"",         load:"veste 20 lb",     work:40, def:40, hold:true, cue:"Descends juste du quart au tiers, pas proche de la cuisse parallèle au sol. Descendre bas écrase la rotule contre l'os, c'est exactement ce qui fait mal. Haut et difficile vaut mieux que bas et douloureux."},
  tke:      {short:"Knee ext",      name:"Terminal knee extension",            reps:"15–20", lo:15, hi:20, side:"chaque jambe", load:"élastique",           work:70, def:17, next:"Recule plus loin de l'ancrage pour plus de tension.", cue:"L'élastique autour d'une patte de table à hauteur du genou, passé dans le pli en arrière du genou. Recule jusqu'à ce que ça tire ton genou en légère flexion. Redresse le genou contre l'élastique et serre la cuisse fort. Petit mouvement, debout tout le long."},

  sideabd:  {short:"Side abd",      name:"Side-lying hip abduction",           reps:"15–20", lo:15, hi:20, side:"chaque côté",load:"élastique",           work:70, def:17, next:"L'élastique aux chevilles au lieu d'au-dessus des genoux.", cue:"Couchée sur le côté, l'élastique au-dessus des genoux, les jambes empilées et presque droites. Monte la jambe du dessus lentement, tiens une seconde en haut, redescends plus lentement que tu as monté. Laisse pas tes hanches rouler vers l'arrière."},
  latwalk:  {short:"Lateral walk",  name:"Band lateral walk",                  reps:"15 aller, 15 retour", lo:15, hi:15, side:"",   load:"élastique",           work:45, def:15, next:"L'élastique aux chevilles au lieu d'au-dessus des genoux.", cue:"L'élastique au-dessus des genoux, les pieds écartés pour qu'il soit déjà tendu. Reste en petit squat et marche de côté sans jamais coller les pieds ensemble. Quinze dans un sens, quinze au retour."},
  kickback: {short:"Kickback",      name:"Standing band kickback",             reps:"15–20", lo:15, hi:20, side:"chaque jambe", load:"élastique",           work:70, def:17, cue:"L'élastique autour des deux chevilles, ancré ou passé autour de l'autre pied. Les mains sur un mur ou sur le dossier d'une chaise pour l'équilibre. Pousse une jambe droit vers l'arrière, serre, ramène en contrôlant. Pas d'élan, pas de dos creusé."},

  revlunge: {short:"Rev lunge",     name:"Short-range reverse lunge",          reps:"10–12", lo:10, hi:12, side:"chaque jambe", load:"veste 20 lb",     work:75, def:11, next:"Un pouce plus bas. Seulement après deux semaines sans aucune douleur à la profondeur actuelle.", cue:"Le pas va vers l'arrière, jamais vers l'avant. Descends seulement aussi bas que le genou gauche accepte sans aucune douleur, ce qui peut être le quart au début. Cette profondeur-là, tu la gardes deux semaines. La profondeur, ça se gagne."},
  hipext:   {short:"Hip ext",       name:"Hip extension over a bed edge",      reps:"12–15", lo:12, hi:15, side:"",         load:"veste 20 lb",     work:40, def:13, cue:"Sur le ventre, les hanches juste au bord du lit, les jambes dans le vide, le haut du corps à plat sur le matelas. Monte les deux jambes jusqu'à ce que ton corps fasse une ligne droite, serre, redescends lentement. Les genoux plient jamais et portent jamais de poids."},
  splitsq:  {short:"Split hold",    name:"Split-squat hold, shallow",          reps:"30s",   lo:30, hi:30, side:"chaque jambe", load:"veste 20 lb",     work:70, def:30, hold:true, cue:"Grande fente, puis descends seulement à mi-chemin. Moins bas qu'une fente normale, même raison de rotule que le wall sit. Tiens la position sans bouger. Une main sur le mur, c'est correct."},

  llplank:  {short:"Long plank",    name:"Long-lever plank",                   reps:"20–40s",lo:20, hi:40, side:"",         load:"veste 20 lb",     work:30, def:30, hold:true, cue:"Les coudes devant les épaules au lieu d'en dessous. Pas mal plus dur qu'une planche normale. Serre les fesses et rentre les côtes."},
  /* Parked. Day 2 and day 4 already carry the core work. Put it back on day 5
     if she ever wants a fourth block there. */
  plank:    {short:"Plank",         name:"Plank",                              reps:"30–45s",lo:30, hi:45, side:"",         load:"veste 20 lb",     work:40, def:38, hold:true, cue:"Les coudes sous les épaules, la veste sur le dos. Une ligne droite de la tête aux talons."},
  sideplank:{short:"Side plank",    name:"Side plank",                         reps:"20–40s",lo:20, hi:40, side:"chaque côté",load:"veste 20 lb",     work:70, def:30, hold:true, cue:"Le coude sous l'épaule, les hanches empilées et soulevées. Commence à genoux si tes hanches descendent. Laisse pas ta poitrine rouler vers le sol."},
  hollow:   {short:"Hollow",        name:"Hollow hold",                        reps:"20–30s",lo:20, hi:30, side:"",         load:"veste 20 lb",     work:25, def:25, hold:true, cue:"Sur le dos, les bras et les jambes décollés du sol. Le bas du dos reste collé au plancher. Dès qu'il décolle, plie les genoux jusqu'à ce qu'il recolle."},
  revcrunch:{short:"Rev crunch",    name:"Reverse crunch and leg raise",       reps:"10–15", lo:10, hi:15, side:"",         load:"élastique aux chevilles", work:40, def:12, cue:"L'élastique autour des chevilles. Décolle les hanches du plancher en haut au lieu de juste balancer les jambes. Redescends lentement."}
};

/* Reps left in the tank at the end of a set. Lower is harder. The knee day runs
   deliberately softer than the glute days, and the reverse lunge overrides its
   own day, because that one movement is the one talking to the bad knee. */
const DEFAULT_RIR = [1,2], ONRAMP_RIR = [3,4];

/* The cycle. Five workouts in order, and a cursor that moves only when a
   session is logged. Nothing here is keyed to the calendar, and that is the
   whole point: the two rest days are not Saturday and Sunday, they are the two
   freezes, spent wherever the week actually needs them. A frozen day holds the
   cursor still, so the cycle slides and Monday is a different workout depending
   on what came before it.

   Days 2 and 5 carry the knee work and are three apart in the order, which is
   what keeps them apart no matter how the cycle slides. */
const CYCLE = [
  {name:"Hips",         rir:[1,2], blocks:[{m:"slthrust",sets:4,rest:45},{m:"defrdl",sets:3,rest:55},{m:"frogpump",sets:2,rest:40}]},
  {name:"Knees & core", rir:[2,3], blocks:[{m:"wallsit",sets:4,rest:65},{m:"tke",sets:3,rest:35},{m:"llplank",sets:2,rest:35},{m:"hollow",sets:2,rest:35}]},
  {name:"Side glutes",  rir:[1,2], blocks:[{m:"sideabd",sets:3,rest:35},{m:"latwalk",sets:3,rest:35},{m:"revlunge",sets:3,rest:55,rir:[2,3]}]},
  {name:"Glutes & core",rir:[1,2], blocks:[{m:"slthrust",sets:4,rest:35,reps:"15–20",lo:15,hi:20},{m:"hipext",sets:3,rest:40},{m:"sideplank",sets:2,rest:35},{m:"revcrunch",sets:2,rest:35}]},
  {name:"Hips & knees", rir:[1,2], blocks:[{m:"splitsq",sets:3,rest:60},{m:"rdl",sets:3,rest:50},{m:"kickback",sets:2,rest:35}]}
];

/* Two freezes granted at the top of every cycle, no carryover. This is what
   caps her at two a week without any calendar arithmetic: she can never spend
   more than two per cycle, and a cycle that spends both is seven days long. */
const FREEZES_PER_CYCLE = 2;

/* Weeks 1-2 hold her back on purpose: 3-4 reps in reserve, band only, no vest
   on anything, no progression. Muscle adapts in weeks and tendons take about
   three months. The gap between those two is where knees get hurt. */
const ONRAMP_DAYS = 14;
const ONRAMP_NOTE = "garde 3 à 4 reps en réserve, élastique seulement, pas de veste";

function buildPhases(slot, onramp){
  const day = CYCLE[slot], ph = [];
  day.blocks.forEach((b, bi) => {
    const m = M[b.m];
    const spec = {
      reps: b.reps || m.reps, lo: b.lo || m.lo, hi: b.hi || m.hi,
      rir: m.hold ? null : (onramp ? ONRAMP_RIR : (b.rir || day.rir || DEFAULT_RIR))
    };
    spec.def = (b.reps ? Math.round((spec.lo + spec.hi)/2) : m.def);
    for(let s=1; s<=b.sets; s++){
      ph.push(Object.assign({type:"work", m:b.m, bi, set:s, sets:b.sets, dur:m.work}, spec));
      const isLast = (bi === day.blocks.length-1) && (s === b.sets);
      const rest = (!isLast && b.rest > 0) ? b.rest : 20;
      if(!isLast) ph.push(Object.assign({type:"rest", m:b.m, bi, set:s, sets:b.sets, dur:rest}, spec));
    }
  });
  return ph;
}

/* What the plan lists read, so a block override never disagrees with the timer. */
const blockReps = b => b.reps || M[b.m].reps;
