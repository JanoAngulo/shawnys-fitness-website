<script setup lang="ts">
import { EXERCISES, MUSCLES, EQUIPMENT, type Exercise } from '~/utils/exercises'

definePageMeta({ layout: 'dashboard' })
useSeoMeta({ title: "Dashboard — Shawny's Fitness", robots: 'noindex' })

const active = inject<Ref<string>>('dash-active', ref('overview'))

/* ── Profile / membership ─────────────────────── */
const profile = reactive({ name: 'Juan C.', email: 'juan@email.com', phone: '0917 555 0142' })
const editing = ref(false)
const membership = {
  plan: 'All-Access · Annual',
  status: 'Active',
  start: 'Jan 14, 2026',
  renews: 'Jan 14, 2027',
  due: '₱0.00 — paid in full'
}

/* ── Exercise library ─────────────────────────── */
const muscle = ref<(typeof MUSCLES)[number]>('All')
const equip = ref<(typeof EQUIPMENT)[number]>('All')
const search = ref('')
const selected = ref<Exercise | null>(null)

const library = computed(() =>
  EXERCISES.filter(e =>
    (muscle.value === 'All' || e.muscle === muscle.value) &&
    (equip.value === 'All' || e.equipment === equip.value) &&
    e.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

/* ── Routine builder ──────────────────────────── */
interface RoutineItem { ex: Exercise; sets: number; reps: number; rest: number; weight: number }
const unit = ref<'kg' | 'lbs'>('kg')
const routineName = ref('Push Day A')
const routine = ref<RoutineItem[]>([
  { ex: EXERCISES[0]!, sets: 4, reps: 8, rest: 120, weight: 60 },
  { ex: EXERCISES[11]!, sets: 3, reps: 10, rest: 90, weight: 35 }
])
const savedRoutines = ref([
  { name: 'Pull Day A', count: 5 },
  { name: 'Leg Day', count: 6 }
])

function addToRoutine(ex: Exercise) {
  if (routine.value.some(r => r.ex.id === ex.id)) return
  routine.value.push({ ex, sets: 3, reps: 10, rest: 90, weight: 20 })
  active.value = 'builder'
}
function removeFromRoutine(id: string) {
  routine.value = routine.value.filter(r => r.ex.id !== id)
}
function saveRoutine() {
  if (!routine.value.length) return
  savedRoutines.value.unshift({ name: routineName.value, count: routine.value.length })
}
const totalVolume = computed(() =>
  routine.value.reduce((sum, r) => sum + r.sets * r.reps * r.weight, 0)
)

/* ── Progress ─────────────────────────────────── */
const weeks = [
  { label: 'W1', volume: 4200 },
  { label: 'W2', volume: 4650 },
  { label: 'W3', volume: 4400 },
  { label: 'W4', volume: 5100 },
  { label: 'W5', volume: 5600 },
  { label: 'W6', volume: 6050 }
]
const maxVol = Math.max(...weeks.map(w => w.volume))

const log = ref([
  { date: 'Jun 28', ex: 'Back Squat', best: '80 kg × 5' },
  { date: 'Jun 26', ex: 'Bench Press', best: '62.5 kg × 8' },
  { date: 'Jun 24', ex: 'Deadlift', best: '110 kg × 3' }
])
const entry = reactive({ ex: 'Back Squat', weight: 82.5, reps: 5 })
function addLog() {
  log.value.unshift({ date: 'Today', ex: entry.ex, best: `${entry.weight} kg × ${entry.reps}` })
}

const notifications = [
  { icon: 'i-lucide-credit-card', text: 'Annual membership renews Jan 14, 2027.', time: '2d ago' },
  { icon: 'i-lucide-dumbbell', text: 'New routine “Push Day A” saved to your profile.', time: '5d ago' },
  { icon: 'i-lucide-sparkles', text: 'Tip: add 2.5 kg to your squat this week.', time: '1w ago' }
]
</script>

<template>
  <!-- ═══ OVERVIEW ═══ -->
  <section v-show="active === 'overview'" class="stack">
    <div class="welcome">
      <h2 class="welcome__h">Welcome back, {{ profile.name.split(' ')[0] }}.</h2>
      <p class="welcome__p">Here’s where your training stands today.</p>
    </div>

    <div class="ov-grid">
      <article class="panel panel--accent membership">
        <span class="panel__ey">Membership</span>
        <span class="membership__plan">{{ membership.plan }}</span>
        <span class="membership__status"><i></i>{{ membership.status }}</span>
        <dl class="membership__dl">
          <div><dt>Started</dt><dd>{{ membership.start }}</dd></div>
          <div><dt>Renews</dt><dd>{{ membership.renews }}</dd></div>
          <div><dt>Balance due</dt><dd>{{ membership.due }}</dd></div>
        </dl>
      </article>

      <article class="panel profile">
        <div class="panel__head">
          <span class="panel__ey">Profile</span>
          <button class="mini" @click="editing = !editing">{{ editing ? 'Save' : 'Edit' }}</button>
        </div>
        <div v-if="!editing" class="profile__view">
          <p><span>Name</span>{{ profile.name }}</p>
          <p><span>Email</span>{{ profile.email }}</p>
          <p><span>Mobile</span>{{ profile.phone }}</p>
        </div>
        <div v-else class="profile__edit">
          <input v-model="profile.name" class="input" aria-label="Name">
          <input v-model="profile.email" class="input" type="email" aria-label="Email">
          <input v-model="profile.phone" class="input" type="tel" aria-label="Mobile">
        </div>
      </article>

      <article class="panel stats">
        <span class="panel__ey">This month</span>
        <div class="stats__row">
          <div><span class="stats__n">14</span><span class="stats__l">Sessions</span></div>
          <div><span class="stats__n">6.1k</span><span class="stats__l">Volume (kg)</span></div>
          <div><span class="stats__n">3</span><span class="stats__l">PRs hit</span></div>
        </div>
      </article>

      <article class="panel notifs">
        <span class="panel__ey">Notifications</span>
        <ul>
          <li v-for="(n, i) in notifications" :key="i">
            <UIcon :name="n.icon" class="notifs__icon" />
            <span class="notifs__text">{{ n.text }}</span>
            <span class="notifs__time">{{ n.time }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>

  <!-- ═══ EXERCISE LIBRARY ═══ -->
  <section v-show="active === 'library'" class="stack">
    <div class="lib-controls">
      <div class="lib-search">
        <UIcon name="i-lucide-search" />
        <input v-model="search" class="input" placeholder="Search exercises…" aria-label="Search exercises">
      </div>
      <div class="lib-filters">
        <select v-model="muscle" class="select" aria-label="Filter by muscle">
          <option v-for="m in MUSCLES" :key="m" :value="m">{{ m === 'All' ? 'All muscles' : m }}</option>
        </select>
        <select v-model="equip" class="select" aria-label="Filter by equipment">
          <option v-for="e in EQUIPMENT" :key="e" :value="e">{{ e === 'All' ? 'All equipment' : e }}</option>
        </select>
      </div>
    </div>

    <p class="lib-count">{{ library.length }} exercise{{ library.length === 1 ? '' : 's' }}</p>

    <div class="ex-grid">
      <article v-for="e in library" :key="e.id" class="ex-card">
        <button class="ex-card__thumb" aria-label="Play demo" @click="selected = e">
          <UIcon name="i-lucide-play" />
        </button>
        <div class="ex-card__body">
          <h3 class="ex-card__name">{{ e.name }}</h3>
          <div class="ex-card__meta">
            <span class="tag">{{ e.muscle }}</span>
            <span class="ex-card__equip">{{ e.equipment }}</span>
          </div>
        </div>
        <div class="ex-card__actions">
          <button class="mini" @click="selected = e">Details</button>
          <button class="mini mini--solid" @click="addToRoutine(e)">+ Add</button>
        </div>
      </article>
    </div>
  </section>

  <!-- ═══ ROUTINE BUILDER ═══ -->
  <section v-show="active === 'builder'" class="stack">
    <div class="builder">
      <div class="builder__main">
        <div class="builder__head">
          <input v-model="routineName" class="builder__name" aria-label="Routine name">
          <div class="unit" role="group" aria-label="Weight unit">
            <button :class="{ 'is-active': unit === 'kg' }" @click="unit = 'kg'">kg</button>
            <button :class="{ 'is-active': unit === 'lbs' }" @click="unit = 'lbs'">lbs</button>
          </div>
        </div>

        <div v-if="routine.length" class="rt">
          <div class="rt__head">
            <span>Exercise</span><span>Sets</span><span>Reps</span><span>Rest (s)</span><span>Weight ({{ unit }})</span><span></span>
          </div>
          <div v-for="r in routine" :key="r.ex.id" class="rt__row">
            <span class="rt__name">{{ r.ex.name }}<small>{{ r.ex.muscle }}</small></span>
            <input v-model.number="r.sets" type="number" min="1" class="rt__in" aria-label="Sets">
            <input v-model.number="r.reps" type="number" min="1" class="rt__in" aria-label="Reps">
            <input v-model.number="r.rest" type="number" min="0" step="15" class="rt__in" aria-label="Rest">
            <input v-model.number="r.weight" type="number" min="0" step="2.5" class="rt__in" aria-label="Weight">
            <button class="rt__del" aria-label="Remove exercise" @click="removeFromRoutine(r.ex.id)">
              <UIcon name="i-lucide-x" />
            </button>
          </div>
        </div>
        <div v-else class="empty">
          <UIcon name="i-lucide-list-plus" class="empty__icon" />
          <p>No exercises yet. Add some from the library to start building.</p>
          <button class="btn btn--ghost" @click="active = 'library'">Browse library</button>
        </div>

        <div v-if="routine.length" class="builder__foot">
          <span class="builder__vol">Est. volume <strong>{{ totalVolume.toLocaleString() }} {{ unit }}</strong></span>
          <button class="btn" @click="saveRoutine">Save routine</button>
        </div>
      </div>

      <aside class="builder__side">
        <span class="panel__ey">Saved routines</span>
        <ul class="saved">
          <li v-for="(s, i) in savedRoutines" :key="i">
            <UIcon name="i-lucide-folder" class="saved__icon" />
            <span class="saved__name">{{ s.name }}</span>
            <span class="saved__count">{{ s.count }}</span>
          </li>
        </ul>
        <button class="btn btn--ghost btn--block" @click="active = 'library'">+ Add exercises</button>
      </aside>
    </div>
  </section>

  <!-- ═══ PROGRESS ═══ -->
  <section v-show="active === 'progress'" class="stack">
    <div class="prog-grid">
      <article class="panel chart-panel">
        <div class="panel__head">
          <span class="panel__ey">Weekly training volume</span>
          <span class="chart-panel__trend"><UIcon name="i-lucide-trending-up" />+44% in 6 weeks</span>
        </div>
        <div class="chart" role="img" aria-label="Weekly training volume, trending up over six weeks">
          <div v-for="w in weeks" :key="w.label" class="chart__col">
            <div class="chart__bar" :style="{ height: (w.volume / maxVol * 100) + '%' }">
              <span class="chart__val">{{ (w.volume / 1000).toFixed(1) }}k</span>
            </div>
            <span class="chart__lbl">{{ w.label }}</span>
          </div>
        </div>
      </article>

      <article class="panel log-form">
        <span class="panel__ey">Log a set</span>
        <div class="field">
          <label for="lg-ex">Exercise</label>
          <select id="lg-ex" v-model="entry.ex" class="select">
            <option v-for="e in EXERCISES" :key="e.id">{{ e.name }}</option>
          </select>
        </div>
        <div class="log-form__row">
          <div class="field">
            <label for="lg-w">Weight (kg)</label>
            <input id="lg-w" v-model.number="entry.weight" type="number" step="2.5" class="input">
          </div>
          <div class="field">
            <label for="lg-r">Reps</label>
            <input id="lg-r" v-model.number="entry.reps" type="number" class="input">
          </div>
        </div>
        <button class="btn btn--block" @click="addLog">Log it</button>
      </article>
    </div>

    <article class="panel">
      <span class="panel__ey">Recent personal bests</span>
      <table class="log-table">
        <thead><tr><th>Date</th><th>Exercise</th><th>Best set</th></tr></thead>
        <tbody>
          <tr v-for="(l, i) in log" :key="i">
            <td>{{ l.date }}</td><td>{{ l.ex }}</td><td class="log-table__best">{{ l.best }}</td>
          </tr>
        </tbody>
      </table>
    </article>
  </section>

  <!-- ═══ EXERCISE DETAIL MODAL ═══ -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="selected" class="modal" @click.self="selected = null">
        <div class="modal__box" role="dialog" aria-modal="true" :aria-label="selected.name">
          <button class="modal__close" aria-label="Close" @click="selected = null"><UIcon name="i-lucide-x" /></button>
          <div class="modal__video" aria-hidden="true"><UIcon name="i-lucide-play" /><span>Demo</span></div>
          <div class="modal__body">
            <h3 class="modal__name">{{ selected.name }}</h3>
            <div class="modal__tags">
              <span class="tag">{{ selected.muscle }}</span>
              <span class="tag">{{ selected.equipment }}</span>
              <span class="tag">{{ selected.level }}</span>
            </div>
            <h4 class="modal__sub">Instructions</h4>
            <p class="modal__instr">{{ selected.instructions }}</p>
            <button class="btn btn--block" @click="addToRoutine(selected); selected = null">Add to routine</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 1.5rem; }

/* Panels */
.panel { background: var(--color-surface); border: 1px solid var(--color-line); border-radius: var(--radius-lg); padding: 1.5rem; }
.panel--accent { border-color: var(--color-accent); box-shadow: var(--glow-lime); }
.panel__ey { font-family: var(--font-logo); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-accent); display: block; margin-bottom: 1rem; }
.panel__head { display: flex; align-items: center; justify-content: space-between; }
.panel__head .panel__ey { margin-bottom: 0; }
.mini { font-family: var(--font-logo); font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-muted); background: transparent; border: 1px solid var(--color-line-strong); border-radius: var(--radius); padding: 0.35rem 0.7rem; cursor: pointer; transition: all 0.15s var(--ease); }
.mini:hover { color: var(--color-fg); border-color: var(--color-fg); }
.mini--solid { background: var(--color-accent); color: var(--color-black); border-color: var(--color-accent); }
.mini--solid:hover { color: var(--color-black); }

