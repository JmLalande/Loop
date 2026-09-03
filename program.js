/* The program. Edit here, everything else follows. ------------------------ */
"use strict";

/* Movements. `work` is the estimated seconds the set itself takes, both sides
   included when `side` is set. `hold` marks work measured in seconds. Nothing
   here is ever gripped: the band is anchored to furniture or held down by her
   own foot, and the vest is worn. */
const M = {
  slthrust: {short:"SL thrust",     name:"Single-leg hip thrust",              reps:"10–15", lo:10, hi:15, side:"chaque jambe", load:"poids du corps", work:60, def:12, next:"L'élastique en travers des hanches, les deux bouts sous ton pied au sol. Ensuite, une pause de deux secondes en haut de chaque rep.", cue:"Les épaules sur le bord du sofa, un pied au sol, l'autre jambe levée. Pousse dans le talon jusqu'à ce que ton corps fasse une ligne droite du genou à l'épaule. Serre, puis redescends lentement. Garde les côtes basses, va pas chercher de la hauteur en creusant le dos."},
  rdl:      {short:"SL RDL",        name:"Single-leg Romanian deadlift",       reps:"10–12", lo:10, hi:12, side:"chaque jambe", load:"poids du corps", work:70, def:11, next:"Mets la veste. Ensuite, monte sur un livre pour que la jambe libre descende plus bas.", cue:"Le poids sur une jambe, l'autre part derrière pendant que le torse descend. Pousse les hanches vers l'arrière, plie pas le genou. Descends jusqu'à ce que ça tire en arrière de la cuisse, puis remonte. Une main sur le mur, c'est correct. Ça rend pas l'exercice plus facile."},
  frogpump: {short:"Frog pump",     name:"Frog pump",                          reps:"25–30", lo:25, hi:30, side:"",         load:"poids du corps", work:45, def:27, next:"Plus de reps, ensuite une seconde de contraction en haut de chaque rep. Pas d'élastique sur celui-là, il tient mal en place.", cue:"Sur le dos, les plantes de pieds collées, les genoux ouverts. Pousse dans le bord extérieur des pieds et monte les hanches. Petite amplitude, reps rapides, serre fort à chaque fois. Ça doit brûler."},

  wallsit:  {short:"Wall sit",      name:"Wall sit",                           reps:"30–45s",lo:30, hi:45, side:"",         load:"poids du corps", work:38, def:38, hold:true, next:"Mets la veste avant d'allonger le temps.", cue:"Le dos à plat sur le mur, glisse vers le bas jusqu'à ce que les cuisses soient presque parallèles au sol. Tiens sans bouger. Si le devant du genou se plaint, remonte plus haut et reste là."},
  llplank:  {short:"Long plank",    name:"Long-lever plank",                   reps:"20–40s",lo:20, hi:40, side:"",         load:"poids du corps", work:30, def:30, hold:true, next:"Mets la veste, ou avance les coudes encore plus loin.", cue:"Les coudes devant les épaules au lieu d'en dessous. Serre les fesses et rentre les côtes. Pas mal plus dur qu'une planche normale."},
  hollow:   {short:"Hollow",        name:"Hollow hold",                        reps:"20–30s",lo:20, hi:30, side:"",         load:"poids du corps", work:25, def:25, hold:true, next:"Allonge les jambes plus loin et étire les bras au-delà de la tête.", cue:"Sur le dos, les bras et les jambes décollés du sol. Le bas du dos reste collé au plancher. Dès qu'il décolle, plie les genoux jusqu'à ce qu'il recolle."},
  deadbug:  {short:"Dead bug",      name:"Dead bug",                           reps:"8–10",  lo:8,  hi:10, side:"chaque côté",load:"poids du corps", work:60, def:9,  next:"Ralentis à quatre secondes par rep, ensuite allonge davantage la jambe qui bouge.", cue:"Sur le dos, les bras droits vers le plafond, les genoux pliés au-dessus des hanches. Descends lentement le bras et la jambe opposés vers le plancher, puis reviens. Le bas du dos reste plaqué tout le long. Dès qu'il décolle, réduis l'amplitude."},

  sideabd:  {short:"Side abd",      name:"Side-lying hip abduction",           reps:"15–20", lo:15, hi:20, side:"chaque côté",load:"poids du corps", work:70, def:17, next:"L'élastique au-dessus des genoux, ensuite l'élastique aux chevilles.", cue:"Couchée sur le côté, les jambes empilées et presque droites. Monte la jambe du dessus lentement. Tiens une seconde en haut, puis redescends plus lentement que tu as monté. Laisse pas tes hanches rouler vers l'arrière, c'est tout l'exercice."},
  latwalk:  {short:"Lateral walk",  name:"Band lateral walk",                  reps:"15 aller, 15 retour", lo:15, hi:15, side:"",   load:"élastique",       work:45, def:15, next:"Descends l'élastique des genoux vers les chevilles.", cue:"L'élastique au-dessus des genoux, les pieds écartés pour qu'il soit déjà tendu. Reste en petit squat et marche de côté sans jamais coller les pieds ensemble. Quinze dans un sens, quinze au retour."},
  kickback: {short:"Kickback",      name:"Standing band kickback",             reps:"15–20", lo:15, hi:20, side:"chaque jambe", load:"élastique",       work:70, def:17, next:"L'élastique aux chevilles au lieu d'au-dessus des genoux, ensuite une pause d'une seconde en haut.", cue:"L'élastique autour des deux chevilles, ancré ou passé sous l'autre pied. Les mains sur un mur ou sur le dossier d'une chaise pour l'équilibre. Pousse une jambe droit vers l'arrière, serre, ramène-la en contrôlant. Pas d'élan, pas de dos creusé."},

  revlunge: {short:"Rev lunge",     name:"Reverse lunge",                      reps:"10–12", lo:10, hi:12, side:"chaque jambe", load:"poids du corps", work:75, def:11, next:"Rien pour l'instant. Celui-là est en probation. Deux cycles complets sans douleur au genou avant de remonter sur un livre, et la veste attend après ça.", cue:"Debout, bien droite. Recule d'un pas et descends jusqu'à ce que le genou arrière frôle le plancher. Pousse dans le talon avant pour te relever. Le pas va vers l'arrière, jamais vers l'avant. Arrête de descendre dès que le genou avant se plaint, même si c'est haut."},
  /* Parked. Day 3 needed glute volume more than a second knee hold, and the
     wall sit on day 1 already covers the isometric. Put it back if the lunge
     comes off probation and day 3 has room. */
  splitsq:  {short:"Split hold",    name:"Split-squat hold",                   reps:"30s",   lo:30, hi:30, side:"chaque jambe", load:"poids du corps", work:70, def:30, hold:true, next:"Mets la veste avant d'allonger le temps.", cue:"Grande fente, puis descends. La cuisse avant arrive autour de soixante degrés, le genou arrière à quelques pouces du plancher. Tiens sans bouger. Une main sur le mur, c'est correct."},

  sideplank:{short:"Side plank",    name:"Side plank",                         reps:"20–40s",lo:20, hi:40, side:"chaque côté",load:"poids du corps", work:70, def:30, hold:true, next:"Mets la veste, ou lève la jambe du dessus pendant que tu tiens.", cue:"Le coude sous l'épaule, les hanches empilées et soulevées. Commence à genoux si tes hanches descendent. Laisse pas ta poitrine rouler vers le sol."},
  revcrunch:{short:"Rev crunch",    name:"Reverse crunch and leg raise",       reps:"10–15", lo:10, hi:15, side:"",         load:"poids du corps", work:40, def:12, next:"L'élastique autour des chevilles, ensuite ralentis la descente à trois secondes.", cue:"Sur le dos, les jambes en l'air. Décolle les hanches du plancher au sommet du mouvement, au lieu de juste balancer les jambes. Redescends lentement."},

  /* Parked. They have no anchor at knee height. Dead bug replaced it. */
  tke:      {short:"Knee ext",      name:"Terminal knee extension",            reps:"15–20", lo:15, hi:20, side:"chaque jambe", load:"élastique",       work:70, def:17, next:"Recule plus loin de l'ancrage pour plus de tension.", cue:"L'élastique autour d'une patte de table à hauteur du genou, passé dans le pli en arrière du genou. Recule jusqu'à ce que ça tire ton genou en légère flexion. Redresse le genou contre l'élastique et serre la cuisse fort."},
  /* Parked. Their bed is too low for it. Kickback replaced it. */
  hipext:   {short:"Hip ext",       name:"Hip extension over a bed edge",      reps:"12–15", lo:12, hi:15, side:"",         load:"poids du corps", work:40, def:13, next:"Mets la veste.", cue:"Sur le ventre, les hanches au bord du lit, les jambes dans le vide. Monte les deux jambes jusqu'à ce que ton corps fasse une ligne droite, serre, redescends lentement."},
  /* Parked. Days 1, 2, 4 and 5 already carry the core work. */
  plank:    {short:"Plank",         name:"Plank",                              reps:"30–45s",lo:30, hi:45, side:"",         load:"poids du corps", work:38, def:38, hold:true, next:"Mets la veste.", cue:"Les coudes sous les épaules. Une ligne droite de la tête aux talons."}
};

