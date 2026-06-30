<script setup lang="ts">
useSeoMeta({
  title: "Contact — Shawny's Fitness",
  description: "Visit Shawny's Fitness in San Pedro, Hagonoy, Bulacan. Book a free intro session or send us a message."
})

const form = reactive({ name: '', email: '', phone: '', goal: 'Build strength', message: '' })
const sent = ref(false)
const goals = ['Build strength', 'Lose weight', 'General fitness', 'Rehab / mobility', 'Just exploring']

function submit() {
  if (!form.name || !form.email) return
  sent.value = true
}

const details = [
  { icon: 'i-lucide-map-pin', label: 'Location', value: 'San Pedro, Hagonoy, Bulacan, PH', href: 'https://maps.google.com/?q=San+Pedro+Hagonoy+Bulacan' },
  { icon: 'i-lucide-phone', label: 'Mobile', value: '0981 296 6992', href: 'tel:+639812966992' },
  { icon: 'i-lucide-mail', label: 'Email', value: 'shawnysfitness@gmail.com', href: 'mailto:shawnysfitness@gmail.com' },
  { icon: 'i-lucide-instagram', label: 'Instagram', value: '@shawnys_fitness', href: 'https://instagram.com/shawnys_fitness' }
]
</script>

<template>
  <div class="page-view">
  <section class="section hero-page">
    <div class="container">
      <span class="eyebrow">Get started</span>
      <h1 class="hero-page__title">Walk in. Say <span class="swipe">hi.</span></h1>
      <p class="hero-page__lead">First session’s free. Send a message or just show up — the door’s open 7:30am to 9:30pm.</p>
    </div>
  </section>

  <section class="section">
    <div class="container contact">
      <form class="contact__form card reveal" @submit.prevent="submit">
        <div v-if="!sent">
          <div class="row">
            <div class="field">
              <label for="c-name">Name</label>
              <input id="c-name" v-model="form.name" class="input" required placeholder="Juan dela Cruz">
            </div>
            <div class="field">
              <label for="c-phone">Mobile</label>
              <input id="c-phone" v-model="form.phone" class="input" type="tel" placeholder="09xx xxx xxxx">
            </div>
          </div>
          <div class="field">
            <label for="c-email">Email</label>
            <input id="c-email" v-model="form.email" class="input" type="email" required placeholder="you@email.com">
          </div>
          <div class="field">
            <label for="c-goal">What's your main goal?</label>
            <select id="c-goal" v-model="form.goal" class="select">
              <option v-for="g in goals" :key="g">{{ g }}</option>
            </select>
          </div>
          <div class="field">
            <label for="c-msg">Message</label>
            <textarea id="c-msg" v-model="form.message" class="textarea" placeholder="Tell us where you're starting from…"></textarea>
          </div>
          <button class="btn btn--block" type="submit">Message us today</button>
        </div>

        <div v-else class="contact__sent">
          <UIcon name="i-lucide-circle-check" class="contact__sent-icon" />
          <h3>Message sent.</h3>
          <p>Thanks, {{ form.name }}. We’ll reply within one business day to set up your free intro.</p>
          <NuxtLink to="/" class="btn btn--ghost">Back to home</NuxtLink>
        </div>
      </form>

      <aside class="contact__info reveal">
        <div class="contact__list">
          <p v-for="d in details" :key="d.label">
            <a :href="d.href" target="_blank" rel="noopener">
              <UIcon :name="d.icon" class="contact__icon" />
              <span class="contact__detail">
                <span class="contact__label">{{ d.label }}</span>
                <span class="contact__value">{{ d.value }}</span>
              </span>
            </a>
          </p>
        </div>
        <div class="contact__map" aria-hidden="true">
          <UIcon name="i-lucide-map-pin" class="contact__map-pin" />
          <span>San Pedro, Hagonoy</span>
        </div>
      </aside>
    </div>
  </section>
  </div>
</template>

<style scoped>
.hero-page { padding-block: clamp(3rem, 2rem + 5vw, 6rem) 1rem; }
.hero-page__title { margin-top: 1.25rem; line-height: 1.08; }
.hero-page__lead { color: var(--color-muted); font-size: var(--fs-lead); margin-top: 1.25rem; max-width: 48ch; }

.contact { display: grid; gap: 2rem; align-items: start; }
.contact__form { padding: clamp(1.5rem, 1rem + 2vw, 2.5rem); }
.contact__form:hover { border-color: var(--color-line); background: var(--color-surface); }
.row { display: grid; gap: 0 1rem; grid-template-columns: 1fr; }
@media (min-width: 520px) { .row { grid-template-columns: 1fr 1fr; } }

.contact__sent { text-align: center; padding: 2rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.contact__sent-icon { font-size: 3rem; color: var(--color-accent); }
.contact__sent p { color: var(--color-muted); max-width: 36ch; }

.contact__list { list-style: none; display: grid; gap: 0.75rem; }
.contact__list a { display: flex; align-items: center; gap: 1rem; padding: 1.1rem 1.25rem; background: var(--color-surface); border: 1px solid var(--color-line); border-radius: var(--radius); transition: border-color 0.18s var(--ease); }
.contact__list a:hover { border-color: var(--color-accent); }
.contact__icon { font-size: 1.4rem; color: var(--color-accent); flex-shrink: 0; }
.contact__detail { display: flex; flex-direction: column; }
.contact__label { font-family: var(--font-logo); font-size: 0.65rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-muted); }
.contact__value { color: var(--color-fg); font-weight: 500; }

.contact__map {
  margin-top: 1rem; min-height: 200px; border-radius: var(--radius-lg);
  background:
    linear-gradient(rgba(20,20,20,0.6), rgba(20,20,20,0.6)),
    repeating-linear-gradient(0deg, transparent 0 28px, var(--color-line) 28px 29px),
    repeating-linear-gradient(90deg, transparent 0 28px, var(--color-line) 28px 29px),
    var(--color-ink-900);
  border: 1px solid var(--color-line); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;
  color: var(--color-muted); font-family: var(--font-logo); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase;
}
.contact__map-pin { font-size: 2rem; color: var(--color-accent); }
@media (min-width: 900px) { .contact { grid-template-columns: 1.3fr 0.7fr; } }
</style>
