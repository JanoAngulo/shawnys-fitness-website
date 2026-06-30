<script setup lang="ts">
  useSeoMeta({
    title: "Shawny's Fitness — One Membership. Total Transformation.",
    description: 'Boutique strength & conditioning gym in Hagonoy, Bulacan. One membership, full access, real coaching, and a member dashboard to track every rep.'
  })

  const benefits = [
    { icon: 'i-lucide-infinity', title: 'Full Access', body: 'Every class, every machine, every coached session. No tiers, no add-ons, no upsells.' },
    { icon: 'i-lucide-user-round-check', title: 'Real Coaching', body: 'Form checks and programming from Shawny, not a video on a screen.' },
    { icon: 'i-lucide-dumbbell', title: 'Exercise Library', body: '300+ movements with instructions and demos, built into your dashboard.' },
    { icon: 'i-lucide-list-checks', title: 'Routine Builder', body: 'Design your split, set your sets and reps, and save it to your profile.' },
    { icon: 'i-lucide-trending-up', title: 'Progress Tracking', body: 'Log every workout and watch the numbers climb over the weeks.' },
    { icon: 'i-lucide-users', title: 'The Room', body: 'A community that shows up. Hard to skip leg day when they expect you.' }
  ]

  const programs = [
    { icon: 'i-lucide-dumbbell', tag: 'Bodybuilding', title: 'Muscle & Functional Training', body: 'Build size and real-world strength with progressive, coached lifting.' },
    { icon: 'i-lucide-flame', tag: 'Program', title: 'Weight Loss & Fat Burn', body: 'Structured fat-loss programming that keeps the muscle and drops the rest.' },
    { icon: 'i-lucide-timer', tag: 'Training', title: 'Circuit & Athletic', body: 'High-intensity circuits that build conditioning, speed, and power.' },
    { icon: 'i-lucide-apple', tag: 'Program', title: 'Complete Nutrition', body: 'A full eating plan tuned to your goals — fuel that fits a Hagonoy budget.' },
    { icon: 'i-lucide-user-round-check', tag: '1-on-1', title: 'Personal Training', body: 'One coach, one focus — fully personalised sessions, just you and Shawny.' },
    { icon: 'i-lucide-swords', tag: 'Training', title: 'Boxing', body: 'Footwork, combos, and conditioning — punch your way fit.' }
  ]

  const steps = [
    { k: 'Walk in', body: 'Book a free intro session. We talk goals, injuries, and where you are right now.' },
    { k: 'Get a plan', body: 'Shawny builds your first routine and loads it straight into your member dashboard.' },
    { k: 'Show up', body: 'Train the plan, log your sets, and let progressive overload do the quiet work.' },
    { k: 'Transform', body: 'Review your numbers every month and adjust. Strength compounds. So does confidence.' }
  ]

  const quotes = [
    { name: 'Marites D.', tag: 'Down 14 kg', body: '“I’d never touched a barbell. Six months in I deadlift more than my husband. Shawny made it feel possible.”' },
    { name: 'Joshua R.', tag: '+22 kg squat', body: '“The dashboard is what kept me honest. Seeing the line go up every week is addictive.”' }
  ]

  const posts = [
    { cat: 'Nutrition', title: 'Protein on a Hagonoy budget', read: '4 min' },
    { cat: 'Training', title: 'Your first 12 weeks of barbell training', read: '7 min' },
    { cat: 'Recovery', title: 'Sleep is the supplement you’re skipping', read: '5 min' }
  ]

  const drinks = [
    {
      icon: 'i-lucide-zap',
      tag: 'Pre-Workout',
      stat: '0g fat · BCAA',
      title: 'Watermelon Pre-Workout',
      body: 'Energy and hydration in one hit — BCAA-charged with a crisp watermelon kick. Zero fat, clean fuel that pushes endurance, focus, and output through every set.'
    },
    {
      icon: 'i-lucide-leaf',
      tag: 'Recovery',
      stat: 'Hydrate · Cool down',
      title: 'Cucumber Cooler',
      body: 'Cold, light cucumber juice built to refresh. A clean, cooling boost to recharge between sets or sip through the day.'
    },
    {
      icon: 'i-lucide-milk',
      tag: 'Protein',
      stat: '130g protein · 0g fat',
      title: 'Whey Protein Shake',
      body: 'Pre- or post-workout recovery and a meal in a cup. A serious protein boost to feed muscle, recover faster, and build stronger — zero fat, all fuel.'
    }
  ]

  const extras = [
    { icon: 'i-lucide-package', name: 'Creatine Sachets', body: 'Single-serve scoops of strength. Top up power on your way in.' },
    { icon: 'i-lucide-banana', name: 'Bananas', body: 'Fast carbs and potassium — the original pre-workout.' },
    { icon: 'i-lucide-candy', name: 'Chocolate Bars', body: 'You earned it. A quick hit to refuel and reward.' }
  ]
