# Streak

Fifteen minutes a day, at home. Hips, glutes and knees, built on a band, a
20 lb vest and whatever furniture is nearby.

Working title. The name, the repo and the URL are still open.

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

`DB_NAME`, `CACHE_NAME` and the cache prefix are all `elle-`. They must never
collide with another app on the same GitHub Pages account, because storage there
is shared across every repo of the account.

## Deploying

`APP_VERSION` in `app.js` and `CACHE_NAME` in `sw.js` bump together, every time.
Out of sync means phones keep serving stale files.