/* Overview */
.welcome__h { font-size: clamp(1.75rem, 1.2rem + 2vw, 2.75rem); }
.welcome__p { color: var(--color-muted); margin-top: 0.4rem; }
.ov-grid { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
@media (min-width: 700px) { .ov-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1100px) { .ov-grid { grid-template-columns: 1.2fr 1fr; } }

.membership__plan { font-family: var(--font-heading); text-transform: uppercase; font-size: 1.6rem; display: block; }
.membership__status { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--color-accent); font-size: 0.85rem; font-weight: 600; margin-block: 0.5rem 1.25rem; }
.membership__status i { width: 8px; height: 8px; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 8px var(--color-accent); }
.membership__dl { display: grid; gap: 0.85rem; }
.membership__dl div { display: flex; justify-content: space-between; gap: 1rem; border-top: 1px solid var(--color-line); padding-top: 0.85rem; }
.membership__dl dt { color: var(--color-muted); font-size: 0.9rem; }
.membership__dl dd { font-weight: 600; text-align: right; }

.profile__view p { display: flex; flex-direction: column; gap: 0.15rem; padding-block: 0.6rem; border-bottom: 1px solid var(--color-line); }
.profile__view p:last-child { border-bottom: 0; }
.profile__view span { font-family: var(--font-logo); font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-muted); }
.profile__edit { display: grid; gap: 0.6rem; }

