<script setup lang="ts">
const props = withDefaults(defineProps<{
  words?: string[]
  reverse?: boolean
  filled?: boolean
}>(), {
  words: () => ['PUSH', 'PULL', 'PRESS', 'SQUAT', 'HINGE', 'CARRY', 'BREATHE', 'REPEAT'],
  reverse: false,
  filled: false
})

// Duplicate the run so the loop is seamless.
const run = computed(() => [...props.words, ...props.words])
</script>

<template>
  <div class="marquee" :class="{ 'marquee--filled': filled }" aria-hidden="true">
    <div class="marquee__track" :class="{ 'marquee__track--rev': reverse }">
      <span v-for="(w, i) in [0, 1]" :key="i" class="marquee__group">
        <span v-for="(word, j) in run" :key="j" class="marquee__item">
          {{ word }}
          <span class="marquee__dot">●</span>
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  border-block: 1px solid var(--color-line);
  padding-block: 0.55rem;
  user-select: none;
}
.marquee--filled {
  background: var(--color-accent);
  border-color: var(--color-accent);
}
.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee 32s linear infinite;
}
.marquee__track--rev { animation-direction: reverse; }
.marquee:hover .marquee__track { animation-play-state: paused; }

.marquee__group { display: flex; }

.marquee__item {
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-size: clamp(1.5rem, 1rem + 2vw, 2.75rem);
  line-height: 1;
  letter-spacing: 0.02em;
  color: var(--color-fg);
  display: inline-flex;
  align-items: center;
  gap: 1.6rem;
  padding-inline: 0.8rem;
  white-space: nowrap;
}
.marquee--filled .marquee__item { color: var(--color-black); }

.marquee__dot {
  font-size: 0.45em;
  color: var(--color-accent);
  transform: translateY(-0.1em);
}
.marquee--filled .marquee__dot { color: var(--color-black); }

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
</style>
