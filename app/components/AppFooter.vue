<script setup lang="ts">
const year = 2026
const email = ref('')
const sent = ref(false)

function subscribe() {
  if (!email.value) return
  sent.value = true
  email.value = ''
}
</script>

<template>
  <footer class="ft">
    <TempoMarquee :words="['TRAIN HARD', 'EAT RIGHT', 'STAY CONSISTENT', 'REPEAT']" reverse />

    <div class="container ft__main">
      <div class="ft__brand">
        <NuxtLink to="/" class="ft__logo" aria-label="Shawny's Fitness — home"><Logo class="ft__logo-mark" /></NuxtLink>
        <p class="ft__tag">One membership. Total transformation. Built in Hagonoy, Bulacan — for everybody who shows up.</p>
        <form class="ft__news" @submit.prevent="subscribe">
          <label for="ft-email" class="ft__news-label">Weekly fitness tips</label>
          <div class="ft__news-row">
            <input
              id="ft-email"
              v-model="email"
              class="input"
              type="email"
              required
              placeholder="you@email.com"
            >
            <button class="btn" type="submit">Subscribe</button>
          </div>
          <p v-if="sent" class="ft__news-ok">You're on the list. Check your inbox.</p>
        </form>
      </div>

      <nav class="ft__col" aria-label="Site">
        <h4 class="ft__h">Explore</h4>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/membership">Membership</NuxtLink>
        <NuxtLink to="/testimonials">Success Stories</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
      </nav>

      <nav class="ft__col" aria-label="Account">
        <h4 class="ft__h">Account</h4>
        <NuxtLink to="/login">Log in</NuxtLink>
        <NuxtLink to="/signup">Join Now</NuxtLink>
        <NuxtLink to="/dashboard">Member Dashboard</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>

      <div class="ft__col">
        <h4 class="ft__h">Find us</h4>
        <a href="https://maps.google.com/?q=San+Pedro+Hagonoy+Bulacan" target="_blank" rel="noopener">
          San Pedro, Hagonoy, Bulacan, PH
        </a>
        <a href="tel:+639812966992">0981 296 6992</a>
        <a href="mailto:shawnysfitness@gmail.com">shawnysfitness@gmail.com</a>
        <a href="https://instagram.com/shawnys_fitness" target="_blank" rel="noopener">@shawnys_fitness</a>
      </div>
    </div>

    <div class="container ft__legal">
      <span>© {{ year }} Shawny's Fitness. All rights reserved.</span>
      <span class="ft__legal-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.ft { background: var(--color-ink-900); border-top: 1px solid var(--color-line); }
.ft__main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding-block: clamp(3rem, 2rem + 4vw, 5rem);
}
.ft__logo { display: inline-flex; color: var(--color-fg); }
.ft__logo-mark { height: 34px; }
.ft__tag { color: var(--color-muted); margin-top: 1rem; max-width: 38ch; }

.ft__news { margin-top: 2rem; }
.ft__news-label {
  display: block; font-family: var(--font-logo); font-size: 0.7rem;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-accent);
  margin-bottom: 0.6rem;
}
.ft__news-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.ft__news-row .input { flex: 1; min-width: 180px; }
.ft__news-ok { color: var(--color-accent); font-size: 0.85rem; margin-top: 0.6rem; }

.ft__col { display: flex; flex-direction: column; gap: 0.7rem; }
.ft__col a { color: var(--color-muted); transition: color 0.16s var(--ease); width: fit-content; }
.ft__col a:hover { color: var(--color-accent); }
.ft__h {
  font-family: var(--font-logo); font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.2em; color: var(--color-fg); margin-bottom: 0.3rem;
}

.ft__legal {
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
  padding-block: 1.5rem; border-top: 1px solid var(--color-line);
  font-size: 0.8rem; color: var(--color-faint);
}
.ft__legal-links { display: flex; gap: 1.5rem; }
.ft__legal-links a:hover { color: var(--color-accent); }

@media (min-width: 720px) {
  .ft__main { grid-template-columns: 2fr 1fr 1fr; }
}
@media (min-width: 1024px) {
  .ft__main { grid-template-columns: 2.2fr 1fr 1fr 1.4fr; }
}
</style>
