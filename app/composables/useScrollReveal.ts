/**
 * Reveals elements with the `.reveal` class as they scroll into view.
 * Re-scans on route change. No-ops under prefers-reduced-motion.
 */
export function useScrollReveal() {
  if (import.meta.server) return

  let observer: IntersectionObserver | null = null

  const scan = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'))
      return
    }
    if (!observer) {
      observer = new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer!.unobserve(entry.target)
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
      )
    }
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer!.observe(el))
  }

  onMounted(() => nextTick(scan))
  onBeforeUnmount(() => observer?.disconnect())

  // Re-scan once the new page DOM exists. With pageTransition mode "out-in"
  // the incoming page mounts only after the outgoing one leaves, so a fixed
  // timeout races the transition — hook the transition-finish event instead.
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:transition:finish', () => nextTick(scan))
  nuxtApp.hook('page:finish', () => nextTick(scan))

  return { scan }
}
