<script setup lang="ts">
useSeoMeta({
  title: "Success Stories — Shawny's Fitness",
  description: "Before-and-after transformations and member stories from Shawny's Fitness in Hagonoy, Bulacan."
})

const featured = {
  name: 'Marites D.',
  meta: '38 · joined 2024',
  stat: '−14 kg',
  body: 'I joined the week after my second kid, convinced my body was done changing. Shawny didn’t hand me a crash diet — he handed me a barbell and a logbook. Fourteen kilos and one year later, I deadlift heavier than my husband, and honestly that’s the part I brag about.'
}

const stories = [
  { name: 'Joshua R.', meta: '24 · joined 2023', stat: '+22 kg squat', body: 'The dashboard kept me honest. Watching the squat line climb every week turned training into a game I couldn’t stop playing.' },
  { name: 'Aling Nita', meta: '61 · joined 2025', stat: 'Off BP meds', body: 'My doctor wanted me walking. Shawny got me lifting — carefully, with a coach watching every rep. My blood pressure thanks him.' },
  { name: 'Kevin & Mia', meta: 'Couple · joined 2024', stat: 'Both PR’d', body: 'We needed one thing we did together that wasn’t scrolling. Now date night is a 6am session and a protein shake.' },
  { name: 'Paolo S.', meta: '31 · joined 2022', stat: '−9% body fat', body: 'I’d bounced between three commercial gyms. The difference here is someone actually notices when you don’t show up.' },
  { name: 'Reign V.', meta: '19 · joined 2025', stat: 'First pull-up', body: 'Couldn’t do a single one in January. Did five in May. The whole room cheered — that’s the part the photos miss.' },
  { name: 'Tito Ben', meta: '54 · joined 2023', stat: '−18 kg', body: 'I came for the weight. I stayed for the people who expect me on Tuesdays.' }
]
</script>

<template>
  <section class="section hero-page">
    <div class="container">
      <span class="eyebrow">Success stories</span>
      <h1 class="hero-page__title">Proof, not <span class="swipe">promises.</span></h1>
      <p class="hero-page__lead">Real members. Real numbers. The kind of change that shows up in the mirror and the logbook.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <article class="featured reveal">
        <div class="featured__media" aria-hidden="true">
          <div class="featured__ba">
            <span class="featured__tag featured__tag--before">Before</span>
            <span class="featured__tag featured__tag--after">After</span>
          </div>
        </div>
        <div class="featured__text">
          <span class="featured__stat">{{ featured.stat }}</span>
          <blockquote class="featured__quote">“{{ featured.body }}”</blockquote>
          <p class="featured__name">{{ featured.name }} <span>· {{ featured.meta }}</span></p>
        </div>
      </article>
    </div>
  </section>

  <section class="section section--ink">
    <div class="container">
      <header class="block-head reveal">
        <span class="eyebrow">More wins</span>
        <h2>Everybody starts somewhere.</h2>
      </header>
      <div class="stories">
        <figure v-for="s in stories" :key="s.name" class="card story reveal">
          <span class="tag">{{ s.stat }}</span>
          <blockquote class="story__body">“{{ s.body }}”</blockquote>
          <figcaption class="story__name">{{ s.name }} <span>· {{ s.meta }}</span></figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="section video">
    <div class="container">
      <header class="block-head reveal">
        <span class="eyebrow">In their words</span>
        <h2>Watch the <span class="stroke">turnaround</span>.</h2>
      </header>
      <div class="video__grid">
        <button v-for="n in 3" :key="n" class="video__card reveal" aria-label="Play video testimonial">
          <UIcon name="i-lucide-play" class="video__play" />
          <span class="video__label">Member story #{{ n }}</span>
        </button>
      </div>
    </div>
  </section>

  <section class="cta-band">
    <div class="container cta-band__inner reveal">
      <h2>Your story’s next.</h2>
      <NuxtLink to="/signup" class="btn">Start training</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.hero-page { padding-block: clamp(3rem, 2rem + 5vw, 6rem) 1rem; }
.hero-page__title { margin-top: 1.25rem; line-height: 1.3; }
.hero-page__lead { color: var(--color-muted); font-size: var(--fs-lead); margin-top: 1.25rem; max-width: 52ch; }

.featured { display: grid; gap: 2.5rem; align-items: center; }
.featured__media { aspect-ratio: 16 / 11; }
.featured__ba {
  height: 100%; border-radius: var(--radius-lg); overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr;
  background: linear-gradient(135deg, var(--color-surface), var(--color-ink-900));
  border: 1px solid var(--color-line); position: relative;
}
.featured__ba::before { content: ""; position: absolute; top: 0; bottom: 0; left: 50%; width: 1px; background: var(--color-accent); }
.featured__tag { align-self: end; margin: 1rem; font-family: var(--font-logo); font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-muted); }
.featured__tag--after { color: var(--color-accent); justify-self: end; }
.featured__stat { font-family: var(--font-heading); font-size: clamp(2.5rem, 1.5rem + 4vw, 4rem); color: var(--color-accent); line-height: 1; display: block; }
.featured__quote { font-family: var(--font-heading); text-transform: none; letter-spacing: 0; font-weight: 400; font-size: clamp(1.35rem, 1rem + 1.4vw, 1.9rem); line-height: 1.25; margin-block: 1.25rem; }
.featured__name { color: var(--color-fg); font-weight: 600; }
.featured__name span { color: var(--color-muted); font-weight: 400; }
@media (min-width: 900px) { .featured { grid-template-columns: 1fr 1fr; } }

.stories { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
.story { padding: 1.75rem; display: flex; flex-direction: column; gap: 1rem; }
.story__body { color: var(--color-fg); }
.story__name { color: var(--color-muted); font-size: 0.9rem; margin-top: auto; }
.story__name span { color: var(--color-faint); }
@media (min-width: 640px) { .stories { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 980px) { .stories { grid-template-columns: repeat(3, 1fr); } }

.video__grid { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
.video__card {
  aspect-ratio: 16 / 10; border-radius: var(--radius-lg); cursor: pointer;
  background: var(--color-surface); border: 1px solid var(--color-line);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem;
  color: var(--color-fg); transition: border-color 0.2s var(--ease), background 0.2s var(--ease);
}
.video__card:hover { border-color: var(--color-accent); background: var(--color-surface-2); }
.video__play { font-size: 2.5rem; color: var(--color-accent); }
.video__label { font-family: var(--font-logo); font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-muted); }
@media (min-width: 720px) { .video__grid { grid-template-columns: repeat(3, 1fr); } }

.cta-band { padding-block: clamp(3rem, 2rem + 4vw, 5rem); }
.cta-band__inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem; }
</style>