/* Reps left in the tank at the end of a set. Lower is harder. The reverse
   lunge overrides its own day and runs softer, because that one movement is
   the one talking to the bad knee. */
const DEFAULT_RIR = [1,2], ONRAMP_RIR = [3,4];

/* The cycle. Five workouts in a fixed order and a cursor that moves only when a
   session is logged. Nothing is keyed to the calendar, and that is the point:
   the two rest days are not Saturday and Sunday, they are the two freezes,
   spent wherever the week actually needs them. A frozen day holds the cursor
   still, so the cycle slides and Monday is a different workout each week.

   The order is a loop, day 5 running back into day 1. Nothing repeats on
   adjacent days anywhere in that loop, and no two isometric knee holds land
   within two days of each other. Only the wall sit on day 1 is left, so that
   second rule currently has nothing to bite on. Because the order is fixed and
   only the calendar slides, those distances hold no matter how the cycle drifts
   against the week. Reordering the days or moving a movement breaks them, so
   `node check.js` re-checks it for you.

   Within a day, block order is execution order. Hardest and most technical
   first, core last. Day 3 runs the reverse lunge second on purpose: it is the
   highest-risk movement in the program and it should not land on tired legs. */
const CYCLE = [
  {name:"Knees & core", rir:[1,2], blocks:[{m:"wallsit",sets:5,rest:40},{m:"deadbug",sets:3,rest:30},{m:"llplank",sets:3,rest:30},{m:"frogpump",sets:2,rest:30}]},
  {name:"Glutes",       rir:[1,2], blocks:[{m:"slthrust",sets:4,rest:45},{m:"sideabd",sets:3,rest:38},{m:"sideplank",sets:2,rest:32}]},
  {name:"Legs & glutes",rir:[1,2], blocks:[{m:"rdl",sets:3,rest:42,reps:"8–10",lo:8,hi:10},{m:"revlunge",sets:3,rest:45,rir:[2,3]},{m:"kickback",sets:3,rest:40}]},
  {name:"Glutes & side",rir:[1,2], blocks:[{m:"slthrust",sets:4,rest:35,reps:"15–20",lo:15,hi:20},{m:"latwalk",sets:3,rest:32},{m:"frogpump",sets:2,rest:32},{m:"revcrunch",sets:2,rest:30}]},
  {name:"Hips & core",  rir:[1,2], blocks:[{m:"rdl",sets:3,rest:48},{m:"kickback",sets:3,rest:40},{m:"hollow",sets:3,rest:35}]}
];

/* Two freezes granted at the top of every cycle, no carryover. This is what
   caps her at two a week without any calendar arithmetic: she can never spend
   more than two per cycle, and a cycle that spends both is seven days long. */
const FREEZES_PER_CYCLE = 2;

/* Weeks 1-2 hold her back on purpose: 3-4 reps in reserve and the base version
   of everything, no progressions. Muscle adapts in weeks and tendons take about
   three months. The gap between those two is where knees get hurt. */
const ONRAMP_DAYS = 14;
const ONRAMP_NOTE = "garde 3 à 4 reps en réserve, version de base, aucune progression";

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
