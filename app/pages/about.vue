<script setup lang="ts">
  useSeoMeta({
    title: "About — Shawny's Fitness",
    description: "The story behind Shawny's Fitness: a coach-led strength gym in Hagonoy, Bulacan built on consistency, not gimmicks."
  })

  const certs = ['NASM Certified Personal Trainer', 'Precision Nutrition L1 Coach', 'Starting Strength Barbell Coach', 'First Aid & CPR Certified']

  const values = [
    { title: 'Form over ego', body: 'We add weight when the movement earns it. Clean reps build bodies that last; sloppy reps build injuries.' },
    { title: 'Everybody, every body', body: 'Lola rehabbing a knee or a teen chasing a first pull-up — same room, same respect, same coaching.' },
    { title: 'Numbers don’t lie', body: 'Feelings are noisy. Your logbook isn’t. We coach what we can measure and celebrate what we can prove.' }
  ]
</script>

<template>
  <div class="page-view">
  <section class="section hero-page">
    <div class="container">
      <span class="eyebrow">Since 2019 · Hagonoy, Bulacan</span>
      <h1 class="hero-page__title">No gimmicks. <span class="swipe">Just the work.</span></h1>
    </div>
  </section>

  <section class="section section--ink">
    <div class="container story">
      <div class="story__media reveal" aria-hidden="true">
        <div class="story__photo"><span>SHAWNY</span></div>
      </div>
      <div class="story__text reveal">
        <span class="eyebrow">The story</span>
        <h2>It started in a garage with two barbells.</h2>
        <p>
          Shawny started training friends out of a converted garage in San Pedro because the nearest real gym was an hour and a fare away. Word travelled. The garage filled. What people kept coming back for wasn't the equipment — it was being coached by someone who actually remembered their name,
          their last lift, and their next goal.
        </p>
        <p>Seven years on, the garage became a proper gym, but the rule never changed: one membership, total access, and a coach in the room who gives a damn. No commission targets, no mystery fees — just the work, and someone making sure you do it right.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <header class="block-head reveal">
        <span class="eyebrow">What we stand on</span>
        <h2>Three rules, <span class="stroke">zero</span> shortcuts.</h2>
      </header>
      <div class="values">
        <article v-for="v in values" :key="v.title" class="card value reveal">
          <h3 class="value__title">{{ v.title }}</h3>
          <p class="value__body">{{ v.body }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--ink">
    <div class="container creds reveal">
      <div>
        <span class="eyebrow">Credentials</span>
        <h2 class="creds__h">Coached by someone who studied it.</h2>
        <p class="creds__p">Certifications matter because your spine does. Every coach on the floor is qualified to load it safely.</p>
      </div>
      <ul class="creds__list">
        <li v-for="c in certs" :key="c"><UIcon name="i-lucide-badge-check" class="creds__icon" />{{ c }}</li>
      </ul>
    </div>
  </section>

  <section class="cta-band">
    <div class="container cta-band__inner reveal">
      <h2>Come see the room.</h2>
      <NuxtLink to="/contact" class="btn">Book a free intro</NuxtLink>
    </div>
  </section>
  </div>
</template>

<style scoped>
  .hero-page {
    padding-block: clamp(3rem, 2rem + 5vw, 6rem) 2rem;
  }
  .hero-page__title {
    margin-top: 1.25rem;
    max-width: 24ch;
    line-height: 1.35;
  }

  .hero-page__title .swipe {
    line-height: 1.5;
  }

  .story {
    display: grid;
    gap: 3rem;
    align-items: center;
  }
  .story__photo {
    aspect-ratio: 4 / 5;
    border-radius: var(--radius-lg);
    background: linear-gradient(135deg, var(--color-surface), var(--color-bg));
    border: 1px solid var(--color-line);
    display: grid;
    place-items: center;
    font-family: var(--font-logo);
    font-weight: 800;
    letter-spacing: 0.3em;
    color: var(--color-faint);
    position: relative;
    overflow: hidden;
  }
  .story__photo::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 70% 20%, rgba(144, 255, 2, 0.12), transparent 55%);
  }
  .story__text h2 {
    margin-block: 1rem 1.5rem;
  }
  .story__text p {
    color: var(--color-muted);
    margin-bottom: 1.25rem;
  }
  @media (min-width: 860px) {
    .story {
      grid-template-columns: 0.9fr 1.1fr;
    }
  }

  .values {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: 1fr;
  }
  .value {
    padding: 2rem;
  }
  .value__title {
    font-size: 1.6rem;
    margin-bottom: 0.75rem;
    color: var(--color-accent);
  }
  .value__body {
    color: var(--color-muted);
  }
  @media (min-width: 820px) {
    .values {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .creds {
    display: grid;
    gap: 2.5rem;
    align-items: center;
  }
  .creds__h {
    margin-block: 1rem;
  }
  .creds__p {
    color: var(--color-muted);
    font-size: var(--fs-lead);
  }
  .creds__list {
    list-style: none;
    display: grid;
    gap: 1rem;
    padding: 0;
  }
  .creds__list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: var(--radius);
    font-weight: 500;
  }
  .creds__icon {
    color: var(--color-accent);
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  @media (min-width: 860px) {
    .creds {
      grid-template-columns: 1fr 1fr;
    }
  }

  .cta-band {
    padding-block: clamp(3rem, 2rem + 4vw, 5rem);
  }
  .cta-band__inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }
</style>
