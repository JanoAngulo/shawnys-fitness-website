import type { RouterConfig } from '@nuxt/schema'

// Custom scroll handling so route changes don't animate a visible scroll-up.
// `scroll-behavior: smooth` (main.css) makes the router's jump-to-top animate,
// which with pageTransition mode "out-in" reads as the old page sliding up
// before the new one loads. Instead: keep back/forward positions, smooth-scroll
// to in-page anchors, and for normal navigation jump to the top *instantly*
// (the instant jump is hidden under the outgoing page's fade-out).
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, left: 0, behavior: 'instant' }
  }
}
