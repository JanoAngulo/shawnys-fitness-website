<script setup lang="ts">
const visible = ref(true)
const leaving = ref(false)
const progress = ref(0)

let raf = 0
let done = false

const SEGMENTS = 12

const segmentsLit = computed(() =>
  Math.round((progress.value / 100) * SEGMENTS)
)
const pct = computed(() => Math.min(100, Math.round(progress.value)))

// Status line swaps as the bar climbs — echoes the gym's tempo verbs.
const status = computed(() => {
  const p = progress.value
  if (p < 25) return 'WARMING UP'
  if (p < 60) return 'LOADING REPS'
  if (p < 95) return 'LOCKING IN'
  return 'LET’S GRIND'
})

function finish() {
  if (done) return
  done = true
  progress.value = 100
  window.setTimeout(() => {
    leaving.value = true
    // Reveal the site as the loader starts fading — the two transitions overlap.
    document.documentElement.classList.remove('site-loading')
    window.setTimeout(() => { visible.value = false }, 700)
  }, 360)
}

onMounted(() => {
  // Hide site content until the loader leaves (no-JS users never get this class).
  document.documentElement.classList.add('site-loading')

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    progress.value = 100
    window.setTimeout(() => {
      document.documentElement.classList.remove('site-loading')
      visible.value = false
    }, 450)
    return
  }

  document.documentElement.style.overflow = 'hidden'

  const start = performance.now()
  const MIN = 1300
  const tick = (now: number) => {
    const elapsed = now - start
    const t = Math.min(elapsed / MIN, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    const target = done ? 100 : Math.min(eased * 92, 92)
    progress.value += (target - progress.value) * 0.16
    if (visible.value) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)

  const ready = () => {
    const wait = Math.max(0, MIN - (performance.now() - start))
    window.setTimeout(finish, wait)
  }
  if (document.readyState === 'complete') ready()
  else window.addEventListener('load', ready, { once: true })

  window.setTimeout(finish, 6000)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  document.documentElement.style.overflow = ''
  document.documentElement.classList.remove('site-loading')
})

watch(visible, (v) => {
  if (!v) document.documentElement.style.overflow = ''
})

const fillClip = computed(() => `inset(${100 - progress.value}% 0 0 0)`)
const scanTop = computed(() => `${100 - progress.value}%`)
</script>

<template>
  <Transition name="loader-fade">
    <div
      v-if="visible"
      class="loader"
      :class="{ 'is-leaving': leaving }"
      role="status"
      aria-live="polite"
      aria-label="Loading Shawny's Fitness"
    >
      <span class="loader__grid" aria-hidden="true" />

      <div class="loader__frame">
        <span class="loader__corner loader__corner--tl" aria-hidden="true" />
        <span class="loader__corner loader__corner--tr" aria-hidden="true" />
        <span class="loader__corner loader__corner--bl" aria-hidden="true" />
        <span class="loader__corner loader__corner--br" aria-hidden="true" />

        <div class="loader__inner">
          <div class="loader__top">
            <span class="loader__eyebrow">SHAWNY&rsquo;S FITNESS</span>
            <span class="loader__eyebrow loader__eyebrow--dim">HAGONOY&nbsp;&middot;&nbsp;BULACAN</span>
          </div>

          <div class="loader__logo">
            <Logo class="loader__mark loader__mark--ghost" />
            <div class="loader__fill" :style="{ clipPath: fillClip }">
              <Logo class="loader__mark loader__mark--lime" />
            </div>
            <span class="loader__scan" :style="{ top: scanTop }" aria-hidden="true" />
          </div>

          <div class="loader__readout">
            <span class="loader__status">{{ status }}</span>
            <span class="loader__pct">{{ pct }}<small>%</small></span>
          </div>

          <div class="loader__bar" aria-hidden="true">
            <span
              v-for="i in SEGMENTS"
              :key="i"
              class="loader__seg"
              :class="{ 'is-lit': i <= segmentsLit }"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: var(--color-bg, #1E1E1E);
  padding: var(--gutter, 1.5rem);
  overflow: hidden;
}

