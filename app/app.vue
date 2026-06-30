<script setup lang="ts">
// Hide page from the very first server-rendered paint so the homepage never
// flashes before the loader. AppLoader removes this class when it leaves.
useHead({
  htmlAttrs: { class: 'site-loading' },
  // No-JS fallback: the loader never runs, so reveal the page.
  noscript: [{ children: '<style>.site-shell{opacity:1 !important}</style>' }],
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <ClientOnly>
      <AppLoader />
    </ClientOnly>
    <div class="site-shell">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
