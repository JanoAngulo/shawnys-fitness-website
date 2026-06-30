<script setup lang="ts">
useSeoMeta({
  title: "Membership — Shawny's Fitness",
  description: "All-access membership packages — 1 month ₱1,200, 3 months ₱2,500, 6 months ₱4,500, 1 year ₱7,000. Or walk in for ₱80/day. Student, PWD & senior discounts."
})

const plans = [
  { id: '1mo', label: '1 Month', price: '1,200', sub: '₱1,200/mo', note: 'Just getting started.', featured: false },
  { id: '3mo', label: '3 Months', price: '2,500', sub: '₱833/mo', note: 'Test the grind.', featured: false },
  { id: '6mo', label: '6 Months', price: '4,500', sub: '₱750/mo', note: 'Build the habit. Save 10%.', featured: true },
  { id: '1yr', label: '1 Year', price: '7,000', sub: '₱583/mo', note: 'Best value. Save 30%.', featured: false }
]

const includes = [
  'Unlimited gym access, 7:30am–9:30pm daily',
  'Every group class — strength, conditioning, mobility',
  'Coached form checks on the floor',
  'Personalised starting routine',
  'Full member dashboard & exercise library',
  'Routine builder + progress tracking',
  'No joining fee, no lock-in contract'
]

const faqs = [
  { q: 'Do all packages get the same access?', a: 'Yes. Every package — 3 months, 6 months, or 1 year — unlocks the whole gym: classes, coaching, equipment, and the dashboard. The longer you commit, the less you pay per month.' },
  { q: 'Can I just drop in for a day?', a: 'Walk-in is ₱80 per day. Students, PWDs, and senior citizens pay ₱60 — bring a valid ID. No commitment needed.' },
  { q: 'Are there discounts on the packages?', a: 'Students, PWDs, and senior citizens get discounted rates across the board. Bring a valid ID to the front desk and we’ll sort it out.' },
  { q: 'I’ve never trained before. Is this for me?', a: 'Especially for you. Your first session is a free intro where we assess where you’re at and build a plan around it. Nobody gets thrown to the wolves.' },
  { q: 'What are the opening hours?', a: 'The gym is open 7:30am to 9:30pm, seven days a week. Coached hours are posted weekly in your dashboard.' }
]

const openFaq = ref<number | null>(0)
function toggle(i: number) { openFaq.value = openFaq.value === i ? null : i }
</script>

<template>
  <section class="section hero-page">
    <div class="container">
      <span class="eyebrow">Pricing</span>
      <h1 class="hero-page__title">One plan.<br><span class="swipe">Everything in it.</span></h1>
      <p class="hero-page__lead">No bronze, silver, gold nonsense. You get the whole gym from day one.</p>
    </div>
  </section>

  <section class="section">
    <div class="container plan">
      <div class="plan__grid">
        <div
          v-for="p in plans"
          :key="p.id"
          class="plan__pkg reveal"
          :class="{ 'is-featured': p.featured }"
        >
          <span v-if="p.featured" class="plan__badge">Most popular</span>
          <span class="tag">{{ p.label }}</span>
          <div class="plan__price">
            <span class="plan__peso">₱</span>
            <span class="plan__amt">{{ p.price }}</span>
          </div>
          <p class="plan__permo">{{ p.sub }}</p>
          <p class="plan__note">{{ p.note }}</p>
          <NuxtLink to="/signup" class="btn btn--block">Choose {{ p.label }}</NuxtLink>
        </div>
      </div>

      <div class="plan__daily reveal">
        <div>
          <span class="tag">Day pass</span>
          <p class="plan__daily-line">
            <span class="plan__peso">₱</span><span class="plan__daily-amt">80</span>
            <span class="plan__per">/day</span>
          </p>
          <p class="plan__sub">₱60 for students, PWDs &amp; senior citizens — valid ID required.</p>
        </div>
        <NuxtLink to="/contact" class="btn btn--ghost">Walk in today</NuxtLink>
      </div>

      <div class="plan__includes-wrap reveal">
        <h3 class="plan__includes-h">Every package includes</h3>
        <ul class="plan__includes">
          <li v-for="item in includes" :key="item">
            <UIcon name="i-lucide-check" class="plan__check" />{{ item }}
          </li>
        </ul>
        <p class="plan__fineprint">First coached session is free — no card required. Discounts for students, PWDs &amp; senior citizens on every package.</p>
      </div>
    </div>
  </section>

  <section class="section section--ink">
    <div class="container">
      <header class="block-head reveal">
        <span class="eyebrow">Questions</span>
        <h2>Before you <span class="stroke">commit</span>.</h2>
      </header>
      <div class="faq reveal">
        <div v-for="(f, i) in faqs" :key="f.q" class="faq__item" :class="{ 'is-open': openFaq === i }">
          <button class="faq__q" :aria-expanded="openFaq === i" @click="toggle(i)">
            <span>{{ f.q }}</span>
            <UIcon name="i-lucide-plus" class="faq__icon" />
          </button>
          <div class="faq__a"><div class="faq__a-inner"><p>{{ f.a }}</p></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-band">
    <div class="container cta-band__inner reveal">
      <h2>Still reading? Come lift instead.</h2>
      <NuxtLink to="/signup" class="btn">Join Now</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.hero-page { padding-block: clamp(3rem, 2rem + 5vw, 6rem) 1rem; }
