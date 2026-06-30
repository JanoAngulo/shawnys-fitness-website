<script setup lang="ts">
const open = ref(false)
const scrolled = ref(false)

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Membership', to: '/membership' },
  { label: 'Stories', to: '/testimonials' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' }
]

const onScroll = () => { scrolled.value = window.scrollY > 24 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header class="hdr" :class="{ 'hdr--solid': scrolled || open }">
    <div class="container hdr__bar">
      <NuxtLink to="/" class="hdr__logo" aria-label="Shawny's Fitness — home">
        <Logo class="hdr__logo-mark" />
      </NuxtLink>

      <nav class="hdr__nav" aria-label="Primary">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="hdr__link"
          active-class="hdr__link--active"
        >{{ l.label }}</NuxtLink>
      </nav>

      <div class="hdr__actions">
        <NuxtLink to="/login" class="hdr__login">Log in</NuxtLink>
        <NuxtLink to="/signup" class="btn hdr__join">Join Now</NuxtLink>
        <button
          class="hdr__burger"
          :aria-expanded="open"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <span :class="{ 'is-open': open }"></span>
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <nav v-if="open" class="hdr__drawer" aria-label="Mobile">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="hdr__drawer-link">
          {{ l.label }}
        </NuxtLink>
        <div class="hdr__drawer-cta">
          <NuxtLink to="/login" class="btn btn--ghost btn--block">Log in</NuxtLink>
          <NuxtLink to="/signup" class="btn btn--block">Join Now</NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 50;
  transition: background 0.3s var(--ease), border-color 0.3s var(--ease), backdrop-filter 0.3s;
  border-bottom: 1px solid transparent;
}
.hdr--solid {
  background: rgba(20, 20, 20, 0.82);
  backdrop-filter: blur(12px);
  border-bottom-color: var(--color-line);
}
.hdr__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  gap: 1.5rem;
}
.hdr__logo {
  display: flex;
  align-items: center;
  color: var(--color-fg);
}
.hdr__logo-mark { height: 26px; }
@media (min-width: 960px) {
  .hdr__logo-mark { height: 30px; }
}

.hdr__nav { display: none; gap: 2rem; }
.hdr__link {
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  color: var(--color-muted);
  position: relative;
  padding-block: 0.4rem;
  transition: color 0.18s var(--ease);
}
.hdr__link:hover { color: var(--color-fg); }
.hdr__link--active { color: var(--color-fg); }
.hdr__link--active::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 2px;
  background: var(--color-accent);
}

.hdr__actions { display: flex; align-items: center; gap: 1rem; }
.hdr__login { display: none; font-size: 0.82rem; color: var(--color-muted); }
.hdr__login:hover { color: var(--color-fg); }
.hdr__join { display: none; }

.hdr__burger {
  width: 44px; height: 44px;
  background: transparent; border: 1px solid var(--color-line-strong);
  border-radius: var(--radius); cursor: pointer;
  display: grid; place-items: center;
}
.hdr__burger span,
.hdr__burger span::before,
.hdr__burger span::after {
  content: ""; display: block;
  width: 18px; height: 2px; background: var(--color-fg);
  transition: transform 0.25s var(--ease), opacity 0.2s;
}
.hdr__burger span { position: relative; }
.hdr__burger span::before { position: absolute; top: -6px; }
.hdr__burger span::after { position: absolute; top: 6px; }
.hdr__burger span.is-open { background: transparent; }
.hdr__burger span.is-open::before { transform: translateY(6px) rotate(45deg); }
.hdr__burger span.is-open::after { transform: translateY(-6px) rotate(-45deg); }

.hdr__drawer {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem var(--gutter) 2rem;
  background: var(--color-ink-900);
  border-bottom: 1px solid var(--color-line);
}
.hdr__drawer-link {
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-size: 1.6rem;
  padding-block: 0.5rem;
  border-bottom: 1px solid var(--color-line);
}
.hdr__drawer-cta { display: grid; gap: 0.75rem; margin-top: 1.25rem; }

.drawer-enter-active, .drawer-leave-active { transition: opacity 0.2s var(--ease), transform 0.2s var(--ease); }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateY(-8px); }

@media (min-width: 960px) {
  .hdr__nav { display: flex; }
  .hdr__login, .hdr__join { display: inline-flex; }
  .hdr__burger { display: none; }
}
</style>