</script>

<template>
  <!-- ── HERO ─────────────────────────────────── -->
  <section class="hero">
    <span class="hero__ghost" aria-hidden="true">GRIND</span>
    <div class="container hero__grid">
      <div class="hero__main">
        <span class="eyebrow">Boutique Strength Gym · Hagonoy, Bulacan</span>
        <h1 class="hero__title">Meet The Strongest Version Of <span class="swipe">You.</span></h1>
        <p class="hero__lead">No tiers. No add-ons. One key that opens the whole gym — coaching, classes, and a dashboard that tracks every rep you put in.</p>
        <div class="hero__cta">
          <NuxtLink to="/signup" class="btn">Join Now</NuxtLink>
          <NuxtLink to="/membership" class="btn btn--ghost">See the membership</NuxtLink>
        </div>
      </div>

      <ul class="hero__readout" aria-label="Gym at a glance">
        <li><span class="hero__num">300+</span><span class="hero__lbl">Members coached</span></li>
        <li><span class="hero__num">7</span><span class="hero__lbl">Years in Hagonoy</span></li>
        <li><span class="hero__num">1</span><span class="hero__lbl">Membership, all access</span></li>
      </ul>
    </div>
  </section>

  <!-- ── SIGNATURE MARQUEE ────────────────────── -->
  <TempoMarquee filled :words="['PUSH', 'PULL', 'SQUAT', 'HINGE', 'CARRY', 'BREATHE', 'REPEAT']" />

  <!-- ── BENEFITS / CIRCUIT ───────────────────── -->
  <section class="section">
    <div class="container">
      <header class="block-head reveal">
        <span class="eyebrow">What's inside</span>
        <h2>One key, <span class="stroke">everything</span> open.</h2>
        <p>Other gyms sell you the floor and charge extra for the help. Here the help is the point.</p>
      </header>
      <div class="grid grid--3">
        <article v-for="(b, i) in benefits" :key="b.title" class="card benefit reveal" :style="{ transitionDelay: `${i * 60}ms` }">
          <UIcon :name="b.icon" class="benefit__icon" />
          <h3 class="benefit__title">{{ b.title }}</h3>
          <p class="benefit__body">{{ b.body }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ── PROGRAMS / OFFERS ────────────────────── -->
  <section class="section">
    <div class="container">
      <header class="block-head reveal">
        <span class="eyebrow">What we offer</span>
        <h2>Pick your <span class="stroke">fight</span>.</h2>
        <p>Every program is coached and built into your membership. Mix them, switch them — all access.</p>
      </header>
      <div class="grid grid--3">
        <article v-for="(p, i) in programs" :key="p.title" class="card program reveal" :style="{ transitionDelay: `${i * 60}ms` }">
          <UIcon :name="p.icon" class="program__icon" />
          <span class="program__tag">{{ p.tag }}</span>
          <h3 class="program__title">{{ p.title }}</h3>
          <p class="program__body">{{ p.body }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ── HOW IT WORKS (real sequence → numbered) ─ -->
  <section class="section section--ink">
    <div class="container">
      <header class="block-head reveal">
        <span class="eyebrow">The path</span>
        <h2>From the door to a <span class="swipe">different you</span>.</h2>
      </header>
      <ol class="timeline">
        <li v-for="(s, i) in steps" :key="s.k" class="timeline__step reveal">
          <span class="timeline__n">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3 class="timeline__k">{{ s.k }}</h3>
            <p class="timeline__body">{{ s.body }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <!-- ── MEMBERSHIP TEASER ────────────────────── -->
  <section class="section">
    <div class="container price-teaser reveal">
      <div>
        <span class="eyebrow">Membership</span>
        <h2 class="price-teaser__h">Everything, for the price of skipping it.</h2>
        <p>Unlimited access, coaching, and the full dashboard. Commit longer, pay less per month.</p>
        <NuxtLink to="/membership" class="btn">See all packages</NuxtLink>
      </div>
      <div class="price-card">
        <span class="price-card__tag tag">Best value</span>
        <div class="price-card__amt"><span class="price-card__peso">₱</span>7,000<span class="price-card__per">/year</span></div>
        <p class="price-card__note">3 months ₱2,500 · 6 months ₱4,500 · or ₱80/day walk-in.</p>
        <ul class="price-card__list">
          <li>Unlimited gym + classes</li>
          <li>Coached form checks</li>
          <li>Full member dashboard</li>
          <li>Student / PWD / senior discounts</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ── FUEL / DRINKS BAR ────────────────────── -->
  <section class="section">
    <div class="container">
      <header class="block-head reveal">
        <span class="eyebrow">At the bar</span>
        <h2>Fuel the <span class="stroke">grind</span>.</h2>
        <p>Mixed fresh at the gym bar. Hit it before you lift, refuel after.</p>
      </header>
      <div class="grid grid--3">
        <article v-for="(d, i) in drinks" :key="d.title" class="card drink reveal" :style="{ transitionDelay: `${i * 60}ms` }">
          <UIcon :name="d.icon" class="drink__icon" />
          <span class="drink__tag">{{ d.tag }}</span>
          <h3 class="drink__title">{{ d.title }}</h3>
          <p class="drink__body">{{ d.body }}</p>
          <span class="drink__stat">{{ d.stat }}</span>
        </article>
      </div>

      <div class="extras reveal">
        <span class="extras__label">Grab &amp; go</span>
        <ul class="extras__list">
          <li v-for="e in extras" :key="e.name" class="extra">
            <UIcon :name="e.icon" class="extra__icon" />
            <div>
              <h3 class="extra__name">{{ e.name }}</h3>
              <p class="extra__body">{{ e.body }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ── TESTIMONIAL TEASER ───────────────────── -->
  <section class="section section--ink">
    <div class="container">
      <header class="block-head reveal">
        <span class="eyebrow">Receipts</span>
        <h2>The work shows.</h2>
      </header>
      <div class="grid grid--2">
        <figure v-for="q in quotes" :key="q.name" class="card quote reveal">
          <span class="tag">{{ q.tag }}</span>
          <blockquote class="quote__body">{{ q.body }}</blockquote>
          <figcaption class="quote__name">— {{ q.name }}</figcaption>
        </figure>
      </div>
      <div class="block-foot reveal">
        <NuxtLink to="/testimonials" class="btn btn--ghost">All success stories</NuxtLink>
      </div>
    </div>
  </section>

  <!-- ── BLOG TEASER ──────────────────────────── -->
  <section class="section">
    <div class="container">
      <header class="block-head reveal">
        <span class="eyebrow">Fuel</span>
        <h2>Read between sets.</h2>
      </header>
      <div class="grid grid--3">
        <NuxtLink v-for="p in posts" :key="p.title" to="/blog" class="card post reveal">
          <span class="post__cat">{{ p.cat }}</span>
          <h3 class="post__title">{{ p.title }}</h3>
          <span class="post__read">{{ p.read }} read →</span>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- ── CLOSING CTA ──────────────────────────── -->
  <section class="cta">
    <div class="container cta__inner reveal">
      <h2 class="cta__h">Stop planning.</h2>
      <h2 class="cta__h"><span class="swipe">Start lifting.</span></h2>
      <p class="cta__p">Your first session is free. Walk in this week.</p>
      <div class="cta__btns">
        <NuxtLink to="/signup" class="btn">Join Now</NuxtLink>
        <NuxtLink to="/contact" class="btn btn--ghost">Book free intro</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
  /* HERO */
  .hero {
    position: relative;
    min-height: calc(100svh - 77px);
    display: flex;
    align-items: stretch;
    overflow: hidden;
  }
  .hero__ghost {
    position: absolute;
    right: -3vw;
    top: 50%;
    transform: translateY(-50%);
    font-family: var(--font-heading);
    font-size: var(--fs-mega);
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.05);
    letter-spacing: 0.02em;
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }
  .hero__grid {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }
  .hero__main {
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .hero__title {
    margin-block: 1.25rem;
    overflow-wrap: break-word;
    font-size: clamp(2.75rem, 1rem + 8vw, 7.5rem);
    line-height: 1.2;
  }
  .hero__lead {
    color: var(--color-muted);
    font-size: var(--fs-lead);
    margin-bottom: 2rem;
    max-width: 52ch;
  }
  .hero__cta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  @media (max-width: 560px) {
    .hero__cta {
      flex-direction: column;
      align-items: stretch;
    }
    .hero__cta .btn {
      width: 100%;
    }
  }

  .hero__readout {
    list-style: none;
    display: grid;
    gap: 1.5rem 2rem;
    grid-template-columns: repeat(3, auto);
    justify-content: start;
    border-top: 1px solid var(--color-line);
    padding-top: 1.5rem;
    margin-top: clamp(2rem, 4vw, 4rem);
  }
  .hero__readout li {
    display: flex;
    flex-direction: column;
  }
  .hero__num {
    font-family: var(--font-logo);
    font-weight: 800;
    font-size: 2.4rem;
    color: var(--color-accent);
    line-height: 1;
  }
  .hero__lbl {
    font-size: 0.8rem;
    color: var(--color-muted);
    letter-spacing: 0.04em;
    margin-top: 0.3rem;
  }

  @media (min-width: 920px) {
    .hero__grid {
      justify-content: center;
    }
    .hero__readout {
      grid-template-columns: repeat(3, minmax(0, 16rem));
      gap: 2rem 4rem;
    }
    .hero__num {
      font-size: 3rem;
    }
  }

  /* Shared block heads */
  .block-head {
    max-width: 760px;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .block-head p {
    color: var(--color-muted);
    font-size: var(--fs-lead);
  }
  .block-foot {
    margin-top: 2.5rem;
  }
  .block-head h2 {
    line-height: 1.3 !important;
  }

  /* Grids */
  .grid {
    display: grid;
    gap: 1.25rem;
  }
  .grid--2 {
    grid-template-columns: 1fr;
  }
  .grid--3 {
    grid-template-columns: 1fr;
  }
  @media (min-width: 640px) {
    .grid--3 {
      grid-template-columns: repeat(2, 1fr);
    }
    .grid--2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 980px) {
    .grid--3 {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Benefit cards */
  .benefit {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .benefit__icon {
    font-size: 1.75rem;
    color: var(--color-accent);
  }
  .benefit__title {
    font-size: 1.4rem;
  }
  .benefit__body {
    color: var(--color-muted);
  }

  /* Program cards */
  .program {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    position: relative;
    overflow: hidden;
  }
  .program::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 3px;
    background: var(--color-accent);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.25s var(--ease);
  }
  .program:hover::before {
    transform: scaleY(1);
  }
  .program__icon {
    font-size: 1.75rem;
    color: var(--color-accent);
  }
  .program__tag {
    font-family: var(--font-logo);
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-muted);
  }
  .program__title {
    font-size: 1.35rem;
  }
  .program__body {
    color: var(--color-muted);
  }

  /* Timeline */
  .timeline {
    list-style: none;
    display: grid;
    gap: 0;
  }
  .timeline__step {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.5rem;
    padding-block: 1.75rem;
    border-top: 1px solid var(--color-line);
    align-items: start;
  }
  .timeline__step:last-child {
    border-bottom: 1px solid var(--color-line);
  }
  .timeline__n {
    font-family: var(--font-logo);
    font-weight: 800;
    font-size: 1.4rem;
    color: var(--color-accent);
    padding-top: 0.2rem;
  }
  .timeline__k {
    font-size: 1.75rem;
    margin-bottom: 0.4rem;
  }
  .timeline__body {
    color: var(--color-muted);
  }
  @media (min-width: 720px) {
    .timeline__step {
      grid-template-columns: 6rem 1fr;
      gap: 2.5rem;
    }
    .timeline__n {
      font-size: 2rem;
    }
  }

  /* Price teaser */
  .price-teaser {
    display: grid;
    gap: 2.5rem;
    align-items: center;
  }
  .price-teaser h2 {
    margin-block: 1rem;
  }
  .price-teaser p {
    color: var(--color-muted);
    margin-bottom: 2rem;
    font-size: var(--fs-lead);
  }
  .price-teaser__h {
    max-width: 17ch;
  }
  .price-card {
    background: var(--color-surface);
    border: 1px solid var(--color-accent);
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--glow-lime);
  }
  .price-card__tag {
    margin-bottom: 1.25rem;
  }
  .price-card__amt {
    font-family: var(--font-heading);
    font-size: clamp(3rem, 2rem + 4vw, 4.5rem);
    line-height: 1;
  }
  .price-card__peso {
    color: var(--color-accent);
    font-size: 0.5em;
    vertical-align: super;
  }
  .price-card__per {
    font-size: 0.32em;
    color: var(--color-muted);
  }
  .price-card__note {
    color: var(--color-muted);
    margin-block: 0.75rem 1.5rem;
  }
  .price-card__list {
    list-style: none;
    display: grid;
    gap: 0.75rem;
  }
  .price-card__list li {
    padding-left: 1.5rem;
    position: relative;
  }
  .price-card__list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-weight: 700;
  }
  @media (min-width: 860px) {
    .price-teaser {
      grid-template-columns: 1.2fr 0.8fr;
    }
  }

  /* Quotes */
  .quote {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .quote__body {
    font-family: var(--font-heading);
    font-weight: 400;
    text-transform: none;
    font-size: clamp(1.25rem, 1rem + 1vw, 1.6rem);
    line-height: 1.25;
    letter-spacing: 0;
  }
  .quote__name {
    color: var(--color-muted);
    font-size: 0.9rem;
    margin-top: auto;
  }

  /* Posts */
  .post {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    min-height: 200px;
  }
  .post__cat {
    font-family: var(--font-logo);
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-accent);
  }
  .post__title {
    font-size: 1.5rem;
  }
  .post__read {
    color: var(--color-muted);
    font-size: 0.85rem;
    margin-top: auto;
  }

  /* Drinks */
  .drink {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    position: relative;
    overflow: hidden;
  }
  .drink::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 3px;
    background: var(--color-accent);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.25s var(--ease);
  }
  .drink:hover::before {
    transform: scaleY(1);
  }
  .drink__icon {
    font-size: 1.75rem;
    color: var(--color-accent);
  }
  .drink__tag {
    font-family: var(--font-logo);
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-muted);
  }
  .drink__title {
    font-size: 1.35rem;
  }
  .drink__body {
    color: var(--color-muted);
  }
  .drink__stat {
    margin-top: auto;
    padding-top: 1rem;
    font-family: var(--font-logo);
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  /* Grab & go */
  .extras {
    margin-top: 2.5rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--color-line);
  }
  .extras__label {
    font-family: var(--font-logo);
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-muted);
    display: block;
    margin-bottom: 1.5rem;
  }
  .extras__list {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 1.25rem;
    grid-template-columns: 1fr;
  }
  .extra {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    align-items: start;
  }
  .extra__icon {
    font-size: 1.5rem;
    color: var(--color-accent);
    padding-top: 0.15rem;
  }
  .extra__name {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }
  .extra__body {
    color: var(--color-muted);
    font-size: 0.92rem;
  }
  @media (min-width: 640px) {
    .extras__list {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* CTA */
  .cta {
    background: var(--color-accent);
    color: var(--color-black);
    padding-block: clamp(4rem, 3rem + 5vw, 7rem);
  }
  .cta__inner {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }
  .cta__h {
    color: var(--color-black);
  }
  .cta__h .swipe {
    color: var(--color-accent);
  }
  .cta__h .swipe::before {
    background: var(--color-black);
  }
  .cta__p {
    color: rgba(0, 0, 0, 0.7);
    font-size: var(--fs-lead);
    font-weight: 500;
  }
  .cta__btns {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 0.5rem;
  }
  .cta__btns .btn {
    --btn-bg: var(--color-black);
    --btn-fg: var(--color-accent);
  }
  .cta__btns .btn:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
  .cta__btns .btn--ghost {
    --btn-bg: transparent;
    --btn-fg: var(--color-black);
    border-color: rgba(0, 0, 0, 0.3);
  }
  .cta__btns .btn--ghost:hover {
    --btn-fg: var(--color-black);
    border-color: var(--color-black);
  }
</style>