.hero-page__title { margin-top: 1.25rem; line-height: 1.3; }
.hero-page__lead { color: var(--color-muted); font-size: var(--fs-lead); margin-top: 1.25rem; max-width: 48ch; }

.plan { display: flex; flex-direction: column; align-items: stretch; gap: 2.5rem; }

/* Package grid */
.plan__grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
.plan__pkg {
  position: relative; display: flex; flex-direction: column; align-items: flex-start;
  background: var(--color-surface); border: 1px solid var(--color-line);
  border-radius: var(--radius-lg); padding: 2rem;
  transition: border-color 0.2s var(--ease), transform 0.2s var(--ease);
}
.plan__pkg:hover { border-color: var(--color-accent); transform: translateY(-3px); }
.plan__pkg.is-featured { border-color: var(--color-accent); box-shadow: var(--glow-lime); }
.plan__badge {
  position: absolute; top: -0.75rem; right: 1.5rem;
  font-family: var(--font-logo); font-size: 0.62rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  background: var(--color-accent); color: var(--color-black); padding: 0.3rem 0.7rem; border-radius: 999px;
}
.plan__price { display: flex; align-items: flex-start; gap: 0.1rem; margin-block: 1.25rem 0.25rem; font-family: var(--font-heading); }
.plan__peso { color: var(--color-accent); font-size: 1.6rem; padding-top: 0.35rem; }
.plan__amt { font-size: clamp(2.75rem, 2rem + 4vw, 3.75rem); line-height: 0.9; }
.plan__permo { color: var(--color-accent); font-family: var(--font-logo); font-size: 0.85rem; letter-spacing: 0.04em; }
.plan__note { color: var(--color-muted); margin-block: 0.5rem 1.75rem; }
.plan__pkg .btn { margin-top: auto; white-space: nowrap; padding-inline: 0.75rem; font-size: 0.8rem; }

/* Day pass strip */
.plan__daily {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem;
  background: var(--color-surface); border: 1px dashed var(--color-line);
  border-radius: var(--radius-lg); padding: 1.75rem 2rem;
}
.plan__daily-line { display: flex; align-items: flex-start; gap: 0.1rem; margin-block: 0.75rem 0.5rem; font-family: var(--font-heading); }
.plan__daily-amt { font-size: clamp(2rem, 1.5rem + 2vw, 2.75rem); line-height: 0.9; }
.plan__per { color: var(--color-muted); font-size: 1.1rem; align-self: flex-end; padding-bottom: 0.4rem; }
.plan__sub { color: var(--color-muted); }

/* Includes */
.plan__includes-wrap {
  background: var(--color-surface); border: 1px solid var(--color-accent);
  border-radius: var(--radius-lg); padding: 2.5rem; box-shadow: var(--glow-lime);
}
.plan__includes-h { margin-bottom: 1.5rem; }
.plan__includes { list-style: none; display: grid; gap: 1rem; padding: 0; margin: 0; }
.plan__includes li { display: flex; align-items: flex-start; gap: 0.75rem; }
.plan__check { color: var(--color-accent); font-size: 1.15rem; flex-shrink: 0; margin-top: 0.15rem; }
.plan__fineprint { font-size: 0.8rem; color: var(--color-faint); margin-top: 1.5rem; }
@media (min-width: 560px) {
  .plan__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 980px) {
  .plan__grid { grid-template-columns: repeat(4, 1fr); }
}
@media (min-width: 780px) {
  .plan__includes { grid-template-columns: 1fr 1fr; }
}

/* FAQ */
.faq { max-width: 820px; }
.faq__item { border-top: 1px solid var(--color-line); }
.faq__item:last-child { border-bottom: 1px solid var(--color-line); }
.faq__q {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  background: transparent; border: 0; cursor: pointer; color: var(--color-fg);
  font-family: var(--font-heading); text-transform: uppercase; font-size: clamp(1.1rem, 1rem + 0.8vw, 1.5rem);
  padding: 1.5rem 0; text-align: left; letter-spacing: 0.01em;
}
.faq__icon { color: var(--color-accent); font-size: 1.4rem; transition: transform 0.25s var(--ease); flex-shrink: 0; }
.faq__item.is-open .faq__icon { transform: rotate(45deg); }
.faq__a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s var(--ease); }
.faq__item.is-open .faq__a { grid-template-rows: 1fr; }
.faq__a-inner { overflow: hidden; }
.faq__a p { color: var(--color-muted); padding-bottom: 1.5rem; }

.cta-band { padding-block: clamp(3rem, 2rem + 4vw, 5rem); }
.cta-band__inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1.5rem; }
</style>
