<script setup lang="ts">
definePageMeta({ layout: false })
useSeoMeta({ title: "Join — Shawny's Fitness" })

const form = reactive({ name: '', email: '', phone: '', password: '' })
const show = ref(false)
const router = useRouter()

const strength = computed(() => {
  const p = form.password
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++
  if (/\d/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})
const strengthLabel = computed(() => ['', 'Weak', 'Okay', 'Good', 'Strong'][strength.value])

function submit() {
  if (!form.name || !form.email || !form.password) return
  router.push('/dashboard')
}
</script>

<template>
  <AuthShell kicker="Start training" title="Make it official.">
    <form @submit.prevent="submit">
      <div class="field">
        <label for="s-name">Full name</label>
        <input id="s-name" v-model="form.name" class="input" required placeholder="Juan dela Cruz" autocomplete="name">
      </div>
      <div class="field">
        <label for="s-email">Email</label>
        <input id="s-email" v-model="form.email" class="input" type="email" required placeholder="you@email.com" autocomplete="email">
      </div>
      <div class="field">
        <label for="s-phone">Mobile number</label>
        <input id="s-phone" v-model="form.phone" class="input" type="tel" placeholder="09xx xxx xxxx" autocomplete="tel">
      </div>
      <div class="field">
        <label for="s-pass">Password</label>
        <div class="pass">
          <input
            id="s-pass"
            v-model="form.password"
            class="input"
            :type="show ? 'text' : 'password'"
            required
            placeholder="At least 8 characters"
            autocomplete="new-password"
          >
          <button type="button" class="pass__toggle" :aria-label="show ? 'Hide password' : 'Show password'" @click="show = !show">
            <UIcon :name="show ? 'i-lucide-eye-off' : 'i-lucide-eye'" />
          </button>
        </div>
        <div v-if="form.password" class="meter">
          <span class="meter__bars">
            <i v-for="n in 4" :key="n" :class="{ 'is-on': n <= strength }"></i>
          </span>
          <span class="meter__label">{{ strengthLabel }}</span>
        </div>
      </div>

      <button class="btn btn--block" type="submit">Create account</button>
      <p class="terms">By joining you agree to our <a href="#" class="link">Terms</a> &amp; <a href="#" class="link">Privacy Policy</a>.</p>
    </form>

    <p class="alt">Already a member? <NuxtLink to="/login" class="link">Log in</NuxtLink></p>
  </AuthShell>
</template>

<style scoped>
.pass { position: relative; }
.pass__toggle { position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%); background: transparent; border: 0; color: var(--color-muted); cursor: pointer; padding: 0.5rem; font-size: 1.1rem; display: grid; place-items: center; }
.pass__toggle:hover { color: var(--color-accent); }
.meter { display: flex; align-items: center; gap: 0.75rem; margin-top: 0.6rem; }
.meter__bars { display: flex; gap: 0.3rem; flex: 1; }
.meter__bars i { height: 4px; flex: 1; background: var(--color-line-strong); border-radius: 2px; transition: background 0.2s var(--ease); }
.meter__bars i.is-on { background: var(--color-accent); }
.meter__label { font-size: 0.75rem; color: var(--color-muted); font-family: var(--font-logo); letter-spacing: 0.08em; min-width: 4ch; }
.terms { font-size: 0.78rem; color: var(--color-faint); margin-top: 1rem; text-align: center; }
.link { color: var(--color-accent); font-weight: 500; }
.link:hover { text-decoration: underline; }
.alt { margin-top: 1.75rem; color: var(--color-muted); text-align: center; }
</style>