.stats__row { display: flex; gap: 1rem; justify-content: space-between; }
.stats__row div { display: flex; flex-direction: column; }
.stats__n { font-family: var(--font-heading); font-size: clamp(1.75rem, 1rem + 3vw, 2.5rem); color: var(--color-accent); line-height: 1; }
.stats__l { font-size: 0.75rem; color: var(--color-muted); margin-top: 0.3rem; }

.notifs ul { list-style: none; display: grid; gap: 0.25rem; }
.notifs li { display: grid; grid-template-columns: auto 1fr auto; gap: 0.75rem; align-items: center; padding-block: 0.7rem; border-bottom: 1px solid var(--color-line); }
.notifs li:last-child { border-bottom: 0; }
.notifs__icon { color: var(--color-accent); font-size: 1.1rem; }
.notifs__text { font-size: 0.9rem; }
.notifs__time { font-size: 0.72rem; color: var(--color-faint); white-space: nowrap; }

/* Library */
.lib-controls { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.lib-search { position: relative; flex: 1; min-width: 220px; display: flex; align-items: center; }
.lib-search :deep(.iconify), .lib-search :deep(svg) { position: absolute; left: 0.9rem; color: var(--color-muted); pointer-events: none; }
.lib-search .input { padding-left: 2.6rem; }
.lib-filters { display: flex; gap: 0.75rem; }
.lib-filters .select { width: auto; }
.lib-count { color: var(--color-muted); font-size: 0.85rem; }

.ex-grid { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
@media (min-width: 560px) { .ex-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1000px) { .ex-grid { grid-template-columns: repeat(3, 1fr); } }
.ex-card { background: var(--color-surface); border: 1px solid var(--color-line); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column; transition: border-color 0.18s var(--ease); }
.ex-card:hover { border-color: var(--color-accent); }
.ex-card__thumb { aspect-ratio: 16 / 9; border: 0; cursor: pointer; background: linear-gradient(135deg, var(--color-ink-900), var(--color-surface-2)); display: grid; place-items: center; color: var(--color-accent); font-size: 1.75rem; }
.ex-card__thumb:hover { color: var(--color-fg); }
.ex-card__body { padding: 1rem 1.1rem; flex: 1; }
.ex-card__name { font-size: 1.2rem; margin-bottom: 0.6rem; }
.ex-card__meta { display: flex; align-items: center; gap: 0.6rem; }
.ex-card__equip { font-size: 0.8rem; color: var(--color-muted); }
.ex-card__actions { display: flex; gap: 0.5rem; padding: 0 1.1rem 1.1rem; }
.ex-card__actions .mini { flex: 1; }

/* Builder */
.builder { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
@media (min-width: 1000px) { .builder { grid-template-columns: 1fr 280px; align-items: start; } }
.builder__main { background: var(--color-surface); border: 1px solid var(--color-line); border-radius: var(--radius-lg); padding: 1.5rem; }
.builder__head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
.builder__name { font-family: var(--font-heading); text-transform: uppercase; font-size: 1.5rem; background: transparent; border: 0; border-bottom: 2px solid var(--color-line); color: var(--color-fg); padding-bottom: 0.3rem; min-width: 0; flex: 1; }
.builder__name:focus { outline: none; border-bottom-color: var(--color-accent); }
.unit { display: inline-flex; border: 1px solid var(--color-line-strong); border-radius: 999px; padding: 0.2rem; flex-shrink: 0; }
.unit button { font-family: var(--font-logo); font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: var(--color-muted); background: transparent; border: 0; cursor: pointer; padding: 0.35rem 0.85rem; border-radius: 999px; }
.unit button.is-active { background: var(--color-accent); color: var(--color-black); }

.rt { display: flex; flex-direction: column; }
.rt__head, .rt__row { display: grid; grid-template-columns: 1.6fr 0.7fr 0.7fr 0.8fr 0.9fr auto; gap: 0.5rem; align-items: center; }
.rt__head { font-family: var(--font-logo); font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-muted); padding-bottom: 0.6rem; border-bottom: 1px solid var(--color-line); }
.rt__row { padding-block: 0.7rem; border-bottom: 1px solid var(--color-line); }
.rt__name { display: flex; flex-direction: column; font-weight: 600; font-size: 0.92rem; }
.rt__name small { color: var(--color-faint); font-weight: 400; font-size: 0.72rem; }
.rt__in { width: 100%; background: var(--color-ink-900); border: 1px solid var(--color-line-strong); border-radius: var(--radius); color: var(--color-fg); padding: 0.45rem 0.5rem; font-family: var(--font-body); text-align: center; }
.rt__in:focus { outline: none; border-color: var(--color-accent); }
.rt__del { background: transparent; border: 0; color: var(--color-faint); cursor: pointer; padding: 0.3rem; font-size: 1.1rem; }
.rt__del:hover { color: var(--color-accent); }
.builder__foot { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; }
.builder__vol { color: var(--color-muted); font-size: 0.9rem; }
.builder__vol strong { color: var(--color-fg); font-family: var(--font-logo); }

.empty { text-align: center; padding: 2.5rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; color: var(--color-muted); }
.empty__icon { font-size: 2.5rem; color: var(--color-faint); }

.builder__side { background: var(--color-surface); border: 1px solid var(--color-line); border-radius: var(--radius-lg); padding: 1.5rem; }
.saved { list-style: none; display: grid; gap: 0.5rem; margin-bottom: 1.25rem; }
.saved li { display: flex; align-items: center; gap: 0.7rem; padding: 0.75rem; background: var(--color-ink-900); border-radius: var(--radius); }
.saved__icon { color: var(--color-accent); }
.saved__name { font-weight: 500; font-size: 0.9rem; }
.saved__count { margin-left: auto; font-family: var(--font-logo); font-size: 0.72rem; color: var(--color-muted); }

/* Progress */
.prog-grid { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
@media (min-width: 900px) { .prog-grid { grid-template-columns: 1.5fr 1fr; } }
.chart-panel__trend { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--color-accent); font-size: 0.8rem; font-weight: 600; }
.chart { display: flex; align-items: flex-end; gap: 0.6rem; height: 220px; margin-top: 1.5rem; }
.chart__col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; height: 100%; justify-content: flex-end; }
.chart__bar { width: 100%; max-width: 48px; background: linear-gradient(to top, var(--color-lime-dim), var(--color-accent)); border-radius: var(--radius) var(--radius) 0 0; position: relative; min-height: 4px; transition: height 0.5s var(--ease); }
.chart__val { position: absolute; top: -1.4rem; left: 50%; transform: translateX(-50%); font-family: var(--font-logo); font-size: 0.62rem; color: var(--color-muted); white-space: nowrap; }
.chart__lbl { font-family: var(--font-logo); font-size: 0.7rem; color: var(--color-muted); }

.log-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.log-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
.log-table th { text-align: left; font-family: var(--font-logo); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-muted); padding-bottom: 0.75rem; border-bottom: 1px solid var(--color-line); }
.log-table td { padding-block: 0.85rem; border-bottom: 1px solid var(--color-line); }
.log-table tr:last-child td { border-bottom: 0; }
.log-table__best { color: var(--color-accent); font-family: var(--font-logo); font-size: 0.85rem; }

