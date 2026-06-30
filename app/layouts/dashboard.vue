<script setup lang="ts">
const nav = [
  { key: 'overview', label: 'Overview', icon: 'i-lucide-layout-dashboard' },
  { key: 'library', label: 'Exercise Library', icon: 'i-lucide-library' },
  { key: 'builder', label: 'Routine Builder', icon: 'i-lucide-list-plus' },
  { key: 'progress', label: 'Progress', icon: 'i-lucide-trending-up' }
]

// Active section is shared with the page via provide/inject, and kept in
// the URL (?tab=) so sections are deep-linkable and survive a refresh.
const route = useRoute()
const router = useRouter()
const valid = nav.map(n => n.key)
const active = ref(valid.includes(String(route.query.tab)) ? String(route.query.tab) : 'overview')
provide('dash-active', active)
watch(active, key => router.replace({ query: { ...route.query, tab: key } }))

const sidebarOpen = ref(false)
</script>

<template>
  <div class="dash">
    <aside class="dash__side" :class="{ 'is-open': sidebarOpen }">
      <NuxtLink to="/" class="dash__logo" aria-label="Shawny's Fitness — home"><Logo class="dash__logo-mark" /></NuxtLink>
      <nav class="dash__nav" aria-label="Dashboard">
        <button
          v-for="n in nav"
          :key="n.key"
          class="dash__link"
          :class="{ 'is-active': active === n.key }"
          @click="active = n.key; sidebarOpen = false"
        >
          <UIcon :name="n.icon" />{{ n.label }}
        </button>
      </nav>
      <div class="dash__side-foot">
        <NuxtLink to="/" class="dash__link dash__link--muted"><UIcon name="i-lucide-arrow-left" />Back to site</NuxtLink>
        <NuxtLink to="/login" class="dash__link dash__link--muted"><UIcon name="i-lucide-log-out" />Log out</NuxtLink>
      </div>
    </aside>

    <div class="dash__body">
      <header class="dash__top">
        <button class="dash__burger" aria-label="Toggle menu" @click="sidebarOpen = !sidebarOpen">
          <UIcon name="i-lucide-menu" />
        </button>
        <span class="dash__top-title">{{ nav.find(n => n.key === active)?.label }}</span>
        <div class="dash__user">
          <span class="dash__avatar">JC</span>
          <span class="dash__user-name">Juan C.</span>
        </div>
      </header>

      <main class="dash__main">
        <slot />
      </main>
    </div>

    <div v-if="sidebarOpen" class="dash__scrim" @click="sidebarOpen = false"></div>
  </div>
</template>

<style scoped>
.dash { min-height: 100dvh; display: grid; grid-template-columns: 1fr; }
.dash__side {
  position: fixed; inset: 0 auto 0 0; width: 250px; z-index: 60;
  background: var(--color-ink-900); border-right: 1px solid var(--color-line);
  padding: 1.5rem 1rem; display: flex; flex-direction: column; gap: 2rem;
  transform: translateX(-100%); transition: transform 0.25s var(--ease);
}
.dash__side.is-open { transform: none; }
.dash__logo { display: flex; padding-inline: 0.5rem; color: var(--color-fg); }
.dash__logo-mark { height: 26px; }
.dash__nav { display: flex; flex-direction: column; gap: 0.25rem; }
.dash__link {
  display: flex; align-items: center; gap: 0.75rem; width: 100%;
  background: transparent; border: 0; cursor: pointer; text-align: left;
  color: var(--color-muted); font-family: var(--font-body); font-size: 0.92rem; font-weight: 500;
  padding: 0.75rem 0.85rem; border-radius: var(--radius); transition: all 0.15s var(--ease);
}
.dash__link:hover { color: var(--color-fg); background: var(--color-surface); }
.dash__link.is-active { color: var(--color-black); background: var(--color-accent); }
.dash__link :deep(svg), .dash__link :deep(.iconify) { font-size: 1.15rem; flex-shrink: 0; }
.dash__side-foot { margin-top: auto; display: flex; flex-direction: column; gap: 0.25rem; border-top: 1px solid var(--color-line); padding-top: 1rem; }
.dash__link--muted { font-size: 0.85rem; }

.dash__body { display: flex; flex-direction: column; min-height: 100dvh; }
.dash__top {
  position: sticky; top: 0; z-index: 40;
  display: flex; align-items: center; gap: 1rem; height: 68px; padding-inline: var(--gutter);
  background: rgba(20,20,20,0.85); backdrop-filter: blur(10px); border-bottom: 1px solid var(--color-line);
}
.dash__burger { background: transparent; border: 1px solid var(--color-line-strong); border-radius: var(--radius); width: 42px; height: 42px; display: grid; place-items: center; color: var(--color-fg); cursor: pointer; font-size: 1.25rem; }
.dash__top-title { font-family: var(--font-heading); text-transform: uppercase; font-size: 1.25rem; letter-spacing: 0.02em; }
.dash__user { margin-left: auto; display: flex; align-items: center; gap: 0.6rem; }
.dash__avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--color-accent); color: var(--color-black); display: grid; place-items: center; font-family: var(--font-logo); font-weight: 700; font-size: 0.8rem; }
.dash__user-name { font-weight: 500; font-size: 0.9rem; display: none; }
.dash__main { padding: clamp(1.25rem, 1rem + 2vw, 2.5rem) var(--gutter); flex: 1; }
.dash__scrim { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 55; }

@media (min-width: 960px) {
  .dash { grid-template-columns: 250px 1fr; }
  .dash__side { position: sticky; top: 0; height: 100dvh; transform: none; }
  .dash__burger { display: none; }
  .dash__user-name { display: inline; }
  .dash__scrim { display: none; }
}
</style>
