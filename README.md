# Loop

Fifteen minutes a day, at home. Knees, glutes and core. Every movement is
bodyweight in its base version except the two band walks, and the band and the
vest are how it gets harder later.

Live: https://jmlalande.github.io/Loop/

## The cycle, not the week

Five workouts in a fixed order and a cursor that moves only when a session is
logged. Nothing is keyed to the calendar, so there is no Monday workout. Miss a
day and the cursor stays put, which slides the whole cycle against the week.

Two rest days per cycle, taken as **freezes**. A freeze holds the streak without
counting toward it, so the number on screen stays a count of sessions done. Two
are granted at the top of every cycle and they do not carry over, which caps her
at two a week without any calendar arithmetic: a cycle that spends both is seven
days long.

Freezing is a button, and there is also a safety net. Nothing can run at midnight
in a page that is closed, so a missed day is only discovered when she opens the
app again. It then covers the whole gap or none of it, because spending both
freezes on a five-day absence breaks the streak anyway and leaves her with
nothing for the Tuesday after.

Break the streak and only the streak resets. The cursor stays on the workout she
was actually on, and the freezes left in that cycle stay as they were.

## Editing the program

Everything about the training lives in `program.js`: movements, the five-day
cycle, rest periods, rep ranges, the cues shown on screen. Change it there and
the whole app follows.

`milestones.js` is the streak bank, in French. `DAYS` is keyed to an exact day
count, `POOL` is the bonus that never repeats, `BREAKS` is what shows when a
streak ends.

`load` names the base version of a movement, and `next` is how to make it
harder. Both are on screen: the load during the set, the progression on the
routine page under the cue.

Run `node check.js` after touching `program.js`. The spacing rules live across
days and break quietly, so it asserts them: no movement on two days in a row
anywhere in the loop, day 5 back into day 1 included, the two knee holds at
least two days apart, holds carrying no RIR target, the on-ramp overriding every
rep movement, French punctuation on everything she reads, and every session
landing between twelve and eighteen minutes.

## Language

French for anything that tells her how to train: the cues, the progression
prompts, the load and side labels, the effort target, and the whole fact bank.
English for the app chrome: movement names, tabs, buttons, stats.

## How it behaves

- A day counts as soon as **one set** is logged. A short session keeps the
  streak and still moves the cursor.
- The clock runs the whole session. Work never auto-advances, it counts into
  overtime until you tap. Rest auto-advances, with four ticks and a go tone.
- Tapping anywhere ends the current phase and **shifts the entire remaining
  schedule**, so finishing early or late reflows the projected finish time.
- Weeks 1-2 hold her to 3-4 reps in reserve, band only, no vest.
- Hit the top of a rep range twice running and it names the next rung.

## Data

IndexedDB, this browser only. **Export from the Progress tab now and then**,
clearing site data wipes everything.

`DB_NAME`, `CACHE_NAME` and the cache prefix are all `loop-`. They must never
collide with another app on the same GitHub Pages account, because storage there
is shared across every repo of the account.

## Deploying

`APP_VERSION` in `app.js` and `CACHE_NAME` in `sw.js` bump together, every time.
Out of sync means phones keep serving stale files.
