<script setup lang="ts">
defineProps<{ kicker: string; title: string }>()
</script>

<template>
  <div class="auth">
    <aside class="auth__brand" aria-hidden="true">
      <NuxtLink to="/" class="auth__logo"><Logo class="auth__logo-mark" /></NuxtLink>
      <div class="auth__brand-mid">
        <span class="auth__big">TOTAL<br><span class="swipe">TRANSFORMATION</span></span>
      </div>
      <p class="auth__brand-foot">One membership opens the whole gym — and the dashboard that tracks every rep.</p>
    </aside>

    <main class="auth__panel">
      <div class="auth__inner">
        <NuxtLink to="/" class="auth__logo auth__logo--mobile"><Logo class="auth__logo-mark" /></NuxtLink>
        <span class="eyebrow eyebrow--plain">{{ kicker }}</span>
        <h1 class="auth__title">{{ title }}</h1>
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.auth { min-height: 100dvh; display: grid; grid-template-columns: 1fr; }
.auth__brand {
  display: none; position: relative; overflow: hidden;
  background: var(--color-ink-900); border-right: 1px solid var(--color-line);
  padding: 2.5rem; flex-direction: column; justify-content: space-between;
}
.auth__brand::after {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(circle at 20% 80%, rgba(144,255,2,0.14), transparent 50%);
  pointer-events: none;
}
.auth__logo { display: inline-flex; position: relative; z-index: 1; color: var(--color-fg); }
.auth__logo-mark { height: 30px; }
.auth__logo--mobile { margin-bottom: 2rem; }
.auth__brand-mid { position: relative; z-index: 1; }
.auth__big { font-family: var(--font-heading); font-size: clamp(3rem, 1rem + 7vw, 6rem); line-height: 1.3; text-transform: uppercase; }
.auth__brand-foot { position: relative; z-index: 1; color: var(--color-muted); max-width: 36ch; }

.auth__panel { display: grid; place-items: center; padding: 2.5rem var(--gutter); }
.auth__inner { width: 100%; max-width: 420px; }
.auth__title { font-size: clamp(2.25rem, 1.5rem + 3vw, 3.25rem); margin-block: 0.75rem 2rem; }

@media (min-width: 900px) {
  .auth { grid-template-columns: 1fr 1fr; }
  .auth__brand { display: flex; }
  .auth__logo--mobile { display: none; }
}
</style>
