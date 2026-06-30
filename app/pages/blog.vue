<script setup lang="ts">
useSeoMeta({
  title: "Blog & Resources — Shawny's Fitness",
  description: "Fitness tips, nutrition guides, and workout routines from the coaches at Shawny's Fitness."
})

const categories = ['All', 'Training', 'Nutrition', 'Recovery', 'Mindset']
const active = ref('All')

const lead = {
  cat: 'Training', read: '7 min',
  title: 'Your first 12 weeks of barbell training',
  excerpt: 'A no-nonsense roadmap from your first wobbly squat to a confident, repeatable program — the exact progression we run new members through.'
}

const posts = [
  { cat: 'Nutrition', read: '4 min', title: 'Protein on a Hagonoy budget' },
  { cat: 'Recovery', read: '5 min', title: 'Sleep is the supplement you’re skipping' },
  { cat: 'Training', read: '6 min', title: 'How to actually warm up (in under 8 minutes)' },
  { cat: 'Mindset', read: '5 min', title: 'Motivation is a myth. Build the habit instead.' },
  { cat: 'Nutrition', read: '6 min', title: 'Eating out without wrecking the week' },
  { cat: 'Training', read: '8 min', title: 'Progressive overload, explained for normal people' },
  { cat: 'Recovery', read: '4 min', title: 'Sore vs. injured: knowing the difference' },
  { cat: 'Mindset', read: '5 min', title: 'Why you keep quitting in week three' }
]

const filtered = computed(() =>
  active.value === 'All' ? posts : posts.filter(p => p.cat === active.value)
)

const email = ref('')
const subscribed = ref(false)
function subscribe() { if (email.value) { subscribed.value = true; email.value = '' } }
</script>

<template>
  <section class="section hero-page">
    <div class="container">
      <span class="eyebrow">Blog & resources</span>
      <h1 class="hero-page__title">Train smart<br>between <span class="swipe">sessions.</span></h1>
      <p class="hero-page__lead">Practical fitness, nutrition, and recovery — written by the coaches, free for everyone.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <NuxtLink to="/blog" class="lead reveal">
        <div class="lead__text">
          <span class="lead__cat">{{ lead.cat }} · {{ lead.read }} read</span>
          <h2 class="lead__title">{{ lead.title }}</h2>
          <p class="lead__excerpt">{{ lead.excerpt }}</p>
          <span class="lead__more">Read the guide →</span>
        </div>
        <div class="lead__media" aria-hidden="true"><span>12<small>wk</small></span></div>
      </NuxtLink>

      <div class="filters reveal" role="tablist" aria-label="Filter articles">
        <button
          v-for="c in categories"
          :key="c"
          role="tab"
          :aria-selected="active === c"
          class="filters__chip"
          :class="{ 'is-active': active === c }"
          @click="active = c"
        >{{ c }}</button>
      </div>

      <div class="posts">
        <NuxtLink v-for="p in filtered" :key="p.title" to="/blog" class="card post">
          <span class="post__cat">{{ p.cat }}</span>
          <h3 class="post__title">{{ p.title }}</h3>
          <span class="post__read">{{ p.read }} read →</span>
        </NuxtLink>
      </div>
    </div>
  </section>

  <section class="section section--ink">
    <div class="container sub reveal">
      <div>
        <span class="eyebrow">Newsletter</span>
        <h2 class="sub__h">Weekly fitness tips, <span class="stroke"><br> zero</span> spam.</h2>
        <p class="sub__p">One email each Sunday: a workout, a recipe, and one thing worth trying this week.</p>
      </div>
      <form class="sub__form" @submit.prevent="subscribe">
        <label class="sr-only" for="sub-email">Email address</label>
        <input id="sub-email" v-model="email" class="input" type="email" required placeholder="you@email.com">
        <button class="btn" type="submit">Subscribe</button>
        <p v-if="subscribed" class="sub__ok">Subscribed. See you Sunday.</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.hero-page { padding-block: clamp(3rem, 2rem + 5vw, 6rem) 1rem; }
.hero-page__title { margin-top: 1.25rem; line-height: 1.3; }
.hero-page__lead { color: var(--color-muted); font-size: var(--fs-lead); margin-top: 1.25rem; max-width: 50ch; }

/* Lead article */
.lead { display: grid; gap: 0; background: var(--color-surface); border: 1px solid var(--color-line); border-radius: var(--radius-lg); overflow: hidden; transition: border-color 0.2s var(--ease); margin-bottom: 3rem; }
.lead:hover { border-color: var(--color-accent); }
.lead__text { padding: clamp(1.75rem, 1rem + 3vw, 3rem); }
.lead__cat { font-family: var(--font-logo); font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-accent); }
.lead__title { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem); margin-block: 1rem; }
.lead__excerpt { color: var(--color-muted); font-size: var(--fs-lead); margin-bottom: 1.5rem; }
.lead__more { color: var(--color-accent); font-weight: 600; font-family: var(--font-logo); font-size: 0.8rem; letter-spacing: 0.08em; }
.lead__media {
  background: linear-gradient(135deg, var(--color-accent), var(--color-lime-dim));
  display: grid; place-items: center; min-height: 200px; color: var(--color-black);
  font-family: var(--font-heading); font-size: clamp(4rem, 2rem + 8vw, 7rem); line-height: 1;
}
.lead__media small { font-size: 0.3em; }
@media (min-width: 860px) { .lead { grid-template-columns: 1.4fr 0.6fr; } }

/* Filters */
.filters { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem; }
.filters__chip {
  font-family: var(--font-logo); font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--color-muted); background: transparent; border: 1px solid var(--color-line-strong);
  border-radius: 999px; padding: 0.55rem 1.1rem; cursor: pointer; transition: all 0.16s var(--ease);
}
.filters__chip:hover { color: var(--color-fg); border-color: var(--color-fg); }
.filters__chip.is-active { background: var(--color-accent); color: var(--color-black); border-color: var(--color-accent); }

/* Posts grid */
.posts { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
.post { padding: 1.75rem; display: flex; flex-direction: column; gap: 0.9rem; min-height: 190px; }
.post__cat { font-family: var(--font-logo); font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-accent); }
.post__title { font-size: 1.4rem; }
.post__read { color: var(--color-muted); font-size: 0.85rem; margin-top: auto; }
@media (min-width: 640px) { .posts { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 980px) { .posts { grid-template-columns: repeat(3, 1fr); } }

/* Subscribe */
.sub { display: grid; gap: 2rem; align-items: center; }
.sub__h { margin-block: 1rem; }
.sub__p { color: var(--color-muted); font-size: var(--fs-lead); }
.sub__form { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.sub__form .input { flex: 1; min-width: 220px; }
.sub__ok { flex-basis: 100%; color: var(--color-accent); font-size: 0.9rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
@media (min-width: 820px) { .sub { grid-template-columns: 1.3fr 0.7fr; } }
</style>