/* faint technical grid backdrop */
.loader__grid {
  position: absolute;
  inset: -2px;
  background-image:
    linear-gradient(rgba(144, 255, 2, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(144, 255, 2, 0.04) 1px, transparent 1px);
  background-size: clamp(28px, 7vw, 48px) clamp(28px, 7vw, 48px);
  mask-image: radial-gradient(120% 90% at 50% 50%, #000, transparent 70%);
  -webkit-mask-image: radial-gradient(120% 90% at 50% 50%, #000, transparent 70%);
}

/* ── HUD frame ── */
.loader__frame {
  position: relative;
  width: min(460px, 84vw);
}

.loader__corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-primary, #90FF02);
  opacity: 0.85;
}
.loader__corner--tl { top: -14px; left: -14px; border-right: 0; border-bottom: 0; }
.loader__corner--tr { top: -14px; right: -14px; border-left: 0; border-bottom: 0; }
.loader__corner--bl { bottom: -14px; left: -14px; border-right: 0; border-top: 0; }
.loader__corner--br { bottom: -14px; right: -14px; border-left: 0; border-top: 0; }

.loader__inner {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3.5vw, 1.6rem);
}

/* ── Top label row ── */
.loader__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--color-line, rgba(255, 255, 255, 0.1));
}

.loader__eyebrow {
  font-family: var(--font-logo, 'Orbitron', sans-serif);
  font-size: clamp(0.55rem, 1.8vw, 0.7rem);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--color-fg, #fff);
  white-space: nowrap;
}
.loader__eyebrow--dim { color: var(--color-faint, #5A5A5A); }

/* ── Logo: ghost outline + lime fill rising bottom-up, scan line at the fill edge ── */
.loader__logo {
  position: relative;
  width: 100%;
  color: var(--color-faint, #5A5A5A);
}

.loader__mark { width: 100%; height: auto; }

.loader__fill {
  position: absolute;
  inset: 0;
  color: var(--color-primary, #90FF02);
  filter: drop-shadow(0 0 16px rgba(144, 255, 2, 0.5));
  transition: clip-path 0.1s linear;
}

.loader__scan {
  position: absolute;
  left: -4%;
  right: -4%;
  height: 2px;
  background: var(--color-primary, #90FF02);
  box-shadow: 0 0 14px 2px rgba(144, 255, 2, 0.7);
  transition: top 0.1s linear;
  pointer-events: none;
}

/* ── Readout: status verb + big Anton % ── */
.loader__readout {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.loader__status {
  font-family: var(--font-logo, 'Orbitron', sans-serif);
  font-size: clamp(0.62rem, 2vw, 0.78rem);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-muted, #8C8C8C);
}

.loader__pct {
  font-family: var(--font-heading, 'Anton', sans-serif);
  font-size: clamp(2.4rem, 11vw, 3.6rem);
  line-height: 0.8;
  color: var(--color-primary, #90FF02);
  font-variant-numeric: tabular-nums;
}
.loader__pct small {
  font-size: 0.4em;
  color: var(--color-muted, #8C8C8C);
  margin-left: 0.15em;
}

/* ── Segmented progress bar ── */
.loader__bar {
  display: flex;
  gap: clamp(3px, 1vw, 5px);
  width: 100%;
}

.loader__seg {
  flex: 1;
  height: 6px;
  border-radius: 1px;
  background: var(--color-surface-2, #2C2C2C);
  transition: background 0.18s var(--ease, ease), box-shadow 0.18s var(--ease, ease);
}
.loader__seg.is-lit {
  background: var(--color-primary, #90FF02);
  box-shadow: 0 0 10px rgba(144, 255, 2, 0.55);
}

/* ── Exit ── */
.loader.is-leaving .loader__frame {
  animation: loader-pop 0.6s var(--ease, cubic-bezier(0.16, 1, 0.3, 1)) forwards;
}
@keyframes loader-pop {
  to { transform: scale(1.05); opacity: 0; }
}

.loader-fade-leave-active { transition: opacity 0.7s ease; }
.loader-fade-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .loader__fill,
  .loader__scan,
  .loader__seg { transition: none; }
  .loader__scan { display: none; }
  .loader.is-leaving .loader__frame { animation: none; }
}
</style>