/* Modal */
.modal { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); display: grid; place-items: center; padding: var(--gutter); }
.modal__box { width: 100%; max-width: 460px; background: var(--color-surface); border: 1px solid var(--color-line-strong); border-radius: var(--radius-lg); overflow: hidden; position: relative; }
.modal__close { position: absolute; top: 0.75rem; right: 0.75rem; z-index: 1; width: 38px; height: 38px; border-radius: 50%; background: rgba(0,0,0,0.5); border: 0; color: var(--color-fg); cursor: pointer; display: grid; place-items: center; font-size: 1.2rem; }
.modal__close:hover { background: var(--color-accent); color: var(--color-black); }
.modal__video { aspect-ratio: 16 / 9; background: linear-gradient(135deg, var(--color-ink-900), var(--color-surface-2)); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; color: var(--color-accent); }
.modal__video :deep(svg), .modal__video :deep(.iconify) { font-size: 2.5rem; }
.modal__video span { font-family: var(--font-logo); font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-muted); }
.modal__body { padding: 1.5rem; }
.modal__name { font-size: 1.6rem; }
.modal__tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-block: 1rem 1.5rem; }
.modal__sub { font-family: var(--font-logo); font-size: 0.65rem; letter-spacing: 0.16em; color: var(--color-muted); margin-bottom: 0.5rem; }
.modal__instr { color: var(--color-muted); margin-bottom: 1.5rem; }

.modal-enter-active, .modal-leave-active { transition: opacity 0.2s var(--ease); }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal__box, .modal-leave-active .modal__box { transition: transform 0.2s var(--ease); }
.modal-enter-from .modal__box, .modal-leave-to .modal__box { transform: scale(0.96); }
</style>
